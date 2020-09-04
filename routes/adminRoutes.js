const express = require("express");
const passport = require("passport")
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const {
  isUserAuthenticated
} = require("../config/customFunction")
const {
  editCategoriesGetRoute
} = require("../controllers/adminControllers");

router.all("/*", isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
});

router.route("/").get(adminControllers.index);
router.route("/posts/index").get(adminControllers.getPosts);
router
  .route("/posts/create")
  .get(adminControllers.createPostsGet)
  .post(adminControllers.submitPosts);
router.route("/posts/edit/:id")
  .get(adminControllers.editPost)
  .put(adminControllers.editPostSubmit);
router.route("/posts/delete/:id").delete(adminControllers.deletePost);
// ADMIN CATEGORY ROUTES
router
  .route("/category")
  .get(adminControllers.getCategories)
  .post(adminControllers.createCategories)
router.route("/category/edit/:id")
  .get(adminControllers.editCategoriesGetRoute)
  .post(adminControllers.editCategoriesPostRoute)
router.route("/category/delete/:id")
  .delete(adminControllers.deleteCategoryPost)

// ADMIN COMMENT CATEGORIES
router.route("/comment")
  .get(adminControllers.getComments)



module.exports = router;