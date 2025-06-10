document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expensesTableBody = document.querySelector('#expensesTable tbody');
  const pieChartCanvas = document.getElementById('pieChart');
  const toggleFormBtn = document.getElementById('toggleForm');
  const toggleChartBtn = document.getElementById('toggleChart');
  const downloadBtn = document.getElementById('downloadExcel');
  let pieChart;

  async function loadExpenses() {
    const res = await fetch('https://expense-tracker-backend-1-ejz2.onrender.com/api/expenses');
    const data = await res.json();
    renderExpenses(data);
    renderChart(data);
  }

  function renderExpenses(expenses) {
    expensesTableBody.innerHTML = '';
    expenses.forEach(expense => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.date}</td>
        <td>₹${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.notes}</td>
      `;
      expensesTableBody.appendChild(row);
    });
  }

  function renderChart(expenses) {
    const categoryMap = {};
    expenses.forEach(exp => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + parseFloat(exp.amount);
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#ffd43b', '#51cf66', '#ff6b6b', '#4c6ef5', '#a29bfe']
        }]
      }
    });
  }

  expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    await fetch('https://expense-tracker-backend-1-ejz2.onrender.com/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, category, date, notes })
    });

    expenseForm.reset();
    loadExpenses();
  });

  toggleFormBtn.addEventListener('click', () => {
    document.querySelector('.expense-form').classList.toggle('hidden');
  });

  toggleChartBtn.addEventListener('click', () => {
    document.querySelector('.expense-chart').classList.toggle('hidden');
  });

  downloadBtn.addEventListener('click', () => {
    const table = document.getElementById('expensesTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Expenses' });
    XLSX.writeFile(wb, 'expenses.xlsx');
  });

  loadExpenses();
});
