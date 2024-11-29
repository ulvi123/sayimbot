-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogout" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Camera" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isRecording" BOOLEAN NOT NULL DEFAULT false,
    "resolution" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Inactive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("id")
);
