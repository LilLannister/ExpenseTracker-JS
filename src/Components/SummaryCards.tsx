import { formatCurrency } from "../utils/formatCurrency";

type expense = {
    title: string;
    amount: string;
    category: string;
    date: string;
};

type Props = {
    expenses: expense[];
};

export default function SummaryCards({expenses}: Props) {
    const totalAmount = expenses.reduce(
        (sum ,e) => sum + Number(e.amount),
        0
    );

    const totalCount = expenses.length;

    const currentMonth = new Date().getMonth();
    const thisMonthTotal = expenses
        .filter((e) => new Date(e.date).getMonth() === currentMonth)
        .reduce((sum, e) => sum + Number(e.amount), 0);
    
    return (
        <div className="d-flex gap-3 mb-4">
            <div className="card p-3 w-100 text-center">
                <h4>{formatCurrency(totalAmount)}</h4>
                <p>Toplam Harcama</p>
            </div>

            <div className="card p-3 w-100 text-center">
                <h4>{totalCount}</h4>
                <p>Toplam Kayıt</p>
            </div>

            <div className="card p-3 w-100 text-center">
                <h4>{formatCurrency(thisMonthTotal)}</h4>
                <p>Bu Ay</p>
            </div>
        </div>
    );
}