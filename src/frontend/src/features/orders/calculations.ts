export function calculateRemainingAmount(totalAmount: number, paidAmount: number): number {
  const remaining = totalAmount - paidAmount;
  return Math.max(0, remaining); // Clamp at 0
}

export function validateAmounts(totalAmount: number, paidAmount: number): string | null {
  if (totalAmount < 0) return 'Total amount cannot be negative';
  if (paidAmount < 0) return 'Paid amount cannot be negative';
  if (paidAmount > totalAmount) return 'Paid amount cannot exceed total amount';
  return null;
}
