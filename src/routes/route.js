const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")
const blogController = require("../controller/blogController")
const loginController = require("../controller/loginController")
const middleware = require("../middleware/Auth")


//API for create Author
router.post("/authors", authorController.createAuthor)



//API For Create blog, Details of blog, Update the blog, Delete the blog
router.post("/blogs", middleware.authenticate, blogController.createBlog)

router.get("/blogs/:authorId", middleware.authenticate, blogController.getBlogs)

router.put("/updateblogs/:authorId/:blogId", middleware.authenticate, middleware.authorize, blogController.updateblog)

router.delete("/deleteblogs/:authorId/:blogId",middleware.authenticate, middleware.authorize, blogController.deletebyId)

router.delete("/deleteblogs/:authorId", middleware.authenticate, middleware.authorize, blogController.deletebyQuery)

router.post("/login",loginController.loginUser)





module.exports = router