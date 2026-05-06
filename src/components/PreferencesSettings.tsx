"use client";

import { useFinance } from "../hooks/useFinance";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Select } from "./ui/Select";
import { Switch } from "./ui/Switch";

const CURRENCY_OPTIONS = [
  { value: "PLN", label: "PLN (Polish Złoty)" },
  { value: "USD", label: "USD (US Dollar)" },
  { value: "EUR", label: "EUR (Euro)" },
  { value: "GBP", label: "GBP (British Pound)" },
  { value: "JPY", label: "JPY (Japanese Yen)" },
  { value: "CHF", label: "CHF (Swiss Franc)" },
];

export function PreferencesSettings() {
  const { preferences, updatePreferences, isHydrated } = useFinance();

  if (!isHydrated) return <Card className="animate-pulse h-64"><CardContent /></Card>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Manage your app preferences and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Currency</label>
            <Select
              value={preferences.currency}
              onChange={(value) => updatePreferences({ currency: value })}
              options={CURRENCY_OPTIONS}
            />
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email notification</label>
              <p className="text-[13px] text-zinc-500">Receive weekly summaries of your spending</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => updatePreferences({ emailNotifications: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
