const express = require('express');

const { Blog } = require('../models/index');
const { checkRole, checkJWT } = require('../../auth/routes/index');

const blogRoutes = express();
blogRoutes.use(checkJWT);

//RESTful Route Declarations
// Retrieve all
blogRoutes.get(
  '/blog',
  checkRole(['reader', 'writer', 'editor', 'admin']),
  getBlogs
);
// Retrieve one
blogRoutes.get(
  '/blog/:id',
  checkRole(['reader', 'writer', 'editor', 'admin']),
  getBlog
);
// Create
blogRoutes.post('/blog', checkRole(['writer', 'editor', 'admin']), createBlog);
// Update
blogRoutes.put('/blog/:id', checkRole(['editor', 'admin']), updateBlog);
// Delete
blogRoutes.delete('/blog/:id', checkRole(['admin']), deleteBlog);

async function getBlogs(req, res, next) {
  const allBlogs = await Blog.findAll();
  res.json(allBlogs);
}

async function getBlog(req, res, next) {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } });
  if (blog === null) {
    next();
  } else {
    const rawBlog = {
      id: blog.id,
      title: blog.title,
      body: blog.body,
    };
    res.json(rawBlog);
  }
}

async function createBlog(req, res, next) {
  const { title, body } = req.body;
  const blog = await Blog.create({ title, body });
  res.json(blog);
}

async function updateBlog(req, res, next) {
  const id = req.params.id;
  let blog = await Blog.findOne({ where: { id: id } });
  if (blog === null) {
    next();
  } else {
    const title = req.body.title ?? blog.title;
    const body = req.body.body ?? blog.body;
    let updatedBlog = {
      title,
      body,
    };

    blog = await blog.update(updatedBlog);
    res.json(blog);
  }
}

async function deleteBlog(req, res, next) {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } });
  if (blog === null) {
    next();
  } else {
    await blog.destroy();
    res.json({});
  }
}

module.exports = {
  blogRoutes,
};
