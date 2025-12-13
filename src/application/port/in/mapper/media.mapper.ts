import { Injectable } from '@nestjs/common';
import type {
  GetMediaResponseData,
  UploadMediaResponseData,
} from 'pai-shared-types';
import { UploadMediaCommand } from 'src/application/command/upload-media.command';
import { GetMediaCommand } from 'src/application/command/get-media.command';
import { GetMediaResult } from 'src/application/port/in/result/get-media.result';
import { UploadMediaResult } from 'src/application/port/in/result/upload-media.result';
import { BatchDeleteMediaCommand } from 'src/application/command/batch-delete-media.command';
import { BatchDeleteMediaRequestDto } from 'src/adapter/in/http/dto/batch-delete.request.dto';

@Injectable()
export class MediaMapper {
  toUploadMediaCommand(file: Express.Multer.File): UploadMediaCommand {
    return new UploadMediaCommand(file);
  }

  toUploadMediaResponse(result: UploadMediaResult): UploadMediaResponseData {
    return {
      mediaId: String(result.mediaId),
      cdnUrl: result.cdnUrl,
      fileName: result.fileName,
      mimeType: result.mimeType,
      fileSize: String(result.createdAt),
      createdAt: result.createdAt,
    };
  }

  // 미디어 조회 (ID로 필터링 또는 전체 조회)
  toGetMediaCommand(mediaIds: bigint[] = []): GetMediaCommand {
    return new GetMediaCommand(mediaIds);
  }

  toGetMediaResponse(result: GetMediaResult[]): GetMediaResponseData[] {
    return result.map((media) => ({
      mediaId: String(media.mediaId),
      cdnUrl: media.cdnUrl,
      fileName: media.fileName,
      mimeType: media.mimeType,
      s3Key: media.s3Key,
      createdAt: media.createdAt,
    }));
  }

  toBatchDeleteMediaCommand(
    dto: BatchDeleteMediaRequestDto,
  ): BatchDeleteMediaCommand {
    return new BatchDeleteMediaCommand(
      dto.mediaIds.map((mediaId) => BigInt(mediaId)),
    );
  }
}
