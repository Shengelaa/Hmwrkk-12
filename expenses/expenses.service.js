import { readFile, writeFile } from '../utils/utils.js';

const getProduct = async (req, res) => {
  const expenses = await readFile('expenses.json', true);

  if (req.query.page || req.query.take) {
    const page = req.query.page || 1;
    const take = Math.min(req.query.take, 10);
    const result = expenses.splice((page - 1) * take, take);
    return res
      .status(200)
      .json({ message: 'request created succesfully', data: result });
  }

  res.render('pages/expenses.ejs', { expenses });
};

const getUserById = async (req, res) => {
  const expenses = await readFile('expenses.json', true);

  const id = Number(req.params.id);
  const expense = expenses.find((el) => el.id === id);

  if (!expense)
    return res.status(400).json({ message: 'expense not found whth this id' });
  res.render('pages/expenseDetails.ejs', { expense });
};

const createUser = async (req, res) => {
  const expenses = await readFile('expenses.json', true);
  console.log(req.body);

  function formatDate() {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const lastIndex = expenses[expenses.length - 1]?.id || 0;

  const { title, amount, category } = req.body;

  const newExpense = {
    id: lastIndex + 1,
    title,
    amount,
    category,
    date: formatDate(),
  };

  expenses.push(newExpense);
  await writeFile('expenses.json', expenses, true);
  res.status(200).json({ newExpense });
};

const deleteExpenses = async (req, res) => {
  const expenses = await readFile('expenses.json', true);
  const id = Number(req.params.id);
  const expenseIndex = expenses.findIndex((element) => element.id === id);

  const deletedExpense = expenses.splice(expenseIndex, 1);
  await writeFile('expenses.json', expenses, true);
  res
    .status(200)
    .json({ message: 'delated successfully', data: deletedExpense });
};

const updateExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const { title, amount, category } = req.body;
  const expenses = await readFile('expenses.json', true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'expenses not found' });
  }
  if (category) expenses[index].category = category;
  if (title) expenses[index].title = title;
  if (amount) expenses[index].amount = amount;
  await writeFile('expenses.json', expenses, true);
  res.json(expenses[index]);
};

export {
  getProduct,
  getUserById,
  createUser,
  deleteExpenses,
  updateExpenseById,
};
