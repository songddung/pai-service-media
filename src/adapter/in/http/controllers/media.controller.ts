import {
  Body,
  Controller,
  Get,
  Inject,
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
import type {
  BaseResponse,
  UploadMediaResponseData,
  GetMediaResponseData,
} from 'pai-shared-types';
import { UploadMediaRequestDto } from '../dto/upload-media-request.dto';
import { GetMediaRequestDto } from '../dto/get-media-request.dto';
import { Auth } from '../decorators/auth.decorator';
import { MediaMapper } from 'src/mapper/media.mapper';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/media')
export class MediaController {
  constructor(
    @Inject(MEDIA_TOKENS.UploadMediaUseCase)
    private readonly uploadUseCase: UploadMediaUseCase,
    @Inject(MEDIA_TOKENS.GetMediaUseCase)
    private readonly getMediaUseCase: GetMediaUseCase,
    private readonly mediaMapper: MediaMapper,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadMediaRequestDto,
    @Auth('profileId') profileId: number,
  ): Promise<BaseResponse<UploadMediaResponseData>> {
    const command = this.mediaMapper.toUploadMediaCommand(file, dto, profileId);
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
    @Query() dto: GetMediaRequestDto,
  ): Promise<BaseResponse<GetMediaResponseData[]>> {
    // Mapper를 통해 Command 생성
    const command = this.mediaMapper.toGetMediaCommand(dto);

    // Use case 실행
    const result = await this.getMediaUseCase.execute(command);
    const response = this.mediaMapper.toGetMediaResponse(result);
    return {
      success: true,
      message: '미디어 조회 성공',
      data: response,
    };
  }
}
