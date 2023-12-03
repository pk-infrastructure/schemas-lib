import { BaseRequestRoute } from '../core';
import AuthAuthLoginSchema from '../schemas/requests/auth/auth/login';

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
export class AuthAuthLoginRequestRoute extends BaseRequestRoute {
  static method = 'auth.auth.login';
  static topic = 'auth.auth.login';

  static requestSchema = AuthAuthLoginSchema.requestSchema;
  static responseSchema = AuthAuthLoginSchema.responseSchema;

  static role = AuthAuthLoginSchema.role;
}
