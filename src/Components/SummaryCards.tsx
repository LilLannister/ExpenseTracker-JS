import { formatCurrency } from "../utils/formatCurrency";

type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  expenses: Expense[];
};

export default function SummaryCards({ expenses }: Props) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalCount = expenses.length;

  const currentMonth = new Date().getMonth();

  const thisMonthTotal = expenses
    .filter((expense) => new Date(expense.date).getMonth() === currentMonth)
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="summary-grid mb-4">
      <div className="summary-card text-center">
        <h4>{formatCurrency(totalAmount)}</h4>
        <p>Toplam Harcama</p>
      </div>

      <div className="summary-card text-center">
        <h4>{totalCount}</h4>
        <p>Toplam Kayıt</p>
      </div>

      <div className="summary-card text-center">
        <h4>{formatCurrency(thisMonthTotal)}</h4>
        <p>Bu Ay</p>
      </div>
    </div>
  );
}