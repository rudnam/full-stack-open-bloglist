const lodash = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) =>
    favorite.likes > blog.likes ? favorite : blog;
  return blogs.length > 0 ? blogs.reduce(reducer) : null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const blogsPerAuthor = lodash.countBy(blogs, "author");
  const reducer = (most, author) => (most[1] > author[1] ? most : author);
  const authorMost = Object.entries(blogsPerAuthor).reduce(reducer);
  return {
    author: authorMost[0],
    blogs: authorMost[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsDict = {};
  const loopingFunct = (blog) => {
    if (!authorsDict[blog.author]) {
      authorsDict[blog.author] = 0;
    }
    authorsDict[blog.author] += blog.likes;
  };
  blogs.forEach(loopingFunct);
  const reducer = (most, author) => (most[1] > author[1] ? most : author);
  const authorMost = Object.entries(authorsDict).reduce(reducer);
  return {
    author: authorMost[0],
    likes: authorMost[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
