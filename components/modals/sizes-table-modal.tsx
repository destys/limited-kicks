"use client";

import { useRouter } from "next/navigation";

import Modal from "./modal";
import useTableSizesModal from "@/hooks/use-sizes-table-modal";

export default function SizesTableModal() {
    const { onClose, isOpen, sizes } = useTableSizesModal();

    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Modal title={"Таблица размеров"} isOpen={isOpen} onChange={onChange} contentClassNames="md:!max-w-[500px] left-auto md:right-20 !translate-x-0">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {sizes?.use_header && sizes.header.map((item: { c: string }, index: number) => (
                                <th key={index} className="px-4 py-2 text-center bg-add_1 border-b max-md:text-xs">{item.c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sizes?.body?.map((row: any, index: number) => (
                            <tr key={index} className="even:bg-add_1">
                                {row.map((item: { c: string }, cellIndex: number) => (
                                    <td key={cellIndex} className="px-4 py-2 text-center max-md:text-xs max-md:px-2">{item.c}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
