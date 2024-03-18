"use client";

/* import OneClickModal from "@/components/modals/OneClickModal"; */
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
            {/* <OneClickModal /> */}
        </>
    );
};

export default ModalProvider;
