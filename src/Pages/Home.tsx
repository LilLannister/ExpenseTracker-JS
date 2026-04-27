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
  const [selectedCategory, setSelectedCategory] = useState("all"); const [searchText, setSearchText] = useState("");

  const filteredExpenses = expenses.filter((expenses)=> {
    const matchesCategory =
      selectedCategory === "all" || expenses.category === selectedCategory;
      
      const matchesSearch = expenses.title
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
      
    return matchesCategory && matchesSearch;
  })
    
  const addExpense = (expense: any) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index: number) => {
    const updated=expenses.filter((_, i) => i !== index);
    setExpenses(updated);
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
};

  const startEditExpense = (index: number) => {
    setEditingIndex(index);
  };
  
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
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={deleteExpense}
        onEdit={startEditExpense}
      />
    </div>
  );
}