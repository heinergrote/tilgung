# Copilot Instructions – Tilgungsrechner

## Project Overview
A loan amortization calculator SPA for private loans.  
Frontend text is in **German**; all code (variables, functions, types, comments) is in **English**.

**Live app:** https://heinergrote.github.io/tilgung/

## Tech Stack
- **SolidJS** – reactive UI with signals and `createMemo`. No React, no Vue.
- **TypeScript** – strict types throughout; no `any`.
- **Tailwind CSS v4** – utility classes only, no custom CSS files beyond `@import 'tailwindcss'`.
- **Vite** – build tool; `base: '/tilgung/'` is required for GitHub Pages.
- **pnpm** – package manager; do not use npm or yarn.

## Project Structure
```
src/
  types.ts                  # Shared interfaces: LoanParams, AmortizationEntry, AnnualSummary
  utils/
    amortization.ts         # Pure calculation functions + formatters (no side effects)
  components/
    LoanForm.tsx            # Controlled form; receives params + onChange callback
    LoanOverview.tsx        # Stat cards derived from the schedule
    AnnualTable.tsx         # Yearly aggregated table
    MonthlyTable.tsx        # Full monthly breakdown (paginated with show/hide)
  App.tsx                   # Root: holds LoanParams signal, derives schedule/summaries
  index.tsx                 # Entry point – do not modify
  index.css                 # Only contains @import 'tailwindcss'
```

## Architecture Rules
- **State lives in `App.tsx`** via `createSignal<LoanParams>`. Components are stateless and receive data as props.
- **Calculations are pure functions** in `src/utils/amortization.ts`. No SolidJS imports there.
- **`createMemo`** is used in `App.tsx` to derive `schedule` and `annualSummaries` from params. Never recompute inline in JSX.
- Components use **props callbacks** (`onChange`) to bubble changes up to `App.tsx`. No global store.

## Key Types (`src/types.ts`)
```ts
interface LoanParams {
  loanAmount: number;         // € total
  firstPaymentMonth: number;  // 1–12
  firstPaymentYear: number;
  monthlyPayment: number;     // € per month
  yearlyInterestRate: number; // e.g. 3 = 3%
}
```

## Coding Conventions
- Functional components typed as `Component<Props>` from `solid-js`.
- Tailwind class strings kept as constants at the bottom of each file when reused.
- Currency formatted with `formatEuro()` from `utils/amortization.ts` (uses `de-DE` locale).
- Month names in German via `monthName()` from the same utility.
- No `console.log` left in production code.

## Development Commands
```bash
pnpm dev        # start dev server at http://localhost:3000
pnpm build      # production build (outputs to dist/)
pnpm serve      # preview production build locally
```

## Deployment
Automatic via GitHub Actions on push to `main` → GitHub Pages.  
Workflow: `.github/workflows/deploy.yml`  
**Do not change `base: '/tilgung/'`** in `vite.config.ts` — it is required for correct asset paths on GitHub Pages.
