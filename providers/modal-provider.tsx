"use client";

import { useEffect, useState } from "react";
import MainMenu from "@/components/main-menu/main-menu";
import MobileSearch from "@/components/modals/mobile-search";
import OneClickModal from "@/components/modals/one-click-modal";
import ProductsOnRequestModal from "@/components/modals/products-on-request-modal";
import ProductGalleryModal from "@/components/modals/product-gallery-modal";
import SizesTableModal from "@/components/modals/sizes-table-modal";

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
            <MainMenu />
            <ProductGalleryModal />
            <SizesTableModal />
        </>
    );
};

export default ModalProvider;
