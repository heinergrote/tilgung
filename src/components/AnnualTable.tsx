import { Component, For } from 'solid-js';
import type { AnnualSummary } from '../types';
import { formatEuro } from '../utils/amortization';

interface Props {
  summaries: AnnualSummary[];
}

const AnnualTable: Component<Props> = (props) => {
  return (
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800">Jahresübersicht</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th class={`${thClass} text-left`}>Jahr</th>
              <th class={`${thClass} text-right`}>Rate (gesamt)</th>
              <th class={`${thClass} text-right`}>Zinsen</th>
              <th class={`${thClass} text-right`}>Tilgung</th>
              <th class={`${thClass} text-right`}>Restschuld</th>
            </tr>
          </thead>
          <tbody>
            <For each={props.summaries}>
              {(row, i) => (
                <tr class={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${i() % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                  <td class={`${tdClass} font-semibold text-slate-700`}>{row.year}</td>
                  <td class={`${tdClass} text-right text-slate-700`}>{formatEuro(row.totalPayment)}</td>
                  <td class={`${tdClass} text-right text-amber-600`}>{formatEuro(row.totalInterest)}</td>
                  <td class={`${tdClass} text-right text-green-600`}>{formatEuro(row.totalPrincipal)}</td>
                  <td class={`${tdClass} text-right font-medium text-slate-800`}>{formatEuro(row.endingBalance)}</td>
                </tr>
              )}
            </For>
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-slate-200 bg-slate-50 font-semibold text-slate-700 text-xs">
              <td class={tdClass}>Gesamt</td>
              <td class={`${tdClass} text-right`}>
                {formatEuro(props.summaries.reduce((s, r) => s + r.totalPayment, 0))}
              </td>
              <td class={`${tdClass} text-right text-amber-600`}>
                {formatEuro(props.summaries.reduce((s, r) => s + r.totalInterest, 0))}
              </td>
              <td class={`${tdClass} text-right text-green-600`}>
                {formatEuro(props.summaries.reduce((s, r) => s + r.totalPrincipal, 0))}
              </td>
              <td class={`${tdClass} text-right`}>–</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const thClass = 'px-4 py-3 font-semibold';
const tdClass = 'px-4 py-2.5 text-slate-600';

export default AnnualTable;
