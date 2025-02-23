const form = document.querySelector('form');

const id = location.pathname.split('/')[2];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newExpense = {
    title: form.title.value,
    category: form.category.value,
    amount: form.amount.value,
  };

  const res = await fetch(`http://localhost:3000/expenses-list/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newExpense),
  });

  if (res.status === 200) {
    form.category.value = '';
    form.amount.value = '';
    form.title.value = '';
    setTimeout(() => {
      location.href = `/expenses-list/${id}`;
    }, 1000);
  }
});
