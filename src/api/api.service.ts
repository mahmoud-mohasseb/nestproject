import { Injectable } from '@nestjs/common';

import { extname } from 'path';

@Injectable()
export class APIservice {
  getHello(): string {
    return 'Hello World ayan on 3000!';
  }
}
