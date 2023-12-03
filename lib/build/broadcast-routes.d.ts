import { BaseBroadcastRoute } from '../core';
/**
* @description
* ## User Registrated Broadcast
*
* User registrated broadcast
*
* Data interface:
* ```
* export interface DataSchema {
*   userId: number;
*   [k: string]: unknown;
* }
*
* ```
*/
export declare class UserRegistratedBroadcastRoute extends BaseBroadcastRoute {
    static method: string;
    static topic: string;
    static dataSchema: import("@sinclair/typebox").TObject<import("@sinclair/typebox").TObject<{
        userId: import("@sinclair/typebox").TNumber;
    }>>;
}
