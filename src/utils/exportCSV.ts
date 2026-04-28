export function exportToCSV(expenses: any[]){
    const headers = ['Title', 'Amount', 'Category','Date'];
    const rows = expenses.map((e) => [
        e.title,
        e.amount,
        e.category,
        e.date 
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}