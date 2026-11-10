const STORAGE_KEY = "spendwise-transactions-v1";
const budgets = [
  { category: "Food", limit: 8000 },
  { category: "Transport", limit: 5000 },
  { category: "Rent", limit: 15000 },
  { category: "Entertainment", limit: 3000 },
  { category: "Utilities", limit: 4000 },
  { category: "Savings", limit: 5000 }
];

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency", currency: "KES", minimumFractionDigits: 2
  }).format(value);
}

function renderSummary() {
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  document.getElementById("balance").textContent = formatMoney(income - expenses);
  document.getElementById("income").textContent = formatMoney(income);
  document.getElementById("expenses").textContent = formatMoney(expenses);
}

function renderTransactions() {
  const list = document.getElementById("transactionList");
  if (transactions.length === 0) {
    list.innerHTML = '<div class="empty-state">No transactions yet. Add your first income or expense.</div>';
    return;
  }

  list.innerHTML = [...transactions].reverse().map(t => `
    <div class="transaction">
      <div>
        <div class="transaction-name">${escapeHTML(t.description)}</div>
        <div class="transaction-meta">${escapeHTML(t.category)} · ${escapeHTML(t.date)}</div>
      </div>
      <div class="transaction-amount ${t.type === "income" ? "positive" : "negative"}">
        ${t.type === "income" ? "+" : "−"}${formatMoney(t.amount)}
      </div>
    </div>
  `).join("");
}

function renderBudgets() {
  const container = document.getElementById("budgetList");
  container.innerHTML = budgets.map(budget => {
    const spent = transactions
      .filter(t => t.type === "expense" && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    const percent = Math.min((spent / budget.limit) * 100, 100);
    return `
      <div class="budget-item">
        <div class="budget-label"><span>${budget.category}</span><span>${formatMoney(spent)} / ${formatMoney(budget.limit)}</span></div>
        <div class="progress-track" role="progressbar" aria-label="${budget.category} budget used" aria-valuenow="${Math.round(percent)}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
      </div>`;
  }).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

document.getElementById("transactionForm").addEventListener("submit", event => {
  event.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a description and an amount greater than zero.");
    return;
  }

  transactions.push({
    id: Date.now(),
    description,
    amount,
    type,
    category,
    date: new Date().toLocaleDateString("en-KE")
  });
  saveTransactions();
  renderAll();
  event.target.reset();
  document.getElementById("description").focus();
});

document.getElementById("clearButton").addEventListener("click", () => {
  if (transactions.length && confirm("Delete all saved transactions from this browser?")) {
    transactions = [];
    saveTransactions();
    renderAll();
  }
});

function renderAll() {
  renderSummary();
  renderTransactions();
  renderBudgets();
}

document.getElementById("todayDate").textContent = new Date().toLocaleDateString("en-KE", {
  weekday: "short", day: "numeric", month: "short", year: "numeric"
});
document.getElementById("year").textContent = new Date().getFullYear();
renderAll();
