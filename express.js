import express from 'express';
import { readFile, writeFile } from './utils/utils.js';

import useExpensesRouter from './expenses/expenses.router.js';
import randomRouter from './random/random.router.js';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use('/expenses-list', useExpensesRouter);
app.use('/random', randomRouter);

app.get('/create-expense', (req, res) => {
  res.render('pages/createExpnese.ejs');
});

app.get('/expense-update/:id', async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile('expenses.json', true);
  const expense = expenses.find((el) => el.id === id);
  res.render('pages/updateExpense.ejs', { expense });
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
