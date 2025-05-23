import useProductGalleryModal from '@/hooks/use-product-gallery-modal';
import Modal from './modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';

type Props = {}

const ProductGalleryModal = () => {
    const { images, onClose, isOpen } = useProductGalleryModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onChange={onChange} contentClassNames="!bg-transparent h-[500px]">
            <button onClick={onClose} className="absolute top-0 right-0 z-10 bg-main">
                <Image src={'/icons/Icon/Close-white.svg'} width={30} height={30} alt="close" />
            </button>
            {images.length ? (
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Navigation]}
                    className="h-[500px]"
                    navigation
                    loop
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.id} className="bg-white">
                            <div>
                                <Image src={image.src} alt={`Slide ${index}`} layout="fill" objectFit='contain' />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : <div className="text-white">Изображений не найдено</div>}

        </Modal>
    )
}

export default ProductGalleryModal