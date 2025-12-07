import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MEDIA_TOKENS } from 'src/media.token';
import type { UploadMediaUseCase } from 'src/application/port/in/upload-media.use-case';
import type { GetMediaUseCase } from 'src/application/port/in/get-media.use-case';
import type { DeleteMediaUseCase } from 'src/application/port/in/delete-media.use-case';
import type {
  BaseResponse,
  UploadMediaResponseData,
  GetMediaResponseData,
} from 'pai-shared-types';
import { MediaMapper } from 'src/application/port/in/mapper/media.mapper';
import { BasicAuthGuard } from '../auth/guards/auth.guard';
import { DeleteMediaCommand } from 'src/application/command/delete-media.command';
import { BatchDeleteMediaRequestDto } from '../dto/batch-delete.request.dto';
import type { BatchDeleteMediaUseCase } from 'src/application/port/in/batch-delete-media.use-case';

@UseGuards(BasicAuthGuard)
@Controller('api/media')
export class MediaController {
  constructor(
    @Inject(MEDIA_TOKENS.UploadMediaUseCase)
    private readonly uploadUseCase: UploadMediaUseCase,
    
    @Inject(MEDIA_TOKENS.GetMediaUseCase)
    private readonly getMediaUseCase: GetMediaUseCase,
    
    @Inject(MEDIA_TOKENS.DeleteMediaUseCase)
    private readonly deleteMediaUseCase: DeleteMediaUseCase,

    @Inject(MEDIA_TOKENS.BatchDeleteMediaUseCase)
    private readonly batchDeleteMediaUseCase: BatchDeleteMediaUseCase,

    private readonly mediaMapper: MediaMapper,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponse<UploadMediaResponseData>> {
    const command = this.mediaMapper.toUploadMediaCommand(file);
    const result = await this.uploadUseCase.execute(command);
    const response = this.mediaMapper.toUploadMediaResponse(result);

    return {
      success: true,
      message: '파일 업로드 성공',
      data: response,
    };
  }

  @Get()
  async getMedia(
    @Query('mediaIds') mediaIds?: string,
  ): Promise<BaseResponse<GetMediaResponseData[]>> {
    // mediaIds 파라미터를 bigint 배열로 변환
    const ids = mediaIds
      ? mediaIds.split(',').map((id) => BigInt(id.trim()))
      : [];

    // Mapper를 통해 Command 생성
    const command = this.mediaMapper.toGetMediaCommand(ids);

    // Use case 실행
    const result = await this.getMediaUseCase.execute(command);
    const response = this.mediaMapper.toGetMediaResponse(result);
    return {
      success: true,
      message: '미디어 조회 성공',
      data: response,
    };
  }

    @Delete('batch')
  async batchDeleteMedia(
    @Body() dto: BatchDeleteMediaRequestDto,
  ): Promise<BaseResponse<null>> {
    const command = this.mediaMapper.toBatchDeleteMediaCommand(dto);
    await this.batchDeleteMediaUseCase.execute(command);
    return {
      success: true,
      message: '미디어 삭제 배치 작업 성공',
      data: null,
    }
  }

  @Delete(':mediaId')
  async deleteMedia(
    @Param('mediaId') mediaId: string,
  ): Promise<BaseResponse<null>> {
    const command = new DeleteMediaCommand(BigInt(mediaId));
    await this.deleteMediaUseCase.execute(command);
    return {
      success: true,
      message: '미디어 삭제 성공',
      data: null,
    };
  }



}
