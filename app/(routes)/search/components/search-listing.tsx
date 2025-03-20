'use client'

import { Products } from "@/types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductItem from "@/components/product-item/product-item";
import Loader from "@/components/ui/loader/loader";

import styles from "./search-listing.module.scss";
import getSearchResults from "@/actions/get-search-results";

interface ListingProps {
}

const SearchListing: React.FC<ListingProps> = () => {

    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResuts] = useState<Products[]>([]);

    const searchParams = useSearchParams()
    const search = searchParams.get('s')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (search) {
                const res = await getSearchResults({ search: search, per_page: 100 });
                setSearchResuts(res)
            }
            setLoading(false);
        }
        fetchData();
    }, [search]);

    return (
        <section className="relative min-h-[400px]">
            {loading && <Loader />}

            <div className={styles.listing__top}>
                <h2 className={styles.listing__title}>Результаты поиска по запросу: {search}</h2>
            </div>

            <div className="grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-5">
                {searchResults.length ? searchResults?.map((item) => (
                    <ProductItem data={item} key={item.id} />
                )) : "Ничего не найдено"}
            </div>

        </section>
    );
}

export default SearchListing