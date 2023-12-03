"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContentByPath = exports.getFilenameFromPath = void 0;
const fs = __importStar(require("fs"));
const getFilenameFromPath = (filePath) => filePath.split('/').slice(-1)[0].split('.')[0];
exports.getFilenameFromPath = getFilenameFromPath;
const getFileContentByPath = (filePath) => {
    try {
        return fs.readFileSync(filePath).toString('utf-8');
    }
    catch (e) {
        if (e.code && e.code === 'ENOENT') {
            console.log('Cannot find file by file path: ', filePath);
            console.log('If it\'s *.md file, you should create it');
            throw e;
        }
        throw e;
    }
};
exports.getFileContentByPath = getFileContentByPath;
//# sourceMappingURL=file.js.map