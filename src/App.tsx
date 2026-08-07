import { Component, createMemo, createSignal } from 'solid-js';
import type { LoanParams } from './types';
import { calculateAnnualSummaries, calculateSchedule } from './utils/amortization';
import { loadParams, saveParams } from './utils/storage';
import LoanForm from './components/LoanForm';
import LoanOverview from './components/LoanOverview';
import AnnualTable from './components/AnnualTable';
import MonthlyTable from './components/MonthlyTable';
import PrintHeader from './components/PrintHeader';
import sharkyUrl from './assets/sharky.png';

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
  const [params, setParams] = createSignal<LoanParams>(loadParams(DEFAULT_PARAMS));

  const schedule = createMemo(() => calculateSchedule(params()));
  const annualSummaries = createMemo(() => calculateAnnualSummaries(schedule()));

  const handleChange = (updated: Partial<LoanParams>) => {
    setParams((prev) => {
      const next = { ...prev, ...updated };
      saveParams(next);
      return next;
    });
  };

  const handleReset = () => {
    saveParams(DEFAULT_PARAMS);
    setParams(DEFAULT_PARAMS);
  };

  const insufficientPayment = () => {
    const { loanAmount, monthlyPayment, yearlyInterestRate } = params();
    const monthlyInterest = loanAmount * (yearlyInterestRate / 100 / 12);
    return monthlyPayment <= monthlyInterest;
  };

  return (
    <div class="min-h-screen bg-slate-100">
      {/* Header */}
      <header class="bg-white border-b border-slate-200 shadow-sm print:hidden">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-center">
          <img src={sharkyUrl} alt="Tilgungsrechner" class="h-32 w-auto object-contain" />
        </div>
      </header>

      {/* Main content */}
      <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 print:p-0 print:max-w-none flex flex-col gap-6">

        <PrintHeader params={params()} />

        <div class="print:hidden">
          <LoanForm params={params()} onChange={handleChange} onReset={handleReset} />
        </div>

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
            <div class="print:break-before-page">
              <MonthlyTable schedule={schedule()} />
            </div>
          </>
        )}
      </main>

    </div>
  );
};

export default App;
