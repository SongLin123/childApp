/**
 * 应急响应
 * unknown
 *
 * OpenAPI spec version: last
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

/**
  * @property `[id]` 
  * @property `[createdTime]` 
  * @property `[whetherCasualties]` 
  * @property `[content]` 
  * @property `[attachmentList]` 
  * @property `[receiverList]` 
  */
export interface SingleDataData {
  "id"?: number;
  "createdTime"?: string;
  "whetherCasualties"?: boolean;
  "content"?: string;
  "attachmentList"?: Array<string>;
  "receiverList"?: Array<string>;
}
