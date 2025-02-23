const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  //   console.log('clicked');

  const newExpense = {
    title: form.title.value,
    category: form.category.value,
    amount: form.amount.value,
  };

  const res = await fetch('http://localhost:3000/expenses-list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(newExpense),
  });

  if (res.status === 200) {
    form.category.value = '';
    form.amount.value = '';
    form.title.value = '';
    setTimeout(() => {
      location.href = `/expenses-list`;
    }, 1000);
  }
});
