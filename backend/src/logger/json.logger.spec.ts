import { JsonLogger } from './JSON.logger';

describe('JSONLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('log() в json', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log('json log');

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);

    expect(payload.level).toBe('log');
    expect(payload.message).toBe('json log');
    expect(payload.optionalParams).toEqual([]);
    expect(typeof payload.time).toBe('string');
  });

  it('error() в json', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('json error');

    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('error');
    expect(payload.message).toBe('json error');
    expect(payload.optionalParams).toEqual([]);
    expect(typeof payload.time).toBe('string');
  });

  it('warn() в json', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('json warn');

    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('warn');
    expect(payload.message).toBe('json warn');
  });

  it('debug() в json', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    logger.debug('json debug', 123, { a: 1 });

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);

    expect(payload.level).toBe('debug');
    expect(payload.message).toBe('json debug');
    expect(payload.optionalParams).toEqual([123, { a: 1 }]);
    expect(typeof payload.time).toBe('string');
  });

  it('verbose() в json', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    logger.verbose('json verbose');

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);

    expect(payload.level).toBe('verbose');
    expect(payload.message).toBe('json verbose');
    expect(payload.optionalParams).toEqual([]);
    expect(typeof payload.time).toBe('string');
  });
});
