import {TSchema} from "@sinclair/typebox";
import * as fs from "fs";
import {compile} from "json-schema-to-typescript";
import * as path from "path";
import {AssembledRequestSchema} from "../src/core";
import {capitalize, markdownToTsDoc, typescriptToTsDoc} from "./helpers";

const schemasPath = 'src/schemas';
const requestsRoutesDir = 'requests';


type AssembledSchemasTree = { [m: string]: { [s: string]: { [m: string]: AssembledRequestSchema<TSchema, TSchema> } } };

const scanService = (pathToServiceDir: string) => {
  return fs.readdirSync(pathToServiceDir)
    .reduce(async (acc, method) => {
      const awaitedAcc = await acc;

      const pathToMethodFile = path.resolve(pathToServiceDir, method);

      if (fs.lstatSync(pathToMethodFile).isDirectory() || method.split('.').slice(-1)[0] !== 'ts') {
        return awaitedAcc;
      }

      awaitedAcc[method] = (await import(pathToMethodFile)).default as AssembledSchemasTree[string][string][string];

      return awaitedAcc;
    }, Promise.resolve({}) as Promise<AssembledSchemasTree[string][string]>);
}

const scanMicroserviceDir = (pathToMicroserviceDir: string) => {
  return fs.readdirSync(pathToMicroserviceDir)
    .reduce(async (acc, service) => {
      const awaitedAcc = await acc;

      const pathToServiceDir = path.resolve(pathToMicroserviceDir, service);

      if (!fs.lstatSync(pathToServiceDir).isDirectory()) return awaitedAcc;

      awaitedAcc[service] = await scanService(pathToServiceDir);

      return awaitedAcc;
    }, Promise.resolve({}) as Promise<AssembledSchemasTree[string]>);
}

const scanMicroservicesDir = (pathToMicroservicesDir: string) => {
  return fs.readdirSync(pathToMicroservicesDir)
    .reduce(async (acc, microservice) => {
      const awaitedAcc = await acc;

      const pathToMicroserviceDir = path.resolve(pathToMicroservicesDir, microservice);

      if (!fs.lstatSync(pathToMicroserviceDir).isDirectory()) return awaitedAcc;

      awaitedAcc[microservice] = await scanMicroserviceDir(pathToMicroserviceDir);

      return awaitedAcc;
    }, Promise.resolve({}) as Promise<AssembledSchemasTree>);
};

const saveRoutes = async (schemas: AssembledSchemasTree) => {
  const imports = [
    'import { BaseRequestRoute } from \'../core\';',
  ] as string[];
  const routes = [] as string[];

  for (let [microservice, services] of Object.entries(schemas)) {
    for (let [service, methods] of Object.entries(services)) {
      for (let [method, assembledSchema] of Object.entries(methods)) {
        const methodName = method.split('.')[0];

        imports.push(buildSchemaImport(assembledSchema, microservice, service, methodName));
        routes.push(await buildRoute(assembledSchema, microservice, service, methodName));
      }
    }
  }

  const fileContent = `${imports.join('\n')}\n\n${routes.join('\n\n')}\n`;

  fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'build', 'request-routes.ts'), fileContent);
};

const buildRoute = async (
  schema: AssembledSchemasTree[string][string][string],
  microserviceName: string,
  serviceName: string,
  methodName: string,
) => {
  const name = `${capitalize(microserviceName)}${capitalize(serviceName)}${capitalize(methodName)}`;

  return `
/**
* @description
${markdownToTsDoc(schema.documentation)}
*
* Request interface:
${typescriptToTsDoc(await compile(schema.requestSchema.properties, 'requestSchema', { bannerComment: '' }))}
* Response interface:
*
${typescriptToTsDoc(await compile(schema.responseSchema.properties, 'responseSchema', { bannerComment: '' }))}
*/
export class ${name}RequestRoute extends BaseRequestRoute {
  static method = '${microserviceName.toLowerCase()}.${serviceName.toLowerCase()}.${methodName.toLowerCase()}';
  static topic = '${microserviceName.toLowerCase()}.${serviceName.toLowerCase()}.${methodName.toLowerCase()}';

  static requestSchema = ${name}Schema.requestSchema;
  static responseSchema = ${name}Schema.responseSchema;

  static role = ${name}Schema.role;
}
`.trim();
}

const buildSchemaImport = (
  schema: AssembledSchemasTree[string][string][string],
  microserviceName: string,
  serviceName: string,
  methodName: string,
) => `import ${capitalize(microserviceName)}${capitalize(serviceName)}${capitalize(methodName)}Schema from '../schemas/requests/${microserviceName}/${serviceName}/${methodName}';`;

(async () => {
  const data = await scanMicroservicesDir(path.resolve(schemasPath, requestsRoutesDir));
  await saveRoutes(data);

  console.log(
    '\x1b[32m%s\x1b[0m',
    ` ______                                                  
(_____ \\                                _                
 _____) )_____  ____ _   _ _____  ___ _| |_              
|  __  /| ___ |/ _  | | | | ___ |/___|_   _)             
| |  \\ \\| ____| |_| | |_| | ____|___ | | |_              
|_|   |_|_____)\\__  |____/|_____|___/   \\__)             
                  |_|                                    
  ______       _                                         
 / _____)     | |                                        
( (____   ____| |__  _____ ____  _____  ___              
 \\____ \\ / ___)  _ \\| ___ |    \\(____ |/___)             
 _____) | (___| | | | ____| | | / ___ |___ |             
(______/ \\____)_| |_|_____)_|_|_\\_____(___/              
                                                         
 _______                                               _ 
(_______)                                _            | |
 _   ___ _____ ____  _____  ____ _____ _| |_ _____  __| |
| | (_  | ___ |  _ \\| ___ |/ ___|____ (_   _) ___ |/ _  |
| |___) | ____| | | | ____| |   / ___ | | |_| ____( (_| |
 \\_____/|_____)_| |_|_____)_|   \\_____|  \\__)_____)\\____|
`
  );

  console.log(
    '\x1b[32m%s\x1b[0m',
    '------------------------------------------------------------------------------------------------',
  );
})();
