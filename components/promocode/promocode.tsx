import React, { FormEvent, useState } from 'react'
import Input from '../ui/input/input'
import Button from '../ui/button/button'
import { wooApi } from '@/lib/wc-rest-api'
import { PacmanLoader } from 'react-spinners'
import useShoppingCart from '@/hooks/use-cart'

const Promocode = () => {
    const [coupon, setCoupon] = useState({});

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const cart = useShoppingCart();

    const getCouponByCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await wooApi.get("coupons", {
                code: e.currentTarget.coupon.value
            });

            const coupons = response.data;
            if (!coupons.length) {
                setError('Промокод не найден');
            }
            const singleCoupon = coupons.length > 0 ? coupons[0] : null;
            setCoupon(singleCoupon);
            cart.addCoupon(singleCoupon);
        } catch (error) {
            console.error('Failed to fetch coupon:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={getCouponByCode} className='mb-8'>
            <div className="flex gap-2 w-full items-end ">
                <div className='flex-auto'>
                    <Input type="text" name='coupon' label="Промокод" placeholder="Введите промокод" />
                </div>
                <Button type="submit" styled="filled" className='flex justify-center items-center h-14'>
                    {loading ? <PacmanLoader color="#fff" size={14} /> : "Применить"}
                </Button>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
    )
}

export default Promocode