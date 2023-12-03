import * as fs from 'fs';

export const getFilenameFromPath = (filePath: string) => filePath.split('/').slice(-1)[0].split('.')[0];

export const getFileContentByPath = (filePath: string) => {
  try {
    return fs.readFileSync(filePath).toString('utf-8');
  } catch (e) {
    if (e.code && e.code === 'ENOENT') {
      console.log('Cannot find file by file path: ', filePath);
      console.log('If it\'s *.md file, you should create it');

      throw e;
    }

    throw e;
  }
};
