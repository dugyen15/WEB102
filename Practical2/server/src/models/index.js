// server/src/models/index.js

let users = [
    { id: 1, name: "Dorji" },
    { id: 2, name: "Ugyen" }
];

let videos = [
    { id: 1, title: "Funny Video", userId: 1 },
    { id: 2, title: "Sad Video", userId: 2 }
];

let comments = [
    { id: 1, text: "Wow!", videoId: 1 }
];

module.exports = {
    users,
    videos,
    comments
};