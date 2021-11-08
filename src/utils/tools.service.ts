import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  //   async captche() {
  //     const captcha = svgCaptcha.create({
  //       size: 4,
  //       fontSize: 50,
  //       width: 100,
  //       height: 34,
  //       background: '#cc9966',
  //     });
  //     return captcha;
  //   }

  static fail(error: string, status = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      {
        message: '请求失败',
        error: error,
      },
      status,
    );
  }
}
