type Expense = {
    id: string;
    title: string;
    amount: string;
    category: string;
    date: string;
};

type Props = {
    expenses: Expense[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
};

export default function ExpenseFilter({ expenses, selectedCategory, onCategoryChange }: Props) {
    const categories = Array.from(
        new Set(expenses.map((expenses) => expenses.category))
    );

    return (
        <div className="card p-3 mb-4 shadow-sm">
            <label className="form-label fw-semibold">
                Kategoriye Göre Filtrele
            </label>
            <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                    <option value={category} key={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    )
}