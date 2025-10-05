import DaynmicTable from "@/features/DaynmicTable/Table";
import { MockData } from "../../dummyData";
import { schema } from "@/features/DaynmicTable/types/table_schema";

export default function Home() {
  return (
    <div className="p-6">
      <DaynmicTable data={MockData} schema={schema} />
    </div>
  );
}
