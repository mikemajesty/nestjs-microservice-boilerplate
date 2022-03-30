# NestJs boilerplate API

Check the [contributing manual](./CONTRIBUTING.md)

## Description

##### nestjs boilerplate

[nest](https://docs.nestjs.com/) framework documentaion.


## Requirements

- [docker]
- [docker-compose]
- [yarn]
- [NVM]
  - Node >=14 <=15


## prerequisites

1. create file

```bash
 $ touch .env
```

2. add on file

```bash
  ENV=dev
  PORT=3000
  TZ='America/Sao_Paulo'
```

---

## Installation

```bash
 $ yarn
```

--

## Running the app

```bash
# development 
 $ yarn start:dev
```


```bash
# dev/hml/prd environment
 $ docker-compose up --build
```

-- 

## Test

```bash
# unit tests
 $ yarn test

# e2e tests
 $ yarn  test:e2e

# test coverage
 $ yarn  test:coverage
```

--

## Swagger

```bash
# swagger documentation
http://localhost:3000/docs/#/

```

--

## Usage

- throw error

```js
import { ApiException } from '@app/utils/exception';

throw new ApiException({
  error: 'Error message',
  status: HttpStatus.INTERNAL_SERVER_ERROR,
});
```

- logs

```js
import { ILoggerService } from '@app/global/logger/adapter';
import { ApiException } from '@app/utils/exception';

export class Example {
  constructor(
    private readonly loggerService: ILoggerService,
  ) {}

  async example(): void {
    this.loggerService.log(
      data.message,
      `${Example.name}/${this.example.name}`,
    );

    this.loggerService.error(new ApiException({
      error: 'Error message',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    }));

  }
}

```

- envs

```js
import { ISecretsService } from '@app/global/secrets/adapter';

@Injectable()
export class Example {
  constructor(
    private readonly secretService: ISecretsService,
  ) {}

  async example(): void {
    this.secretService.url.PORT;
  }
}
```

## Architecture

- `├── tests`: Test startup settings like envs and mocks.
- `├── src ├── modules`: Application modules, may contain; services, controller, repositories and etc.
- `├── src ├── modules ├── adapter`: Used to communicated with controller and others modules. Controllers and Modules must communicated with abstraction, not implementation.
- `├── src ├── modules ├── swagger`: Swaggger documentation.
- `├── src ├── modules ├── global`: Globals modules that is visibles for all modules.
- `├── src ├── utils`: Utilities for the application that will not necessarily only be used within modules.
- `├── src ├── static`: Application static files like JSON, CSV etc.

---

-- Example Skeleton

```bash
├── CHANGELOG.md
├── commitlint.config.js
├── CONTRIBUTING.md
├── docker-compose.yml
├── Dockerfile
├── jest.config.ts
├── jest-e2e.ts
├── nest-cli.json
├── package.json
├── README.md
├── src
│   ├── filters
│   │   ├── http-exception.filter.ts
│   │   └── __tests__
│   │       └── http-exception.filter.spec.ts
│   ├── interceptors
│   │   ├── http-exception.interceptor.ts
│   │   └── __tests__
│   │       └── http-exception.interceptor.spec.ts
│   ├── main.ts
│   ├── modules
│   │   ├── app.module.ts
│   │   ├── common
│   │   │   ├── http
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   └── module.ts
│   │   ├── global
│   │   │   ├── global.module.ts
│   │   │   ├── logger
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   └── secrets
│   │   │       ├── adapter.ts
│   │   │       ├── module.ts
│   │   │       ├── service.ts
│   │   │       └── __tests__
│   │   │           ├── module.spec.ts
│   │   │           └── service.spec.ts
│   │   ├── health
│   │   │   ├── adapter.ts
│   │   │   ├── controller.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   ├── swaggger.ts
│   │   │   └── __tests__
│   │   │       ├── controller.e2e.spec.ts
│   │   │       ├── module.spec.ts
│   │   │       └── service.spec.ts
│   │   └── __tests__
│   │       └── module.spec.ts
│   ├── static
│   │   └── htttp-status.json
│   └── utils
│       ├── exception.ts
│       ├── swagger.ts
│       └── __tests__
│           └── exception.spec.ts
├── tests
│   └── inialization.ts
├── tsconfig.build.json
└── tsconfig.json

```

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
