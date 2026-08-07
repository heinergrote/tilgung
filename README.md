# Tilgungsrechner

Ein einfacher Tilgungsrechner für Privatdarlehen als Single-Page-App.

🌐 **[App öffnen](https://heinergrote.github.io/tilgung/)**

---

## Funktionen

- **Eingabeparameter** – Darlehensbetrag, monatliche Rate, Jahreszins, Startdatum
- **Kennzahlen** – Gesamtkosten, Zinslast, Laufzeit auf einen Blick
- **Jahresübersicht** – aggregierte Tabelle pro Kalenderjahr
- **Monatliche Aufschlüsselung** – vollständiger Tilgungsplan mit Rate, Zinsen, Tilgungsanteil und Restschuld
- Alle Werte aktualisieren sich sofort bei Eingabe

## Tech Stack

| | |
|---|---|
| Framework | [SolidJS](https://solidjs.com) |
| Build tool | [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Language | TypeScript |
| Package manager | pnpm |
| Deployment | GitHub Pages |

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
pnpm install

# Entwicklungsserver starten (http://localhost:3000)
pnpm dev

# Produktions-Build erstellen
pnpm build

# Build lokal vorschauen
pnpm serve
```

## Projektstruktur

```
src/
├── types.ts                  # Gemeinsame Typen (LoanParams, AmortizationEntry, …)
├── utils/
│   └── amortization.ts       # Berechnung des Tilgungsplans
├── components/
│   ├── LoanForm.tsx          # Eingabeformular
│   ├── LoanOverview.tsx      # Kennzahlen-Übersicht
│   ├── AnnualTable.tsx       # Jahrestabelle
│   └── MonthlyTable.tsx      # Monatstabelle
└── App.tsx                   # Reaktive Signale & Layout
```

## Deployment

Die App wird automatisch per GitHub Actions auf GitHub Pages deployt, sobald Änderungen auf den `main`-Branch gepusht werden.

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
