import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MEDIA_TOKENS } from 'src/media.token';
import type { GetMediaUseCase } from 'src/application/port/in/get-media.use-case';
import type {
  BaseResponse,
  GetMediaResponseData,
} from 'pai-shared-types';
import { MediaMapper } from 'src/application/port/in/mapper/media.mapper';

/**
 * 내부 서비스 간 통신용 컨트롤러 (인증 없음)
 */
@Controller('internal/media')
export class InternalMediaController {
  constructor(
    @Inject(MEDIA_TOKENS.GetMediaUseCase)
    private readonly getMediaUseCase: GetMediaUseCase,
    private readonly mediaMapper: MediaMapper,
  ) {}

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
}
