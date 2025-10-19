import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MEDIA_TOKENS } from 'src/media.token';
import type { UploadMediaUseCase } from 'src/application/port/in/upload-media.use-case';
import type {
  BaseResponse,
  UploadMediaResponseData,
} from 'pai-shared-types';
import { UploadMediaRequestDto } from '../dto/upload-media-request.dto';
import { Auth } from '../decorators/auth.decorator';
import { MediaMapper } from 'src/mapper/media.mapper';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/media')
export class MediaController {
  constructor(
    @Inject(MEDIA_TOKENS.UploadMediaUseCase)
    private readonly uploadUseCase: UploadMediaUseCase,
    private readonly mediaMapper: MediaMapper,
    // @Inject(MEDIA_TOKENS.GetMediaUseCase)
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadMediaRequestDto,
    @Auth('profileId') profileId: number,
  ): Promise<BaseResponse<UploadMediaResponseData>> {
    console.log(dto);
    console.log(profileId);
    const command = this.mediaMapper.toUploadMediaCommand(file, dto, profileId);
    const result = await this.uploadUseCase.execute(command);

    return {
      success: true,
      message: '파일 업로드 성공',
      data: result,
    };
  }
}
