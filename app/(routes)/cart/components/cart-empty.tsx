import Button from '@/components/ui/button/button'
import Link from 'next/link'

const CartEmpty = () => {
    return (
        <div className="text-center">
            <p className="mb-12">Пусто.. Время это исправить!</p>
            <Button type="button" styled="filled" className="mx-auto">
                <Link href='/shop'>В каталог</Link>
            </Button>
        </div>
    )
}

export default CartEmpty