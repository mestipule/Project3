const router = require("express").Router();
const intersectionsController = require("../../controllers/intersectionsController");

// Matches with "/api/intersections"
router.route("/")
  .get(intersectionsController.findAll)
  .post(intersectionsController.create);

// Matches with "/api/intersections/:id"
router
  .route("/:id")
  .get(intersectionsController.findById)
  .put(intersectionsController.update)
  .delete(intersectionsController.remove);

module.exports = router;
