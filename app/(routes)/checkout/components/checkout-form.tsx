'use client'
import { User } from '@/types'
import { wooApi } from '@/lib/wc-rest-api'
import { FormEvent, FormEventHandler, SetStateAction, useEffect, useState } from 'react'

import useUser from '@/hooks/use-user'
import useShoppingCart from '@/hooks/use-cart'
import getUser from '@/actions/get-user'

import Button from '@/components/ui/button/button'
import Input from '@/components/ui/input/input'
import Radio from '@/components/ui/radio/radio'
import Loader from '@/components/ui/loader/loader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface IDelivery {
    settings: { cost?: { value: string } };
    method_id: string;
    method_title: string;
    id: number;
}

interface IPayments {
    method_title: string;
    id: string;
}

interface CheckoutFormData {
    payments: { value: string };
    delivery_address: { value: string };
    deivery_methods: { value: string };
}
const CheckoutForm = () => {
    const [user, setUser] = useState<User | null>(null);
    const [deliveryMethods, setDeliveryMethods] = useState<IDelivery[]>([]);
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [loading, setLoading] = useState(true);
    const { jwtToken } = useUser();
    const { items, clearCart } = useShoppingCart();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = jwtToken ? await getUser(jwtToken) : null;
                setUser(userData);

                const [paymentsData, shippingZones] = await Promise.all([
                    wooApi.get('payment_gateways'),
                    wooApi.get('shipping/zones')
                ]);

                setPayments(paymentsData.data.filter((gateway: { enabled: any }) => gateway.enabled));

                if (shippingZones.data.length > 0) {
                    const methodsData = await wooApi.get(`shipping/zones/${shippingZones.data[0].id}/methods`);
                    setDeliveryMethods(methodsData.data);
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [jwtToken]);

    const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement & CheckoutFormData;
        const deliveryIndex = parseInt(form.deivery_methods.value, 10);

        try {
            const orderResponse = await wooApi.post("orders", {
                status: 'processing',
                payment_method: form.payments.value,
                payment_method_title: payments.find(p => p.id === form.payments.value)?.method_title,
                customer_id: user?.id || 0,
                set_paid: true,
                billing: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    address_1: form.delivery_address.value,
                    country: "RU",
                    email: user?.email,
                    phone: user?.phone,
                },
                line_items: items.map(item => ({
                    product_id: item.entrySize ? item.entrySize.parent_id : item.id,
                    quantity: item.quantity,
                    variation_id: item.entrySize?.id,
                })),
                shipping_lines: [{
                    method_id: deliveryMethods[deliveryIndex]?.method_id,
                    method_title: deliveryMethods[deliveryIndex]?.method_title,
                    total: deliveryMethods[deliveryIndex]?.settings.cost?.value,
                }]
            });

            toast.success('Заказ успешно оформлен');
            clearCart();
            router.push('/');
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error('Ошибка при оформлении заказа');
        }
    };

    return (
        <form action="#" className="relative 2xl:col-span-4 min-h-[100vh]" onSubmit={handleCheckout}>
            {loading ? <Loader /> : (
                <div>
                    <div className="mb-6 lg:mb-11">
                        <h2 className="mb-3 lg:mb-7 max-md:text-base">1. Личная информация</h2>
                        <div className="grid sm:grid-cols-2 gap-3 md:gap-7">
                            <Input
                                type="text"
                                className="md:py-6 md:px-10 border border-add_4"
                                label="Имя"
                                name="first_name"
                                placeholder="Введите имя"
                                defaultValue={user?.first_name}
                            />
                            <Input
                                type="text"
                                className="md:py-6 md:px-10 border border-add_4"
                                label="Фамилия"
                                name="last_name"
                                placeholder="Введите фамилию"
                                defaultValue={user?.last_name}
                            />
                        </div>
                    </div>
                    <div className="mb-6 lg:mb-11">
                        <h2 className="mb-3 lg:mb-7 max-md:text-base">2. Адрес доставки</h2>
                        <div className="grid gap-2 md:gap-4 mb-4 md:mb-7">
                            {user?.acf.addresses.map((item, index) => (
                                <Radio
                                    key={index + '-user'}
                                    label={`${item.city}, ул.${item.street}, д. ${item.build} ${!!item.apartment_number && `, кв. ${item.apartment_number}`}`}
                                    name="delivery_address"
                                    id={`delivery-address-${index}`}
                                    defaultChecked={index === 0}
                                    value={`${item.city}, ул.${item.street}, д. ${item.build} ${!!item.apartment_number && `, кв. ${item.apartment_number}`}`}

                                />
                            ))}
                        </div>
                        <Button styled="filled" type="button">
                            Добавить новый адрес
                        </Button>
                    </div>
                    <div className="mb-6 lg:mb-11">
                        <h2 className="mb-3 lg:mb-7 max-md:text-base">3. Способ доставки</h2>
                        <div className="grid gap-2 md:gap-4 mb-4 md:mb-7">
                            {deliveryMethods?.map((item, index) => (
                                <Radio
                                    key={item.id + 'del'}
                                    label={item.method_title}
                                    name="deivery_methods"
                                    id={`deivery-methods-${item.id}`}
                                    defaultChecked={index === 0}
                                    value={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-6 lg:mb-11">
                        <h2 className="mb-3 lg:mb-7 max-md:text-base">4. Способ оплаты</h2>
                        <div className="grid md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-7">
                            {payments?.map((item, index) => (
                                <Radio
                                    key={item.id + 'pay'}
                                    label={item.method_title}
                                    name="payments"
                                    id={`payments-${item.id}`}
                                    defaultChecked={index === 0}
                                    value={item.id}
                                />
                            ))}
                        </div>
                    </div>
                    <Button styled="filled" type="submit">
                        Перейти к оплате
                    </Button>
                </div>
            )}

        </form>
    )
}

export default CheckoutForm