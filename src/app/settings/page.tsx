import { BudgetSettings } from "../../components/BudgetSettings";
import { CategoriesManager } from "../../components/CategoriesManager";
import { PageDescription } from "../../components/PageDescription";
import { PreferencesSettings } from "../../components/PreferencesSettings";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageDescription />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <BudgetSettings />
          <PreferencesSettings />
        </div>
        <div className="lg:col-span-2">
           <CategoriesManager />
        </div>
      </div>
    </div>
  );
}
