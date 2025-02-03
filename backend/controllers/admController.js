const userModel = require("../models/Adm");

const fs = require("fs");

const removeOldImage = (expenses) => {
  fs.unlink(`public/${expenses.src}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Imagem excluída com sucesso!");
    }
  });
};

const createAdm = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Por favor preencha todos os campos" });
    }

    const newUser = new userModel({ name, email, password });

    await newUser.save();

    res.json({ newUser, msg: "Registro criado com sucesso" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro");
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userModel.find();

    res.json({ users, msg: "Usuários resgatados com sucesso" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro");
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);

    if (!user) {
      return res.json({ msg: "Usuário não encontrado" });
    }

    res.json({ user, msg: "Usuário encontrado com sucesso!" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro");
  }
};

const createExpenses = async (req, res) => {
  try {
    const id = req.params.id;

    const { type, title, value, date } = req.body;

    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    if (!type || !title || !value || !date) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos" });
    }

    const expenses = { type, title, value, date };

    if (src) {
      expenses.src = src;
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    user.expenses.push(expenses);

    await user.save();

    res.json({ msg: "Despesas adicionadas", user });
  } catch (error) {
    res.status(500).send("Ocorreu um erro");
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.json({
      msg: "Despesas encontradas com sucesso!",
      expenses: user.expenses,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar despesas" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.params.userId;

    const expenseId = req.params.expenseId;

    const user = await userModel.findById(userId);

    const expense = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    res.json({ msg: "Despesa encontrada com sucesso!", expense });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar despesa" });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const userId = req.params.userId;

    const expenseId = req.params.expenseId;

    const { type, title, value, date } = req.body;

    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const expenseToUpdate = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    if (!expenseToUpdate) {
      return res.status(404).json({ msg: "Despesa não encontrada!" });
    }

    if (src && expenseToUpdate.src) {
      removeOldImage(expenseToUpdate);
    }

    if (type) expenseToUpdate.type = type;

    if (title) expenseToUpdate.title = title;

    if (value) expenseToUpdate.value = value;

    if (date) expenseToUpdate.date = date;

    if (src) expenseToUpdate.src = src;

    await user.save();

    res.json({ msg: "Despesa atualizada com sucesso!", expenseToUpdate });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar despesas" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.params.userId;

    const expenseId = req.params.expenseId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const expenseToDelete = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    if (!expenseToDelete) {
      return res.status(404).json({ msg: "Despesa não encontrada" });
    }

    removeOldImage(expenseToDelete);

    user.expenses = user.expenses.filter(
      (expense) => expense._id.toString() !== expenseId
    );

    await user.save();

    res.json({
      msg: "Despesa deletada com sucesso!",
      deleted: expenseToDelete,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar despesa" });
  }
};

const toogleExpense = async (req, res) => {
  try {
    const userId = req.params.userId;

    const expenseId = req.params.expenseId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const paid = req.body.paid;

    const expense = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    if (!expense) {
      return res.status(404).json({ msg: "Despesa não encontrada" });
    }

    expense.paid = paid;

    await user.save();

    res.json({ msg: "Despesa paga com sucesso!", expense });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar despesa" });
  }
};

module.exports = {
  createAdm,
  getAll,
  getOne,
  createExpenses,
  getExpenses,
  getExpense,
  updateExpenses,
  deleteExpense,
  toogleExpense,
};
