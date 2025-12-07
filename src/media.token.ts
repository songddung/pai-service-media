export const MEDIA_TOKENS = {
  // UseCase (Input Ports)
  UploadMediaUseCase: Symbol('UploadMediaUseCase'),
  GetMediaUseCase: Symbol('GetMediaUseCase'),
  DeleteMediaUseCase: Symbol('DeleteMediaUseCase'),
  BatchDeleteMediaUseCase: Symbol('BatchDeleteMediaUseCase'),

  // Repository (Output Ports - Write)
  mediaRepositoryPort: Symbol('mediaRepositoryPort'),

  // Query (Output Ports - Read)
  MediaQueryPort: Symbol('MediaQueryPort'),
  mediaQueryPort: Symbol('mediaQueryPort'),
  TokenVersionQueryPort: Symbol('TokenVersionQueryPort'),

  // External Services (Output Ports)
  s3ServicePort: Symbol('s3ServicePort'),

  // Security (Output Ports)
};
