import AddIncome from "./AddIncome";
import IncomeTable from "./IncomeTable";

export default function ViewPage() {
  return (
    <>
      <div className="flex flex-row ">
        <AddIncome />
        <IncomeTable />
      </div>
    </>
  );
}
