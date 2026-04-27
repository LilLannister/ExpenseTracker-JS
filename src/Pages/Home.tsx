/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";
import ExpenseList from "../Components/ExpenseList";

type Expense = {
  title: string;
  amount: string;
  category: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  return (
    <div className="container mt-4">
      <Header />
      <SummaryCards expenses={expenses}/>
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingIndex !== null ? expenses[editingIndex] : null}
      />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={startEditExpense}
      />
    </div>
  );
}