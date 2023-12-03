import { BaseBroadcastRoute } from '../core';
import UserRegistratedSchema from '../schemas/broadcasts/user/registrated';

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
export class UserRegistratedBroadcastRoute extends BaseBroadcastRoute {
  static method = 'user.registrated';
  static topic = 'user.registrated';

  static dataSchema = UserRegistratedSchema.dataSchema;
}
