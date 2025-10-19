import { Module } from '@nestjs/common';
import { AuthGuard, ParentGuard, ChildGuard, BasicAuthGuard } from './adapter/in/http/auth/guards/auth.guard';
import { MediaMapper } from './mapper/media.mapper';
import { MediaController } from './adapter/in/http/controllers/media.controller';
import { MEDIA_TOKENS } from './media.token';
import { UploadMediaService } from './application/use-cases/upload-media.service';
import { GetMediaService } from './application/use-cases/get-media.service';
import { MediaRepositoryAdapter } from './adapter/out/persistence/media.repository.adapter';
import { S3Service } from './adapter/out/storage/s3.service';
import { PrismaService } from './adapter/out/persistence/prisma/prisma.service';
import { RedisModule } from './adapter/out/cache/redis.module';
import { RedisTokenVersionQueryAdapter } from './adapter/out/cache/redis-token-version.query.adapter';

@Module({
  imports: [RedisModule],
  controllers: [MediaController],
  providers: [
    // Guard
    AuthGuard,
    BasicAuthGuard,
    ParentGuard,
    ChildGuard,

    // Mapper
    MediaMapper,

    // UseCase 바인딩
    { provide: MEDIA_TOKENS.UploadMediaUseCase, useClass: UploadMediaService },
    { provide: MEDIA_TOKENS.GetMediaUseCase, useClass: GetMediaService },

    // Query 바인딩 (읽기)
    {
      provide: MEDIA_TOKENS.TokenVersionQueryPort,
      useClass: RedisTokenVersionQueryAdapter,
    },

    // Repository 바인딩 (쓰기)
    {
      provide: MEDIA_TOKENS.mediaRepositoryPort,
      useClass: MediaRepositoryAdapter,
    },

    // External Services 바인딩
    {
      provide: MEDIA_TOKENS.s3ServicePort,
      useClass: S3Service,
    },

    // Infrastructure
    PrismaService,
  ],
})
export class MediaModule {}
