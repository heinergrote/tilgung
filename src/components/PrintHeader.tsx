import { Component } from 'solid-js';
import type { LoanParams } from '../types';
import { formatEuro, formatMonthYear } from '../utils/amortization';

interface Props {
  params: LoanParams;
}

const PrintHeader: Component<Props> = (props) => {
  const p = () => props.params;

  return (
    <div class="hidden print:block mb-6">
      <div class="flex items-baseline justify-between border-b-2 border-slate-800 pb-2 mb-4">
        <h1 class="text-xl font-bold text-slate-900">Tilgungsrechner – Privatdarlehen</h1>
        <span class="text-xs text-slate-500">{new Date().toLocaleDateString('de-DE')}</span>
      </div>
      <dl class="flex flex-wrap gap-x-8 gap-y-1 text-sm text-slate-700">
        <div class="flex gap-2">
          <dt class="font-medium text-slate-500">Darlehensbetrag</dt>
          <dd class="font-semibold">{formatEuro(p().loanAmount)}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-slate-500">Monatliche Rate</dt>
          <dd class="font-semibold">{formatEuro(p().monthlyPayment)}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-slate-500">Jahreszins</dt>
          <dd class="font-semibold">{p().yearlyInterestRate.toLocaleString('de-DE')} %</dd>
        </div>
        <div class="flex gap-2">
          <dt class="font-medium text-slate-500">Erste Rate</dt>
          <dd class="font-semibold">{formatMonthYear(p().firstPaymentMonth, p().firstPaymentYear)}</dd>
        </div>
      </dl>
    </div>
  );
};

export default PrintHeader;
