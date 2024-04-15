'use client'
import { User } from '@/types'
import { wooApi } from '@/lib/wc-rest-api'
import { FormEventHandler, SetStateAction, useEffect, useState } from 'react'

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
    settings: any
    method_id: any
    method_title: string
    id: number;
    label: string;
}

interface IPayments {
    method_title: string
    id: string; label: string;
}

const CheckoutForm = () => {
    const [user, setUser] = useState<User | null>(null);
    const [deliveryMethods, setDeliveryMethods] = useState<IDelivery[]>([]);
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { jwtToken } = useUser();
    const { items, clearCart } = useShoppingCart();
    const router = useRouter();

    useEffect(() => {
        const FetchUserData = async () => {
            if (jwtToken) {
                try {
                    setLoading(true);
                    setError(false);
                    const userData = await getUser(jwtToken);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            }
        }
        FetchUserData();
    }, [jwtToken]);

    useEffect(() => {
        wooApi.get('payment_gateways').then((response: { data: any[] }) => {
            const enabledGateways = response.data.filter(gateway => gateway.enabled);
            setPayments(enabledGateways);
        }).catch((error: { response: { data: any } }) => {
            console.log('payments: ', error.response.data);
        });
        wooApi.get('shipping/zones').then((response: { data: { id: number }[] }) => {
            wooApi.get(`shipping/zones/${response.data[0].id}/methods`).then((response: { data: SetStateAction<IDelivery[]> }) => {
                setDeliveryMethods(response.data)
            }).catch((error: any) => {
                console.log('error: ', error);
            });
        }).catch((error: { response: { data: any } }) => {
        });
    }, [])

    const addAddress = () => {
        alert("Адрес добавлен");
    };

    const handleCheckout = (e: any) => {
        e.preventDefault();

        const lineItems = items.map(item => {
            const lineItem = {
                product_id: item.entrySize ? item.entrySize.parent_id : item.id,
                quantity: item.quantity,
                variation_id: 0,
            };
            if (item.entrySize) {
                lineItem.variation_id = item.entrySize.id;
            }
            return lineItem;
        });

        const data = {
            status: 'processing',
            payment_method: e.currentTarget.payments.value,
            customer_id: user?.id || 0,
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
                first_name: user?.first_name,
                last_name: user?.last_name,
                address_1: e.currentTarget.delivery_address.value,
                country: "RU",
                email: user?.email,
                phone: user?.phone,
            },
            line_items: lineItems,
            shipping_lines: [
                {
                    method_id: deliveryMethods[e.currentTarget.deivery_methods.value].method_id,
                    method_title: deliveryMethods[e.currentTarget.deivery_methods.value].method_title,
                    total: deliveryMethods[e.currentTarget.deivery_methods.value].settings.cost?.value
                }
            ]
        };

        wooApi.post("orders", data)
            .then((response: { data: any }) => {
                toast.success('Заказ успешно оформлен');
                clearCart();
                router.push('/')
            })
            .catch((error: { response: { data: any } }) => {
                console.log(error.response.data);
            });
    }

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
                        <Button styled="filled" onClick={addAddress} type="button">
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