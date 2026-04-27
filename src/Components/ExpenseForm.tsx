import { useEffect, useState } from "react";

type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  onAdd: (expense: Expense) => void;
  onUpdate: (expense: Expense) => void;
  onCancel?: () => void;
  editingExpense: Expense | null;
};

export default function ExpenseForm({ onAdd, onUpdate, onCancel, editingExpense }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(editingExpense.title);
        setAmount(editingExpense.amount);
        setCategory(editingExpense.category);
        setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleCancel = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setError("");

    if (onCancel) {
      onCancel();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedAmount = amount.replace(",", ".");
    const numericAmount = Number(normalizedAmount);

    // validation
    if (!title || !amount || !category || !date) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (isNaN(numericAmount)) {
      setError("Tutar geçerli bir sayı olmalıdır.");
      return;
    }

    if(numericAmount <= 0) {
      setError("Tutar sıfırdan büyük olmalıdır.");
      return;
    } 

    const newExpense = {
      id: editingExpense ? editingExpense.id : crypto.randomUUID(),
      title,
      amount: normalizedAmount,
      category,
      date,
    };

    if (editingExpense) {
      onUpdate(newExpense);
    } else {
      onAdd(newExpense);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="mb-3">
        {editingExpense ? "✏️ Harcama Güncelle" : "➕ Yeni Harcama Ekle"}
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Harcama Adı"
          value={title}
          onChange={(e) => {setTitle(e.target.value); setError("");}}
        />

        <input
          className="form-control mb-2"
          placeholder="Tutar"
          value={amount}
          inputMode="decimal"
          onChange={(e) => {{setAmount(e.target.value); setError("");}}}
        />

        <input
          className="form-control mb-2"
          placeholder="Kategori"
          value={category}
          onChange={(e) => {{setCategory(e.target.value); setError("");}}}
        />

        <input
          className="form-control mb-3"
          type="date"
          value={date}
          onChange={(e) => {{setDate(e.target.value); setError("");}}}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-primary w-100">
            {editingExpense ? "Güncelle" : "Ekle"}
          </button>
          {editingExpense && (
            <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={handleCancel}
            >
            İptal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}