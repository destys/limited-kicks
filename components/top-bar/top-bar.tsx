import { Attribute, IProductsQuery } from "@/types";
import FiltersList from "./filters-list";

interface ITopbar {
  query: IProductsQuery;
  count: number;
  searchParams: {};
}

const TopBar: React.FC<ITopbar> = ({ query, count, searchParams }) => {

  return (
    <>
      <FiltersList query={query} count={count} searchParams={searchParams} />
    </>
  );
}

export default TopBar;