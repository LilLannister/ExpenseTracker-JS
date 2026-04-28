import { useEffect, useState } from "react";
import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";
import ExpenseList from "../Components/ExpenseList";
import ExpenseFilter from "../Components/ExpenseFilter";
import { exportToCSV } from "../utils/exportCSV";

type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");

    if (storedExpenses) {
      return JSON.parse(storedExpenses);
    }

    return [];
  });

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
    }
  );

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesCategory =
        selectedCategory === "all" || expense.category === selectedCategory;

      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortOption === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (sortOption === "amountHigh") {
        return Number(b.amount) - Number(a.amount);
      }

      if (sortOption === "amountLow") {
        return Number(a.amount) - Number(b.amount);
      }

      return 0;
    });

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    showMessage("Harcama başarıyla eklendi!");
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    showMessage("Harcama başarıyla silindi!");
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );

    setEditingExpense(null);
    showMessage("Harcama başarıyla güncellendi!");
  };

  const startEditExpense = (id: string) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);

    if (!expenseToEdit) return;

    setEditingExpense(expenseToEdit);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark-mode min-vh-100" : "app min-vh-100"}>
      <div className="container py-4">
        <Header />

        <div className="text-end mb-3">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <SummaryCards expenses={expenses} />

        <ExpenseForm
          onAdd={addExpense}
          onUpdate={updateExpense}
          onCancel={cancelEdit}
          editingExpense={editingExpense}
        />

        <ExpenseFilter
          expenses={expenses}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="card p-3 mb-4 shadow-sm">
          <label className="form-label fw-semibold">Harcama Ara</label>
          <input
            className="form-control"
            placeholder="Harcama adını yazın..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="text-end mb-3">
            <button
              className="btn btn-success btn-sm"
              onClick={() => exportToCSV(expenses)}
              >
                ⬇️ CSV İndir
              </button>
        </div>

        <div className="card p-3 mb-4 shadow-sm">
          <label className="form-label fw-semibold">Sırala</label>
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="amountHigh">Tutar (Yüksekten Düşüğe)</option>
            <option value="amountLow">Tutar (Düşükten Yükseğe)</option>
          </select>
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={startEditExpense}
        />

        {message && (
          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 9999 }}
          >
            <div className="toast show bg-dark text-white">
              <div className="toast-body">{message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}