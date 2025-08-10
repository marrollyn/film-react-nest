import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const time = new Date().toISOString();
    const tskvMessage = `level=${level}\ttime=${time}\tmessage=${message}`;
    const trace = optionalParams[0] as string | undefined;
    return trace ? `${tskvMessage}\ttrace=${trace}` : tskvMessage;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, ...optionalParams));
  }
}
