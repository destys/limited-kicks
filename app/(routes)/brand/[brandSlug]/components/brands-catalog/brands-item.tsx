import { Brand } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface BrandsItemProps {
    data: Brand;
}

const BrandsItem: React.FC<BrandsItemProps> = ({ data }) => {
    return (
        <Link
            href={"/products"}
            className="flex items-center gap-3 w-fit flex-shrink-0 py-3 px-5 bg-add_1 rounded-lg hover:bg-add_1_hv"
        >
            <Image
                src={`/images/small-brands/${data.image}`}
                alt={data.title}
                width={41}
                height={28}
                className="mix-blend-darken"
            />
            <p className="whitespace-nowrap text-sm md:text-base">{data.title}</p>
        </Link>
    );
}

export default BrandsItem