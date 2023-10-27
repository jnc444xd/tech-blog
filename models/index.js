const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Each Post belongs to a User
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Each Comment belongs to a User
UserUser.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});