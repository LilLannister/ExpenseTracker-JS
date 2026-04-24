type Expense = {
    title: string;
    amount: string;
    category: string;
    date: string;
};

type Props = {
    expenses: Expense[];
    onDelete: (index: number) => void;
};

export default function ExpenseList({ expenses, onDelete }: Props) {
    return (
        <div className="mb-4">
            <h5 className="mb-3">📋 Harcama Listesi</h5>

            {expenses.length === 0 ? (
                <div className="alert alert-info">Henüz harcama kaydı eklenmedi.</div>
            ) : (
                expenses.map((expense, index) => (
                    <div className="card p-3 mb-2 shadow-sm" key={index}>
                        <h6 className="mb-1">{expense.title}</h6>
                        <p className="mb-1">Tutar: {expense.amount} ₺</p>
                        <p className="mb-1">Kategori: {expense.category}</p>
                        <p className="mb-0 text-muted">Tarih: {expense.date}</p>

                        <button className="btn btn-sm btn-danger mt-2" onClick={() => onDelete(index)}>
                            Sil
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
