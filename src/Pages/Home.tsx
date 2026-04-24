import Header from "../Components/Header";
import SummaryCards from "../Components/SummaryCards";
import ExpenseForm from "../Components/ExpenseForm";

export default function Home() {
  return (
    <div className="container mt-4">
        <Header />
        <SummaryCards />
        <ExpenseForm />
    </div>
  );
}
