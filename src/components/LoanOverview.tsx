import { Component } from 'solid-js';
import type { AmortizationEntry } from '../types';
import { formatEuro, formatMonthYear } from '../utils/amortization';

interface Props {
  schedule: AmortizationEntry[];
}

const LoanOverview: Component<Props> = (props) => {
  const totalPayment = () => props.schedule.reduce((sum, e) => sum + e.payment, 0);
  const totalInterest = () => props.schedule.reduce((sum, e) => sum + e.interest, 0);
  const totalPrincipal = () => props.schedule.reduce((sum, e) => sum + e.principal, 0);
  const durationMonths = () => props.schedule.length;
  const durationYears = () => Math.floor(durationMonths() / 12);
  const durationRemMonths = () => durationMonths() % 12;

  const lastEntry = () => props.schedule[props.schedule.length - 1];

  const durationLabel = () => {
    const y = durationYears();
    const m = durationRemMonths();
    const parts: string[] = [];
    if (y > 0) parts.push(`${y} Jahr${y !== 1 ? 'e' : ''}`);
    if (m > 0) parts.push(`${m} Monat${m !== 1 ? 'e' : ''}`);
    return parts.join(', ') || '0 Monate';
  };

  const endLabel = () => {
    const last = lastEntry();
    if (!last) return '–';
    return formatMonthYear(last.month, last.year);
  };

  return (
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard
        label="Gesamtzahlung"
        value={formatEuro(totalPayment())}
        accent="blue"
      />
      <StatCard
        label="Davon Zinsen"
        value={formatEuro(totalInterest())}
        accent="amber"
      />
      <StatCard
        label="Davon Tilgung"
        value={formatEuro(totalPrincipal())}
        accent="green"
      />
      <StatCard
        label="Laufzeit"
        value={durationLabel()}
        sub={`${durationMonths()} Monate`}
        accent="purple"
      />
      <StatCard
        label="Letzte Rate"
        value={endLabel()}
        accent="slate"
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent: 'blue' | 'amber' | 'green' | 'purple' | 'slate';
}

const accentMap: Record<StatCardProps['accent'], string> = {
  blue:   'bg-blue-50 border-blue-200 text-blue-700',
  amber:  'bg-amber-50 border-amber-200 text-amber-700',
  green:  'bg-green-50 border-green-200 text-green-700',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  slate:  'bg-slate-50 border-slate-200 text-slate-700',
};

const StatCard: Component<StatCardProps> = (props) => (
  <div class={`rounded-2xl border p-4 flex flex-col gap-1 ${accentMap[props.accent]}`}>
    <span class="text-xs font-medium opacity-70 uppercase tracking-wide">{props.label}</span>
    <span class="text-xl font-bold">{props.value}</span>
    {props.sub && <span class="text-xs opacity-60">{props.sub}</span>}
  </div>
);

export default LoanOverview;
