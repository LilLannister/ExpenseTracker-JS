import { useState } from "react";
import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);

  const addExpense = (expense: any) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="container mt-4">
      <Header />
      <SummaryCards />
      <ExpenseForm onAdd={addExpense} />
      
      <p>Toplam harcama kaydı: {expenses.length}</p>
    </div>
  );
}