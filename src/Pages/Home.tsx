/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";
import ExpenseList from "../Components/ExpenseList";
import ExpenseFilter from "../Components/ExpenseFilter";

type Expense = {
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
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [searchText, setSearchText] = useState(""); 
  const [sortOption, setSortOption] = useState("newest");
  const [message, setMessage] = useState("");

  const filteredExpenses = expenses.filter((expenses)=> {
    const matchesCategory =
      selectedCategory === "all" || expenses.category === selectedCategory;
      
      const matchesSearch = expenses.title
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
      
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
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
    if(sortOption === "amountHigh") {
      return Number(b.amount) - Number(a.amount);
    }
    if(sortOption === "amountLow") {
      return Number(a.amount) - Number(b.amount);
    } 
    return 0;
  });
    
  const addExpense = (expense: any) => {
    setExpenses([...expenses, expense]);
    setMessage("Harcama başarıyla eklendi!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const deleteExpense = (index: number) => {
    const updated=expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    setMessage("Harcama başarıyla silindi!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateExpense = (updatedExpense: Expense) => {
  if (editingIndex === null) {
    return;
  }

  const updatedExpenses = expenses.map((expense, index) =>
    index === editingIndex ? updatedExpense : expense
  );

  setExpenses(updatedExpenses);
  setEditingIndex(null);
  setMessage("Harcama başarıyla güncellendi!");

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

  const startEditExpense = (index: number) => {
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  }
  
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="container mt-4">
      <Header />
      <SummaryCards expenses={expenses}/>
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        onCancel={cancelEdit}
        editingExpense={editingIndex !== null ? expenses[editingIndex] : null}
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
          style={{zIndex: 9999}}
        > 
          <div className="toast show bg-dark text-white">
            <div className="toast-body">{message}</div>
          </div>
        </div>
    )}
    </div>
  );
}