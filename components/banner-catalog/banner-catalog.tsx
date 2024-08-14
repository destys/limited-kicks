import Image from 'next/image'
import React from 'react'

type Props = {}

const BannerCatalog = ({ banner }: { banner: any }) => {
    return (
        <div className="col-span-2 row-span-2">
            <div className="h-full">
                {!banner ? (
                    <div className="flex justify-center items-center rounded-[20px] w-full h-full bg-add_1 aspect-square">
                        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
                            Баннер
                        </h2>
                    </div>
                ) : (
                    <Image
                        src={banner.image}
                        width={1800}
                        height={400}
                        alt={banner.alt}
                    />
                )}
            </div>
        </div>
    )
}

export default BannerCatalog