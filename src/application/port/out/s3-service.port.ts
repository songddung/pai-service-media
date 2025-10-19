export interface S3ServicePort {
  /**
   * 파일을 S3에 업로드
   * @param file - 업로드할 파일
   * @returns S3 키와 CDN URL
   */
  upload(file: Express.Multer.File): Promise<{
    s3Key: string;
    cdnUrl: string;
  }>;

  /**
   * S3에서 파일 삭제
   * @param s3Key - 삭제할 파일의 S3 키
   */
  delete(s3Key: string): Promise<void>;
}
