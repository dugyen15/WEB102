const prisma = require('../lib/prisma');

exports.getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      include: {
        user: { select: { id: true, username: true, profilePic: true } },
        _count: { select: { likes: true, comments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail } = req.body;
    const video = await prisma.video.create({
      data: { title, description, videoUrl, thumbnail, userId: req.user.id }
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: { select: { id: true, username: true, profilePic: true } },
        _count: { select: { likes: true, comments: true } }
      }
    });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await prisma.video.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};