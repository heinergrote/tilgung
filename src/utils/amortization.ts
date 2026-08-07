import type { AmortizationEntry, AnnualSummary, LoanParams } from '../types';

export function calculateSchedule(params: LoanParams): AmortizationEntry[] {
  const { loanAmount, firstPaymentMonth, firstPaymentYear, monthlyPayment, yearlyInterestRate } = params;
  const monthlyRate = yearlyInterestRate / 100 / 12;
  const entries: AmortizationEntry[] = [];

  let balance = loanAmount;
  let month = firstPaymentMonth;
  let year = firstPaymentYear;

  while (balance > 0.005) {
    const interest = balance * monthlyRate;
    const maxPrincipal = balance;
    const rawPrincipal = monthlyPayment - interest;

    if (rawPrincipal <= 0) {
      // Payment doesn't cover interest — break to avoid infinite loop
      break;
    }

    const principal = Math.min(rawPrincipal, maxPrincipal);
    const payment = interest + principal;
    const endingBalance = Math.max(0, balance - principal);

    entries.push({
      month,
      year,
      startingBalance: balance,
      interest,
      principal,
      payment,
      endingBalance,
    });

    balance = endingBalance;

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return entries;
}

export function calculateAnnualSummaries(schedule: AmortizationEntry[]): AnnualSummary[] {
  const byYear = new Map<number, AnnualSummary>();

  for (const entry of schedule) {
    const existing = byYear.get(entry.year);
    if (existing) {
      existing.totalInterest += entry.interest;
      existing.totalPrincipal += entry.principal;
      existing.totalPayment += entry.payment;
      existing.endingBalance = entry.endingBalance;
    } else {
      byYear.set(entry.year, {
        year: entry.year,
        totalInterest: entry.interest,
        totalPrincipal: entry.principal,
        totalPayment: entry.payment,
        endingBalance: entry.endingBalance,
      });
    }
  }

  return Array.from(byYear.values());
}

export function formatEuro(value: number): string {
  return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

export function formatMonthYear(month: number, year: number): string {
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
}

const MONTH_NAMES_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function monthName(month: number): string {
  return MONTH_NAMES_DE[month - 1] ?? '';
}
