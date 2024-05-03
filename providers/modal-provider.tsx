"use client";

import MobileSearch from "@/components/modals/mobile-search";
import OneClickModal from "@/components/modals/one-click-modal";
import ProductsOnRequestModal from "@/components/modals/products-on-request-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <OneClickModal />
            <ProductsOnRequestModal />
            <MobileSearch />
        </>
    );
};

export default ModalProvider;
