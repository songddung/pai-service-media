import { Injectable } from '@nestjs/common';
import type {
  GetMediaResponseData,
  UploadMediaResponseData,
} from 'pai-shared-types';
import { UploadMediaCommand } from 'src/application/command/upload-media.command';
import { GetMediaCommand } from 'src/application/command/get-media.command';
import { GetMediaRequestDto } from 'src/adapter/in/http/dto/get-media-request.dto';
import { GetMediaResult } from 'src/application/port/in/result/get-media.result';
import { UploadMediaRequestDto } from 'src/adapter/in/http/dto/upload-media-request.dto';
import { UploadMediaResult } from 'src/application/port/in/result/upload-media.result';

@Injectable()
export class MediaMapper {
  toUploadMediaCommand(
    file: Express.Multer.File,
    dto: UploadMediaRequestDto,
    profileId: number,
  ): UploadMediaCommand {
    // DTO의 string 타입을 Command의 bigint 타입으로 변환
    return new UploadMediaCommand(
      file,
      dto.ownerType,
      BigInt(dto.ownerId),
      BigInt(profileId),
    );
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

  // 미디어 조회
  toGetMediaCommand(dto: GetMediaRequestDto): GetMediaCommand {
    // "3" 또는 "3,4,5" 형태를 배열로 변환
    const ownerIds = dto.ownerId.split(',').map((id) => BigInt(id.trim()));
    return new GetMediaCommand(dto.ownerType, ownerIds);
  }

  toGetMediaResponse(result: GetMediaResult[]): GetMediaResponseData[] {
    return result.map((media) => ({
      mediaId: String(media.mediaId),
      ownerType: media.ownerType,
      ownerId: String(media.ownerId),
      cdnUrl: media.cdnUrl,
      fileName: media.fileName,
      mimeType: media.mimeType,
      s3Key: media.s3Key,
      createdAt: media.createdAt,
    }));
  }
}
