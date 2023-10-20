import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('close', () => {
      const { method, originalUrl, body } = request;
      const userAgent = request.get('user-agent') || '';
      const { statusCode, statusMessage } = response;

      let message = `${userAgent} ${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      if (body) {
        message = `${message} ${JSON.stringify(body)}`;
      }
      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}