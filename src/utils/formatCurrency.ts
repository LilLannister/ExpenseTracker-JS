export function formatCurrency(amount: string | number){
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
    }).format(Number(amount));
}