import { TransactionForm } from "../../components/TransactionForm";
import { TransactionsTable } from "../../components/TransactionsTable";
import { PageDescription } from "../../components/PageDescription";

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageDescription />
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2">
           <TransactionsTable />
        </div>
      </div>
    </div>
  );
}
