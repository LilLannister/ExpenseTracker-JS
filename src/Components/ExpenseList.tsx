type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function ExpenseList({ expenses, onDelete, onEdit }: Props) {
  return (
    <div className="mb-4">
      <h5 className="mb-3">📋 Harcama Listesi</h5>

      {expenses.length === 0 ? (
        <div className="text-center py-5">
          <div style={{fontSize: "48px"}}>📭</div>
          <h5 className="mt-3">Henüz Harcama Yok</h5>
          <p className="text-muted">
            Yeni bir harcama ekleyerek başlayabilirsiniz.
          </p>
          <button className="btn btn-primary mt-2">
            İlk harcamanı ekle
          </button>
        </div>
      ) : (
        expenses.map((expense) => (
          <div className="card p-3 mb-2 shadow-sm" key={expense.id}>
            <h6 className="mb-1">{expense.title}</h6>
            <p className="mb-1">Tutar: {expense.amount} ₺</p>
            <p className="mb-1">Kategori: {expense.category}</p>
            <p className="mb-0 text-muted">Tarih: {expense.date}</p>

            <div className="mt-2 d-flex gap-3">
              <button
                className="btn btn-sm btn-danger w-100"
                onClick={() => onDelete(expense.id)}
              >
                Sil
              </button>

              <button
                className="btn btn-sm btn-secondary w-100"
                onClick={() => onEdit(expense.id)}
              >
                Düzenle
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}