# FinanceDash

FinanceDash to aplikacja typu personal finance dashboard zbudowana w Next.js 16, React 19 i Tailwind CSS 4. Umożliwia logowanie przez Firebase Auth, przegląd budżetu, zarządzanie transakcjami, kategoriami, preferencjami oraz celami oszczędnościowymi.

## Technologie

- Next.js 16.2.1 z App Routerem
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Firebase Auth
- Recharts
- Lucide React
- `localStorage` jako lokalna warstwa danych aplikacji finansowej

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja działa domyślnie pod adresem:

```text
http://localhost:3000
```

Dostępne skrypty:

- `npm run dev` - uruchamia środowisko deweloperskie Next.js.
- `npm run build` - buduje aplikację produkcyjnie.
- `npm run start` - uruchamia zbudowaną aplikację.
- `npm run lint` - uruchamia ESLint.

## Konfiguracja Firebase

Plik [src/lib/firebase.ts](src/lib/firebase.ts) wymaga publicznych zmiennych środowiskowych Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Jeżeli któraś z nich nie jest ustawiona, aplikacja przerwie inicjalizację z komunikatem o brakujących zmiennych.

## Routing aplikacji

Projekt korzysta z App Routera Next.js. Routing jest oparty o strukturę katalogu [src/app](src/app): foldery definiują segmenty URL, a pliki `page.tsx` definiują widoki dla konkretnych tras. Globalny plik [src/app/layout.tsx](src/app/layout.tsx) jest root layoutem i opakowuje wszystkie strony w:

- `AuthProvider` - kontekst Firebase Auth.
- `AuthGate` - ekran logowania/rejestracji albo dostęp do aplikacji po zalogowaniu.
- `AppLayout` - wspólny układ z nawigacją boczną, górnym paskiem i miejscem na aktualną stronę.

Aktualne trasy:

| URL | Plik | Opis |
| --- | --- | --- |
| `/` | [src/app/page.tsx](src/app/page.tsx) | Dashboard główny: podsumowanie salda, przychodów i wydatków, wykres trendu oszczędności, wykresy kategorii oraz ostatnie transakcje. |
| `/transactions` | [src/app/transactions/page.tsx](src/app/transactions/page.tsx) | Widok zarządzania transakcjami: formularz dodawania oraz tabela z filtrowaniem, sortowaniem, edycją, usuwaniem i paginacją. |
| `/goals` | [src/app/goals/page.tsx](src/app/goals/page.tsx) | Widok celów finansowych: lista celów, paski postępu, dodawanie, edycja i usuwanie przez modal. |
| `/profile` | [src/app/profile/page.tsx](src/app/profile/page.tsx) | Widok profilu użytkownika z formularzami danych konta i zmiany hasła. |
| `/settings` | [src/app/settings/page.tsx](src/app/settings/page.tsx) | Ustawienia budżetu, waluty, powiadomień i kategorii transakcji. |

W projekcie nie ma obecnie tras dynamicznych, route handlerów API ani zagnieżdżonych layoutów per sekcja. Wszystkie strony korzystają z jednego root layoutu.

### Nawigacja

- [src/components/Sidebar.tsx](src/components/Sidebar.tsx) definiuje linki do głównych sekcji aplikacji i podświetla aktywną trasę przez `usePathname`.
- [src/components/Navbar.tsx](src/components/Navbar.tsx) wyświetla tytuł aktualnej strony, zegar, przełącznik trybu ciemnego oraz przycisk menu mobilnego.
- [src/components/PageDescription.tsx](src/components/PageDescription.tsx) mapuje `pathname` na opis strony widoczny na górze widoków.

## Dane i stan aplikacji

Główny stan finansowy znajduje się w hooku [src/hooks/useFinance.ts](src/hooks/useFinance.ts). Hook korzysta z [src/hooks/useLocalStorage.ts](src/hooks/useLocalStorage.ts), dlatego transakcje, kategorie, budżet, cele i preferencje są zapisywane lokalnie w przeglądarce.

Przechowywane klucze:

- `dashboard_transactions`
- `dashboard_categories`
- `dashboard_budget`
- `dashboard_goals`
- `dashboard_preferences`

Domyślne kategorie, przykładowe transakcje i cele są zdefiniowane w [src/utils/mockData.ts](src/utils/mockData.ts). Typy domenowe aplikacji znajdują się w [src/types/index.ts](src/types/index.ts).

## Powtarzalne komponenty

### Layout i autoryzacja

- `AuthProvider` - udostępnia użytkownika, status ładowania i akcje `login`, `register`, `resetPassword`, `logout`.
- `AuthGate` - blokuje aplikację przed niezalogowanym użytkownikiem i renderuje formularze logowania/rejestracji.
- `AppLayout` - wspólny szkielet aplikacji z `Sidebar`, `Navbar` i responsywnym menu mobilnym.
- `Sidebar` - lista linków routingu, dane użytkownika i akcja wylogowania.
- `Navbar` - tytuł strony, aktualna data/godzina, przełącznik motywu i menu mobilne.
- `PageDescription` - jednolity opis widoku na podstawie bieżącej trasy.

### Komponenty dashboardu i finansów

- `DashboardSummary` - trzy karty z saldem, przychodami i wydatkami z bieżącego miesiąca.
- `SavingsTrendChart` - wykres Recharts pokazujący wynik miesięczny albo skumulowane oszczędności.
- `CategoryPieChart` - uniwersalny wykres kołowy dla kategorii wydatków lub przychodów, konfigurowany przez propsy `type`, `title`, `emptyMessage`, `className`.
- `RecentTransactions` - skrócona lista ostatnich transakcji z linkiem do pełnego widoku.
- `TransactionForm` - formularz dodawania przychodu lub wydatku z walidacją kwoty, kategorii i daty.
- `TransactionsTable` - tabela transakcji z filtrami, sortowaniem po dacie, edycją inline, usuwaniem i paginacją.
- `Goals` - siatka celów finansowych z postępem, sortowaniem według realizacji i akcjami edycji/usuwania.
- `GoalFormModal` - modal używany zarówno do tworzenia, jak i edycji celu.
- `BudgetSettings` - ustawienie miesięcznego limitu oraz pasek wykorzystania budżetu.
- `CategoriesManager` - dodawanie kategorii przychodów i wydatków z wyborem koloru.
- `PreferencesSettings` - wybór waluty i przełącznik powiadomień e-mail.

### Komponenty UI

W katalogu [src/components/ui](src/components/ui) są bazowe elementy interfejsu używane w wielu widokach:

- `Button` - warianty przycisków (`default`, `outline`, `ghost`, `destructive`, itd.) i rozmiary (`default`, `sm`, `lg`, `icon`).
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` - spójny kontener dla paneli i sekcji.
- `Input` - ujednolicony input tekstowy, liczbowy, daty i hasła.
- `Select` - własny komponent select z listą opcji i obsługą kliknięcia poza komponentem.
- `Switch` - dostępny przełącznik typu on/off.
- `Badge` - etykieta używana m.in. dla kategorii transakcji.

## Struktura katalogów

```text
src/
  app/                 Routing Next.js App Router
  components/          Komponenty widoków, layoutu i UI
  components/ui/       Bazowe, powtarzalne komponenty interfejsu
  hooks/               Hooki do localStorage i stanu finansowego
  lib/                 Integracje zewnętrzne, np. Firebase
  types/               Typy domenowe aplikacji
  utils/               Funkcje pomocnicze i dane startowe
```

## Ważne uwagi architektoniczne

- Auth jest globalny: każda trasa przechodzi przez `AuthGate`.
- Dane finansowe nie są obecnie zapisywane w Firebase ani w backendzie. Po zalogowaniu aplikacja używa lokalnego `localStorage` przeglądarki.
- `useFinance` jest źródłem prawdy dla widoków finansowych i udostępnia zarówno dane, jak i akcje modyfikujące.
- Formatowanie walut odbywa się przez [src/utils/formatCurrency.ts](src/utils/formatCurrency.ts) z lokalizacją `pl-PL`.
- Klasy CSS są składane funkcją `cn` z [src/utils/utils.ts](src/utils/utils.ts), która łączy `clsx` i `tailwind-merge`.
