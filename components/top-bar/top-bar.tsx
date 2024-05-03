import { Attribute } from "@/types";
import FiltersList from "./filters-list";

interface ITopbar {
  count: number;
  filters: Attribute[];
}

const TopBar: React.FC<ITopbar> = ({ count, filters }) => {

  return (
    <>
      <FiltersList count={count} filters={filters} />
    </>
  );
}

export default TopBar;