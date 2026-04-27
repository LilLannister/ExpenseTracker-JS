import { useEffect, useState } from "react";

type Expense = {
  title: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  onAdd: (expense: Expense) => void;
  onUpdate: (expense: Expense) => void;
  editingExpense: Expense | null;
};

export default function ExpenseForm({ onAdd, onUpdate, editingExpense }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!title || !amount || !category || !date) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (isNaN(Number(amount))) {
      setError("Tutar geçerli bir sayı olmalıdır.");
      return;
    }

    if(Number(amount) <= 0) {
      setError("Tutar sıfırdan büyük olmalıdır.");
      return;
    } 

    const newExpense = {
      title,
      amount,
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

        <button className="btn btn-primary w-100">
          {editingExpense ? "Güncelle" : "Ekle"}
        </button>
      </form>
    </div>
  );
}