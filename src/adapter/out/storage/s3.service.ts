import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { S3ServicePort } from 'src/application/port/out/s3-service.port';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service implements S3ServicePort {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cdnDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION') || 'ap-northeast-2',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')!;
    this.cdnDomain = this.configService.get<string>('S3_CDN_BASE_URL') || '';
  }

  async upload(file: Express.Multer.File): Promise<{ s3Key: string; cdnUrl: string }> {
    // 고유한 파일명 생성 (UUID + 원본 확장자)
    const fileExtension = file.originalname.split('.').pop();
    const s3Key = `media/${uuidv4()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read', // 필요시 public 설정
    });

    await this.s3Client.send(command);

    // CDN URL 생성
    const cdnUrl = this.cdnDomain
      ? `${this.cdnDomain}/${s3Key}`
      : `https://${this.bucketName}.s3.amazonaws.com/${s3Key}`;

    return { s3Key, cdnUrl };
  }

  async delete(s3Key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
    });

    await this.s3Client.send(command);
  }
}
