"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assembleBroadcastSchema = exports.assembleRequestSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const assembleRequestSchema = ({ requestSchema, responseSchema, documentation, role, }) => ({
    requestSchema: typebox_1.Type.Object(requestSchema),
    responseSchema: typebox_1.Type.Object(responseSchema),
    documentation: documentation.trim(),
    role,
});
exports.assembleRequestSchema = assembleRequestSchema;
const assembleBroadcastSchema = ({ dataSchema, documentation, }) => ({
    dataSchema: typebox_1.Type.Object(dataSchema),
    documentation: documentation.trim(),
});
exports.assembleBroadcastSchema = assembleBroadcastSchema;
//# sourceMappingURL=assemble.js.map