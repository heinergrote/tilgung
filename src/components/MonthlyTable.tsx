import { Component, createSignal, For } from 'solid-js';
import type { AmortizationEntry } from '../types';
import { formatEuro, monthName } from '../utils/amortization';

interface Props {
  schedule: AmortizationEntry[];
}

const MonthlyTable: Component<Props> = (props) => {
  const [expanded, setExpanded] = createSignal(false);

  const displayed = () => expanded() ? props.schedule : props.schedule.slice(0, 24);
  const hasMore = () => props.schedule.length > 24;

  return (
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-800">Monatliche Aufschlüsselung</h2>
        <span class="text-xs text-slate-400">{props.schedule.length} Raten</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th class={`${thClass} text-left`}>Monat</th>
              <th class={`${thClass} text-right`}>Startschuld</th>
              <th class={`${thClass} text-right`}>Rate</th>
              <th class={`${thClass} text-right`}>Zinsen</th>
              <th class={`${thClass} text-right`}>Tilgung</th>
              <th class={`${thClass} text-right`}>Restschuld</th>
            </tr>
          </thead>
          <tbody>
            <For each={displayed()}>
              {(row, i) => (
                <tr class={`border-t border-slate-100 hover:bg-blue-50/40 transition-colors ${i() % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td class={`${tdClass} font-medium text-slate-700 whitespace-nowrap`}>
                    {monthName(row.month)} {row.year}
                  </td>
                  <td class={`${tdClass} text-right text-slate-500`}>{formatEuro(row.startingBalance)}</td>
                  <td class={`${tdClass} text-right font-semibold text-slate-800`}>{formatEuro(row.payment)}</td>
                  <td class={`${tdClass} text-right text-amber-600`}>{formatEuro(row.interest)}</td>
                  <td class={`${tdClass} text-right text-green-600`}>{formatEuro(row.principal)}</td>
                  <td class={`${tdClass} text-right font-medium text-slate-700`}>{formatEuro(row.endingBalance)}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
      {hasMore() && (
        <div class="px-6 py-4 border-t border-slate-100 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {expanded()
              ? 'Weniger anzeigen ↑'
              : `Alle ${props.schedule.length} Raten anzeigen ↓`}
          </button>
        </div>
      )}
    </div>
  );
};

const thClass = 'px-4 py-3 font-semibold';
const tdClass = 'px-4 py-2.5 text-slate-600';

export default MonthlyTable;
