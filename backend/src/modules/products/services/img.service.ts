import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';

@Injectable()
export class S3Service {
  private readonly s3 = new AWS.S3(); // usa la config global del main

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = mime.extension(file.mimetype);
    const fileName = `${uuid()}.${fileExtension}`;
    const bucket = 'nombre-de-tu-bucket';

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    await this.s3.upload(params).promise();

    return `https://${bucket}.s3.${AWS.config.region}.amazonaws.com/${fileName}`;
  }
}
