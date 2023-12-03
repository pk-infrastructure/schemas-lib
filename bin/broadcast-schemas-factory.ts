import {TSchema} from "@sinclair/typebox";
import * as fs from "fs";
import {compile} from "json-schema-to-typescript";
import * as path from "path";
import {AssembledBroadcastSchema} from "../src/core";
import {markdownToTsDoc, typescriptToTsDoc} from "./helpers";

const schemasPath = 'src/schemas';
const broadcastsRoutesDir = 'broadcasts';

const capitalize = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;

type AssembledSchemasTree = { [b: string]: { [s: string]: AssembledBroadcastSchema<TSchema> } };

const scanBroadcastDir = (pathToBroadcast: string) => {
  return fs.readdirSync(pathToBroadcast)
    .reduce(async (acc, subject) => {
      const awaitedAcc = await acc;

      const pathToBroadcastFile = path.resolve(pathToBroadcast, subject);

      if (fs.lstatSync(pathToBroadcastFile).isDirectory() || subject.split('.').slice(-1)[0] !== 'ts') {
        return awaitedAcc;
      }

      awaitedAcc[subject] = (await import(pathToBroadcastFile)).default as AssembledSchemasTree[string][string];

      return awaitedAcc;
    }, Promise.resolve({}) as Promise<AssembledSchemasTree[string]>);
}

const scanBroadcastsDir = (pathToBroadcastsDir: string) => {
  return fs.readdirSync(pathToBroadcastsDir)
    .reduce(async (acc, microservice) => {
      const awaitedAcc = await acc;

      const pathToBroadcastDir = path.resolve(pathToBroadcastsDir, microservice);

      if (!fs.lstatSync(pathToBroadcastDir).isDirectory()) return awaitedAcc;

      awaitedAcc[microservice] = await scanBroadcastDir(pathToBroadcastDir);

      return awaitedAcc;
    }, Promise.resolve({}) as Promise<AssembledSchemasTree>);
};

const saveRoutes = async (schemas: AssembledSchemasTree) => {
  const imports = [
    'import { BaseBroadcastRoute } from \'../core\';',
  ] as string[];
  const routes = [] as string[];

  for (let [broadcast, subjects] of Object.entries(schemas)) {
    for (let [subject, assembledSchema] of Object.entries(subjects)) {
      const subjectName = subject.split('.')[0];

      imports.push(buildSchemaImport(assembledSchema, broadcast, subjectName));
      routes.push(await buildRoute(assembledSchema, broadcast, subjectName));
    }
  }

  const fileContent = `${imports.join('\n')}\n\n${routes.join('\n\n')}\n`;

  fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'build', 'broadcast-routes.ts'), fileContent);
};

const buildRoute = async (
  schema: AssembledSchemasTree[string][string],
  broadcastName: string,
  subjectName: string,
) => `
/**
* @description
${markdownToTsDoc(schema.documentation)}
*
* Data interface:
${typescriptToTsDoc(await compile(schema.dataSchema.properties, 'DataSchema', { bannerComment: '' }))}
*/
export class ${capitalize(broadcastName)}${capitalize(subjectName)}BroadcastRoute extends BaseBroadcastRoute {
  static method = '${broadcastName.toLowerCase()}.${subjectName.toLowerCase()}';
  static topic = '${broadcastName.toLowerCase()}.${subjectName.toLowerCase()}';

  static dataSchema = ${capitalize(broadcastName)}${capitalize(subjectName)}Schema.dataSchema;
}
`.trim();

const buildSchemaImport = (
  schema: AssembledSchemasTree[string][string],
  broadcastName: string,
  subjectName: string,
) => `import ${capitalize(broadcastName)}${capitalize(subjectName)}Schema from '../schemas/broadcasts/${broadcastName}/${subjectName}';`;

(async () => {
  const data = await scanBroadcastsDir(path.resolve(schemasPath, broadcastsRoutesDir));
  await saveRoutes(data);

  console.log(
    '\x1b[32m%s\x1b[0m',
    `
 ______                       _                          
(____  \\                     | |                   _     
 ____)  ) ____ ___  _____  __| | ____ _____  ___ _| |_   
|  __  ( / ___) _ \\(____ |/ _  |/ ___|____ |/___|_   _)  
| |__)  ) |  | |_| / ___ ( (_| ( (___/ ___ |___ | | |_   
|______/|_|   \\___/\\_____|\\____|\\____)_____(___/   \\__)  
                                                         
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
