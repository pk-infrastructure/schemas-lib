"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
const path_1 = __importDefault(require("path"));
const core_1 = require("../../../../core");
const helpers_1 = require("../../../../helpers");
const role = 'user';
const requestSchema = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
});
const responseSchema = typebox_1.Type.Object({
    token: typebox_1.Type.String(),
});
const documentation = (0, helpers_1.getFileContentByPath)(path_1.default.resolve(__dirname, `${(0, helpers_1.getFilenameFromPath)(__filename)}-docs.md`));
exports.default = (0, core_1.assembleRequestSchema)({
    role,
    requestSchema,
    responseSchema,
    documentation,
});
//# sourceMappingURL=login.js.map