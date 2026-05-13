import { DashboardSummary } from "../components/DashboardSummary";
import { RecentTransactions } from "../components/RecentTransactions";
import { CategoryPieChart } from "../components/CategoryPieChart";
import { PageDescription } from "../components/PageDescription";
import { SavingsTrendChart } from "../components/SavingsTrendChart";

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageDescription />
      
      <DashboardSummary />

      <SavingsTrendChart />
      
      <div className="grid gap-4 lg:grid-cols-10">
        <CategoryPieChart className="lg:col-span-3" />
        <CategoryPieChart
          type="income"
          title="Incomes by Category"
          emptyMessage="No incomes found."
          className="lg:col-span-3"
        />
        <RecentTransactions className="lg:col-span-4" />
      </div>
    </div>
  );
}
