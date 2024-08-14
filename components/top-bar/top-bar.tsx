import { Attribute, IProductsQuery } from "@/types";
import FiltersList from "./filters-list";

interface ITopbar {
  query: IProductsQuery;
  count: number;
}

const TopBar: React.FC<ITopbar> = ({ query, count }) => {

  return (
    <>
      <FiltersList query={query} count={count} />
    </>
  );
}

export default TopBar;