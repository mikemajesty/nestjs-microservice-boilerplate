jest.setTimeout(2000);

process.env.ENV = 'test';
process.env.PORT = '3000';

// --------------------------MOCK--------------------------------/
jest.mock(
  'moment-timezone',
  () =>
    jest.fn(() => ({
      tz: () => ({
        format: jest.fn(),
      }),
    })) as any,
);
