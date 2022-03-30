import { Swagger } from '@app/utils/swagger';

import { name } from '../../../package.json';

export class SwagggerResponse {
  static getHealth = {
    200: Swagger.defaultResponseText({ status: 200, text: `${name} UP!!` }),
    500: Swagger.defaultResponseError({ route: '/health', status: 500 }),
  };
}

export class SwagggerRequest {
  /** If the controller has a body.  */
}
