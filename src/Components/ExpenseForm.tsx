import { useState } from "react";

type Props = {
    onAdd: (expense: any) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
        title,
        amount,
        category,
        date,
    };

    onAdd(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="mb-3">➕ Yeni Harcama Ekle</h5>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Harcama Adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Tutar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn btn-primary w-100">Ekle</button>
      </form>
    </div>
  );
}