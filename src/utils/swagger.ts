import { ApiResponseOptions } from '@nestjs/swagger';

import * as htttpStatus from '../static/htttp-status.json';
import { ErrorModel } from './exception';

type SwaggerError = {
  status: number;
  route: string;
  message?: string | unknown;
  description?: string;
};

type SwaggerText = {
  status: number;
  text: string | unknown;
  description?: string;
};

type SwaggerJSON = {
  status: number;
  json: unknown;
  description?: string;
};

export class Swagger {
  static defaultResponseError({ status, route, message, description }: SwaggerError): ApiResponseOptions {
    return {
      schema: {
        example: {
          error: {
            code: status,
            traceId: '<traceId>',
            message: message || htttpStatus[String(status)],
            timestamp: '<timestamp>',
            path: route,
          },
        } as ErrorModel,
      },
      description,
      status,
    };
  }

  static defaultResponseText({ status, text, description }: SwaggerText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      description,
      status,
    };
  }

  static defaultResponseJSON({ status, json, description }: SwaggerJSON): ApiResponseOptions {
    return {
      content: {
        'application/json': {
          schema: {
            example: json,
          },
        },
      },
      description,
      status,
    };
  }

  static defaultRequestJSON(json: unknown): ApiResponseOptions {
    return {
      schema: {
        example: json,
      },
    };
  }
}
