/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";
import ExpenseList from "../Components/ExpenseList";

export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);

  const addExpense = (expense: any) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index: number) => {
    const updated=expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  return (
    <div className="container mt-4">
      <Header />
      <SummaryCards />
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}