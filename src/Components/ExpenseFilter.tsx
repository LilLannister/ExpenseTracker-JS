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
        <select
        className="form-select"
        value={selectedCategory}
        onChange={(e)=>onCategoryChange(e.target.value)}
        >
            <option value="all">Tüm Kategoriler</option>
            
            {categories.map((category) =>  (
                <option value={category} key={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}