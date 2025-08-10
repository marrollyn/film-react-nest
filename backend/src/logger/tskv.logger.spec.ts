import { TSKVLogger } from './tskv.logger';

describe('TSKVLogger tests', () => {
  let logger: TSKVLogger;

  beforeEach(() => {
    logger = new TSKVLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('log()', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log('test');

    expect(spy).toHaveBeenCalledTimes(1);
    const line = spy.mock.calls[0][0] as string;

    expect(typeof line).toBe('string');
    expect(line).toContain('level=log');
    expect(line).toContain('time=');
    expect(line).toContain('message=test');
    expect(line).not.toContain('trace=');
  });

  it('error()', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('err', 'test');

    expect(spy).toHaveBeenCalledTimes(1);
    const line = spy.mock.calls[0][0] as string;

    expect(line).toContain('level=error');
    expect(line).toContain('message=err');
    expect(line).toContain('trace=test');
  });

  it('warn()/debug()/verbose()', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const debug = jest.spyOn(console, 'debug').mockImplementation(() => {});
    const info = jest.spyOn(console, 'info').mockImplementation(() => {});

    logger.warn('warn');
    logger.debug('debug');
    logger.verbose('verbose');

    expect(warn).toHaveBeenCalled();
    expect(debug).toHaveBeenCalled();
    expect(info).toHaveBeenCalled();

    expect(warn.mock.calls[0][0] as string).toContain('level=warn');
    expect(debug.mock.calls[0][0] as string).toContain('level=debug');
    expect(info.mock.calls[0][0] as string).toContain('level=verbose');
  });
});
