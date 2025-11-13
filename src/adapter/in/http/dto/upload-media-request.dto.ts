// 파일 업로드만 수행하므로 별도 DTO 필드 불필요
// multer가 파일을 처리하고, 컨트롤러에서 직접 접근
export class UploadMediaRequestDto {
  // 파일은 @UploadedFile() 데코레이터로 처리됨
}
