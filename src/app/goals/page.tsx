import { Goals } from "../../components/Goals";

export default function GoalsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex-1">
        <Goals />
      </div>
    </div>
  );
}
