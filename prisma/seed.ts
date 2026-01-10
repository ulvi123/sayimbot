import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.camera.create({
    data: {
      name: 'Camera 1',
      isRecording: false,
      resolution: '1080p',
      status: 'Inactive',
    },
  });

  await prisma.camera.create({
    data: {
      name: 'Camera 2',
      isRecording: true,
      resolution: '720p',
      status: 'Active',
    },
  });

  console.log('Sample data added to Camera table');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
