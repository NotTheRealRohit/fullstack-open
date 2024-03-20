const { max } = require('lodash');
const countBy = require('lodash.countby');

const dummy = (blogs) => (blogs.length === 1 ? 1 : 12);

const checkTotalLikes = (blogs) => {
  const calculateLikes = blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0);
  return blogs.length === 0 ? 0 : calculateLikes;
};

const getMostLikedPost = (blogs) => {
  if (blogs.length === 0) return [];

  const likes = blogs.map((blog) => blog.likes);
  const maxLike = Math.max(...likes);
  const blogWithMostLikes = blogs.filter((blog) => blog.likes === maxLike)[0];
  const data = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  };
  return data;
};

const getMostBlogsByAnAuthor = (blogs) => {
  if (blogs.length === 0) return [];

  const result = [];
  blogs.forEach((item) => {
    if (!result.some((i) => i.author === item.author)) {
      result.push({
        author: item.author,
        blogs: 1,
      });
    } else {
      const index = result.findIndex((i) => i.author === item.author);
      result[index].blogs += 1;
    }
  });
  const maxPosts = Math.max(...result.map((item) => item.blogs));
  const authorWithMostBlogs = result.filter((item) => item.blogs === maxPosts)[0];
  return authorWithMostBlogs;
};

const getMostLikedAuthor = (blogs) => {
  if (blogs.length === 0) return [];

  const result = [];
  blogs.forEach((item) => {
    if (!result.some((i) => i.author === item.author)) {
      result.push({
        author: item.author,
        likes: item.likes,
      });
    } else {
      const index = result.findIndex((i) => i.author === item.author);
      result[index].likes += item.likes;
    }
  });
  const maxPosts = Math.max(...result.map((item) => item.likes));
  const authorWithMostLikes = result.filter((item) => item.likes === maxPosts)[0];
  console.log(authorWithMostLikes);
  return authorWithMostLikes;
};

module.exports = {
  dummy,
  checkTotalLikes,
  getMostLikedPost,
  getMostBlogsByAnAuthor,
  getMostLikedAuthor,
};
