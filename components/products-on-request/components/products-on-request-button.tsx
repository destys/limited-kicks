'use client'
import Button from '@/components/ui/button/button'

import styles from '../products-on-request.module.scss'
import useProductsOnRequestModal from '@/hooks/use-products-on-requst-modal'

const ProductsOnRequestButton = () => {
    const productsOnRequestModal = useProductsOnRequestModal();
    return (
        <Button type='button' styled='filled' className={styles.contentOnrequest__button} onClick={productsOnRequestModal.onOpen}>Запросить</Button>
    )
}

export default ProductsOnRequestButton