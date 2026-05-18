const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create 10 users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        username: `seeduser${i}`,
        email: `seeduser${i}@example.com`,
        password: hashedPassword,
        name: `Seed User ${i}`,
        bio: `Bio for seed user ${i}`
      }
    });
    users.push(user);
    console.log(`Created user: ${user.username}`);
  }

  // Create 50 videos (5 per user)
  const videos = [];
  for (const user of users) {
    for (let j = 1; j <= 5; j++) {
      const video = await prisma.video.create({
        data: {
          title: `Video ${j} by ${user.username}`,
          description: `Description for video ${j}`,
          videoUrl: `https://example.com/video-${user.id}-${j}.mp4`,
          userId: user.id
        }
      });
      videos.push(video);
    }
  }
  console.log(`Created ${videos.length} videos`);

  // Create 200 comments
  for (let i = 0; i < 200; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    await prisma.comment.create({
      data: {
        text: `Comment ${i + 1} on this video`,
        userId: randomUser.id,
        videoId: randomVideo.id
      }
    });
  }
  console.log('Created 200 comments');

  // Create 300 video likes (unique pairs)
  const videoLikePairs = new Set();
  let videoLikesCreated = 0;
  let attempts = 0;
  while (videoLikesCreated < 300 && attempts < 10000) {
    attempts++;
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const pair = `${randomUser.id}-${randomVideo.id}`;
    if (!videoLikePairs.has(pair)) {
      videoLikePairs.add(pair);
      await prisma.like.create({
        data: { userId: randomUser.id, videoId: randomVideo.id }
      });
      videoLikesCreated++;
    }
  }
  console.log(`Created ${videoLikesCreated} video likes`);

  // Create 40 follow relationships (unique pairs)
  const followPairs = new Set();
  let followsCreated = 0;
  let fattempts = 0;
  while (followsCreated < 40 && fattempts < 10000) {
    fattempts++;
    const follower = users[Math.floor(Math.random() * users.length)];
    const following = users[Math.floor(Math.random() * users.length)];
    const pair = `${follower.id}-${following.id}`;
    if (follower.id !== following.id && !followPairs.has(pair)) {
      followPairs.add(pair);
      await prisma.follow.create({
        data: { followerId: follower.id, followingId: following.id }
      });
      followsCreated++;
    }
  }
  console.log(`Created ${followsCreated} follow relationships`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });