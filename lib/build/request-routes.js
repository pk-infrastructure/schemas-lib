"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAuthLoginRequestRoute = void 0;
const core_1 = require("../core");
const login_1 = __importDefault(require("../schemas/requests/auth/auth/login"));
/**
* @description
* ## Login request
*
* Logins user if credentials are valid
*
* Request interface:
* ```
* export interface RequestSchema {
*   username: string;
*   password: string;
*   [k: string]: unknown;
* }
*
* ```
* Response interface:
*
* ```
* export interface ResponseSchema {
*   token: string;
*   [k: string]: unknown;
* }
*
* ```
*/
class AuthAuthLoginRequestRoute extends core_1.BaseRequestRoute {
}
exports.AuthAuthLoginRequestRoute = AuthAuthLoginRequestRoute;
AuthAuthLoginRequestRoute.method = 'auth.auth.login';
AuthAuthLoginRequestRoute.topic = 'auth.auth.login';
AuthAuthLoginRequestRoute.requestSchema = login_1.default.requestSchema;
AuthAuthLoginRequestRoute.responseSchema = login_1.default.responseSchema;
AuthAuthLoginRequestRoute.role = login_1.default.role;
//# sourceMappingURL=request-routes.js.map