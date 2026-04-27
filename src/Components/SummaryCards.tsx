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

    const TotalCount = expenses.length;

    const currentMonth = new Date().getMonth();
    const thisMonth = expenses.filter(
        (e) => new Date(e.date).getMonth() === currentMonth
    ).length;
    
    return (
        <div className="d-flex gap-3 mb-4">
            <div className="card p-3 w-100 text-center">
                <h4>{totalAmount} ₺</h4>
                <p>Toplam Harcama</p>
            </div>

            <div className="card p-3 w-100 text-center">
                <h4>{TotalCount}</h4>
                <p>Toplam Kayıt</p>
            </div>

            <div className="card p-3 w-100 text-center">
                <h4>{thisMonth}</h4>
                <p>Bu Ay</p>
            </div>
        </div>
    );
}