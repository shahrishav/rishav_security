const express = require("express");
const categoryController = require("../controllers/categoryControllers");
const { AdminGuard } = require("../middleware/authGuard");

const router = express.Router();

router.post("/create", categoryController.createCategory);

router.get("/get_all_categorys", categoryController.getAllCategorys);

router.get("/get_category/:id", categoryController.getCategoryById);

router.post("/update_category/:id", categoryController.updateCategory);

router.post("/delete_category/:id", categoryController.deleteCategory);

router.get("/pagination", categoryController.paginationCategorys);

module.exports = router;
