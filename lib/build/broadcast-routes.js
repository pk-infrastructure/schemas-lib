"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistratedBroadcastRoute = void 0;
const core_1 = require("../core");
const registrated_1 = __importDefault(require("../schemas/broadcasts/user/registrated"));
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
class UserRegistratedBroadcastRoute extends core_1.BaseBroadcastRoute {
}
exports.UserRegistratedBroadcastRoute = UserRegistratedBroadcastRoute;
UserRegistratedBroadcastRoute.method = 'user.registrated';
UserRegistratedBroadcastRoute.topic = 'user.registrated';
UserRegistratedBroadcastRoute.dataSchema = registrated_1.default.dataSchema;
//# sourceMappingURL=broadcast-routes.js.map