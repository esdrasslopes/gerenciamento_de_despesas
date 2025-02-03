const express = require("express");

const router = express.Router();

const upload = require("./helpers/upload");

const {
  createAdm,
  getAll,
  getOne,
  createExpenses,
  updateExpenses,
  getExpenses,
  getExpense,
  deleteExpense,
  toogleExpense,
} = require("./controllers/admController");

router.post("/", (req, res) => createAdm(req, res));

router.get("/", (req, res) => getAll(req, res));

router.get("/:id", (req, res) => getOne(req, res));

router.patch("/:id", upload.single("image"), (req, res) =>
  createExpenses(req, res)
);

router.get("/:id/expenses", (req, res) => getExpenses(req, res));

router.get("/:userId/expense/:expenseId", (req, res) => getExpense(req, res));

router.patch("/:userId/update/:expenseId", upload.single("image"), (req, res) =>
  updateExpenses(req, res)
);

router.delete("/:userId/delete/:expenseId", (req, res) =>
  deleteExpense(req, res)
);

router.patch("/:userId/paid/:expenseId", (req, res) => toogleExpense(req, res));

module.exports = router;
