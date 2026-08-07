import { Component, For } from 'solid-js';
import type { LoanParams } from '../types';

interface Props {
  params: LoanParams;
  onChange: (updated: Partial<LoanParams>) => void;
  onReset: () => void;
}

const MONTHS = [
  { value: 1, label: 'Januar' },
  { value: 2, label: 'Februar' },
  { value: 3, label: 'März' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mai' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Dezember' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear + i);

const LoanForm: Component<Props> = (props) => {
  return (
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold text-slate-800">Darlehensparameter</h2>
        <button
          onClick={props.onReset}
          class="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.5 transition-colors"
          title="Standardwerte wiederherstellen"
        >
          Zurücksetzen
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Loan amount */}
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-600">Darlehensbetrag</label>
          <div class="relative">
            <input
              type="number"
              min="1"
              step="100"
              value={props.params.loanAmount}
              onInput={(e) => onChange(e, 'loanAmount')}
              class={inputClass}
            />
            <span class={suffixClass}>€</span>
          </div>
        </div>

        {/* Monthly payment */}
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-600">Monatliche Rate</label>
          <div class="relative">
            <input
              type="number"
              min="1"
              step="10"
              value={props.params.monthlyPayment}
              onInput={(e) => onChange(e, 'monthlyPayment')}
              class={inputClass}
            />
            <span class={suffixClass}>€</span>
          </div>
        </div>

        {/* Yearly interest rate */}
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-600">Jahreszins</label>
          <div class="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={props.params.yearlyInterestRate}
              onInput={(e) => onChange(e, 'yearlyInterestRate')}
              class={inputClass}
            />
            <span class={suffixClass}>%</span>
          </div>
        </div>

        {/* First payment month/year */}
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-600">Erste Rate</label>
          <div class="flex gap-2">
            <select
              value={props.params.firstPaymentMonth}
              onChange={(e) => props.onChange({ firstPaymentMonth: parseInt(e.currentTarget.value) })}
              class={selectClass}
            >
              <For each={MONTHS}>
                {(m) => <option value={m.value}>{m.label}</option>}
              </For>
            </select>
            <select
              value={props.params.firstPaymentYear}
              onChange={(e) => props.onChange({ firstPaymentYear: parseInt(e.currentTarget.value) })}
              class={`${selectClass} w-24`}
            >
              <For each={YEARS}>
                {(y) => <option value={y}>{y}</option>}
              </For>
            </select>
          </div>
        </div>

      </div>
    </div>
  );

  function onChange(e: InputEvent & { currentTarget: HTMLInputElement }, field: keyof LoanParams) {
    const value = parseFloat((e.currentTarget as HTMLInputElement).value);
    if (!isNaN(value) && value > 0) {
      props.onChange({ [field]: value });
    }
  }
};

const inputClass =
  'w-full pr-8 pl-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ' +
  'bg-slate-50 hover:bg-white transition-colors';

const suffixClass =
  'absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none';

const selectClass =
  'flex-1 px-2 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ' +
  'bg-slate-50 hover:bg-white transition-colors';

export default LoanForm;
