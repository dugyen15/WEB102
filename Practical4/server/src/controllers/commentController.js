const prisma = require('../lib/prisma');

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { videoId: parseInt(req.params.videoId) },
      include: {
        user: { select: { id: true, username: true, profilePic: true } },
        _count: { select: { likes: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        userId: req.user.id,
        videoId: parseInt(req.params.videoId)
      },
      include: { user: { select: { id: true, username: true, profilePic: true } } }
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};