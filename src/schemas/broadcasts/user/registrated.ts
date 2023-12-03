import { Type } from '@sinclair/typebox';
import * as path from 'path';
import { assembleBroadcastSchema } from '../../../core';
import { getFileContentByPath, getFilenameFromPath } from '../../../helpers';

const dataSchema = Type.Object({
  userId: Type.Number(),
});

const documentation = getFileContentByPath(path.resolve(__dirname, `${getFilenameFromPath(__filename)}-docs.md`));

export default assembleBroadcastSchema({
  dataSchema,
  documentation,
});
