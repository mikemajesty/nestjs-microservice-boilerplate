import { ILoggerService } from '@app/global/logger/adapter';
import { ApiException } from '@app/utils/exception';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppExceptionFilter } from '../http-exception.filter';

const mock = jest.genMockFromModule<ArgumentsHost>('@nestjs/common');

describe('AppExceptionFilter', () => {
  let appExceptionFilter: AppExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app = await Test.createTestingModule({
      providers: [
        AppExceptionFilter,
        {
          provide: ILoggerService,
          useValue: { error: jest.fn() },
        },
      ],
    }).compile();

    appExceptionFilter = app.get(AppExceptionFilter);
  });

  test('should catch successfully', () => {
    const error = new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR);

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });
    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully without "code and context"', () => {
    const error = new ApiException('Error');

    error.statusCode = undefined;
    error.context = undefined;
    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });
    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully with unknown "status"', () => {
    const error = new ApiException('Error', 1000);

    error.statusCode = undefined;
    error.context = undefined;
    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    appExceptionFilter.catch(error, mock);
  });

  test('should catch successfully without error message', () => {
    const error = jest.genMockFromModule<ApiException>('@nestjs/common');

    mock.switchToHttp = () => ({
      getNext: jest.fn(),
      getResponse: jest.fn().mockReturnValue({
        status: () => ({ json: jest.fn() }),
      }),
      getRequest: jest.fn().mockReturnValue({
        url: 'url',
      }),
    });

    appExceptionFilter.catch(error, mock);
  });
});
