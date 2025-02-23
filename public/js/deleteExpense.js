async function deleteExpense(id) {
  const res = await fetch(`http://localhost:3000/expenses-list/${id}`, {
    method: 'DELETE',
  });

  if (res.status === 200) {
    location.reload();
  }
}
