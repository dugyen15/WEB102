const data = {
  users: [
    { id: 1, username: "ugyen123", email: "ugyen@example.com", bio: "Loves coding and coffee ☕", followers: 120, following: 80 },
    { id: 2, username: "karma_dev", email: "karma@example.com", bio: "Web developer 💻", followers: 200, following: 150 }
  ],
  posts: [
    { id: 101, userId: 1, content: "Hello world! This is my first post 🎉", likes: 10, comments: [1001, 1002], createdAt: "2026-03-25T10:00:00Z" },
    { id: 102, userId: 2, content: "Learning REST APIs is fun! 🚀", likes: 25, comments: [1003], createdAt: "2026-03-25T11:00:00Z" }
  ],
  comments: [
    { id: 1001, postId: 101, userId: 2, text: "Nice post!", createdAt: "2026-03-25T10:05:00Z" },
    { id: 1002, postId: 101, userId: 1, text: "Thank you!", createdAt: "2026-03-25T10:06:00Z" },
    { id: 1003, postId: 102, userId: 1, text: "Totally agree 👍", createdAt: "2026-03-25T11:05:00Z" }
  ]
};

module.exports = data;