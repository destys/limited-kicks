import { SingleImage } from '@/types'
import Image from 'next/image'

const BannerCatalog = ({ banner }: { banner: SingleImage | undefined }) => {
    return (
        <div className="col-span-2 row-span-2">
            <div className="h-full">
                {banner && (
                    <Image
                        src={banner.url}
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