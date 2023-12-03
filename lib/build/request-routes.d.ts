import { BaseRequestRoute } from '../core';
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
export declare class AuthAuthLoginRequestRoute extends BaseRequestRoute {
    static method: string;
    static topic: string;
    static requestSchema: import("@sinclair/typebox").TObject<import("@sinclair/typebox").TObject<{
        username: import("@sinclair/typebox").TString;
        password: import("@sinclair/typebox").TString;
    }>>;
    static responseSchema: import("@sinclair/typebox").TObject<import("@sinclair/typebox").TObject<{
        token: import("@sinclair/typebox").TString;
    }>>;
    static role: string;
}
