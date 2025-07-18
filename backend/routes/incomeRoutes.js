const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect }= require("../middlewares/authMiddleware");

const router  = express.Router();

router.post("/add",protect, addIncome);
router.get("/get",protect, getAllIncome);
router.delete("/:id",protect, deleteIncome);
router.get("/downloadExcel",protect, downloadIncomeExcel);

module.exports = router;
