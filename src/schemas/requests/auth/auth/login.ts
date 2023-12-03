import { Type } from '@sinclair/typebox';
import path from 'path';
import { assembleRequestSchema } from '../../../../core';
import { getFileContentByPath, getFilenameFromPath } from '../../../../helpers';

const role = 'user';

const requestSchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

const responseSchema = Type.Object({
  token: Type.String(),
});

const documentation = getFileContentByPath(path.resolve(__dirname, `${getFilenameFromPath(__filename)}-docs.md`));

export default assembleRequestSchema({
  role,
  requestSchema,
  responseSchema,
  documentation,
});
