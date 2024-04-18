"use client";

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
        </>
    );
};

export default ModalProvider;
