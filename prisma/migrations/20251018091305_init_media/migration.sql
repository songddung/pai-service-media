-- CreateTable
CREATE TABLE "Media" (
    "media_id" BIGSERIAL NOT NULL,
    "owner_type" TEXT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "file_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_size" BIGINT NOT NULL,
    "s3_key" TEXT NOT NULL,
    "cdn_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);
