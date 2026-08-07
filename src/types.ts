export interface LoanParams {
  loanAmount: number;       // total loan in €
  firstPaymentMonth: number; // 1–12
  firstPaymentYear: number;
  monthlyPayment: number;   // € per month
  yearlyInterestRate: number; // e.g. 3 for 3%
}

export interface AmortizationEntry {
  month: number;
  year: number;
  startingBalance: number;
  interest: number;
  principal: number;
  payment: number;
  endingBalance: number;
}

export interface AnnualSummary {
  year: number;
  totalInterest: number;
  totalPrincipal: number;
  totalPayment: number;
  endingBalance: number;
}
