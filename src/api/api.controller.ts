import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
// import { APIservice } from './api.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

// constructor used for the following requests
@Controller('api')
export class APIController {
  // contructor incase we build scheme
  // constructor(private readonly apiservice: APIservice) {}

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });

    return response;
  }

  // @Get('uploads')
  // display(@Res() res) {
  //   // console.log(res);
  //   res.sendFile('seto.png', { root: './uploads' });
  // }
  // param for image path

  @Get('/multiple/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    console.log('hit this route');
    console.log(image);
    return res.sendFile(image, { root: './uploads' });
  }
}
