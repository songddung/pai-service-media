import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UploadMediaUseCase } from '../port/in/upload-media.use-case';
import { MEDIA_TOKENS } from 'src/media.token';
import { UploadMediaCommand } from '../command/upload-media.command';
import type { MediaRepositoryPort } from '../port/out/media.repository.port';
import type { S3ServicePort } from '../port/out/s3-service.port';
import { Media } from 'src/domain/model/entity/media.entity';
import { FileInfo } from 'src/domain/model/vo/file-info.vo';
import { StorageInfo } from 'src/domain/model/vo/storage-info.vo';
import { UploadMediaResult } from '../port/in/result/upload-media.result';

@Injectable()
export class UploadMediaService implements UploadMediaUseCase {
  constructor(
    @Inject(MEDIA_TOKENS.mediaRepositoryPort)
    private readonly mediaRepository: MediaRepositoryPort,

    @Inject(MEDIA_TOKENS.s3ServicePort)
    private readonly s3Service: S3ServicePort,
  ) {}

  async execute(command: UploadMediaCommand): Promise<UploadMediaResult> {
    // 1. 파일 검증
    this.validateFile(command.file);

    // 2. S3에 파일 업로드
    const { s3Key, cdnUrl } = await this.s3Service.upload(command.file);

    // 3. FileInfo VO 생성
    const fileInfo = FileInfo.create(
      command.file.originalname,
      command.file.mimetype,
      BigInt(command.file.size),
    );

    // 4. StorageInfo VO 생성
    const storageInfo = StorageInfo.create(s3Key, cdnUrl);

    // 5. Media 엔티티 생성
    const media = Media.create({
      fileInfo,
      storageInfo,
    });

    // 6. DB에 저장
    const saved = await this.mediaRepository.save(media);

    // 7. Response DTO 변환
    return {
      mediaId: saved.getId()!,
      cdnUrl: saved.getCdnUrl(),
      fileName: saved.getFileName(),
      mimeType: saved.getMimeType(),
      fileSize: saved.getFileSize(),
      createdAt: saved.getCreatedAt().toISOString(),
    };
  }

  private validateFile(file: Express.Multer.File): void {
    // 파일 존재 여부
    if (!file) {
      throw new BadRequestException('파일이 필요합니다.');
    }

    // 파일 크기 제한 (예: 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('파일 크기는 10MB를 초과할 수 없습니다.');
    }

    // MIME 타입 검증 (예: 이미지, 오디오, 비디오 허용)
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'audio/mpeg',
      'audio/wav',
      'video/mp4',
      'video/webm',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        '지원하지 않는 파일 형식입니다. (이미지, 오디오, 비디오만 허용)',
      );
    }
  }
}
