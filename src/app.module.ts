import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media.module';

@Module({
  imports: [
    // 전역 환경변수 설정 (.env)
    ConfigModule.forRoot({ isGlobal: true }),
    MediaModule,
  ],
})
export class AppModule {}
