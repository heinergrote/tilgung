import type { LoanParams } from '../types';

const STORAGE_KEY = 'tilgung-params';

export function saveParams(params: LoanParams): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // Ignore write errors (e.g. private browsing quota)
  }
}

export function loadParams(defaults: LoanParams): LoanParams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw) as Partial<LoanParams>;

    // Validate all required numeric fields are present and finite
    const fields: (keyof LoanParams)[] = [
      'loanAmount',
      'firstPaymentMonth',
      'firstPaymentYear',
      'monthlyPayment',
      'yearlyInterestRate',
    ];

    for (const field of fields) {
      if (typeof parsed[field] !== 'number' || !isFinite(parsed[field] as number)) {
        return defaults;
      }
    }

    return parsed as LoanParams;
  } catch {
    return defaults;
  }
}
