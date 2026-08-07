import { Component, createMemo, createSignal } from 'solid-js';
import type { LoanParams } from './types';
import { calculateAnnualSummaries, calculateSchedule } from './utils/amortization';
import LoanForm from './components/LoanForm';
import LoanOverview from './components/LoanOverview';
import AnnualTable from './components/AnnualTable';
import MonthlyTable from './components/MonthlyTable';

const nextMonth = (() => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return { month: d.getMonth() + 1, year: d.getFullYear() };
})();

const DEFAULT_PARAMS: LoanParams = {
  loanAmount: 20_000,
  firstPaymentMonth: nextMonth.month,
  firstPaymentYear: nextMonth.year,
  monthlyPayment: 200,
  yearlyInterestRate: 3,
};

const App: Component = () => {
  const [params, setParams] = createSignal<LoanParams>(DEFAULT_PARAMS);

  const schedule = createMemo(() => calculateSchedule(params()));
  const annualSummaries = createMemo(() => calculateAnnualSummaries(schedule()));

  const handleChange = (updated: Partial<LoanParams>) => {
    setParams((prev) => ({ ...prev, ...updated }));
  };

  const insufficientPayment = () => {
    const { loanAmount, monthlyPayment, yearlyInterestRate } = params();
    const monthlyInterest = loanAmount * (yearlyInterestRate / 100 / 12);
    return monthlyPayment <= monthlyInterest;
  };

  return (
    <div class="min-h-screen bg-slate-100">
      {/* Header */}
      <header class="bg-white border-b border-slate-200 shadow-sm">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-900">Tilgungsrechner</h1>
            <p class="text-xs text-slate-500">Privatdarlehen</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        <LoanForm params={params()} onChange={handleChange} />

        {insufficientPayment() ? (
          <div class="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 text-red-700 text-sm font-medium">
            ⚠️ Die monatliche Rate reicht nicht aus, um die anfallenden Zinsen zu decken. Bitte erhöhen Sie die Rate.
          </div>
        ) : schedule().length === 0 ? (
          <div class="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-amber-700 text-sm">
            Keine Daten verfügbar.
          </div>
        ) : (
          <>
            <LoanOverview schedule={schedule()} />
            <AnnualTable summaries={annualSummaries()} />
            <MonthlyTable schedule={schedule()} />
          </>
        )}
      </main>

    </div>
  );
};

export default App;
