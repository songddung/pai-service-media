export const MEDIA_TOKENS = {
  // UseCase (Input Ports)
  UploadMediaUseCase: Symbol('UploadMediaUseCase'),

  // Repository (Output Ports - Write)
  mediaRepositoryPort: Symbol('mediaRepositoryPort'),

  // Query (Output Ports - Read)
  TokenVersionQueryPort: Symbol('TokenVersionQueryPort'),

  // External Services (Output Ports)
  s3ServicePort: Symbol('s3ServicePort'),

  // Security (Output Ports)
};
