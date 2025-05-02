'use client'
import { Address, User } from '@/types'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useUser from '@/hooks/use-user'
import useShoppingCart from '@/hooks/use-cart'
import getUser from '@/actions/get-user'

import Loader from '@/components/ui/loader/loader'
import Button from '@/components/ui/button/button'
import Input from '@/components/ui/input/input'
import Radio from '@/components/ui/radio/radio'
import { fetchWooCommerce } from '@/lib/utils'

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
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [build, setBuild] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');

    const [paymentType, setPaymentType] = useState('cash');

    const [user, setUser] = useState<User | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([])
    const [deliveryMethods, setDeliveryMethods] = useState<IDelivery[]>([]);
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const { jwtToken } = useUser();
    const { items, clearCart, coupon } = useShoppingCart();

    const router = useRouter();



    useEffect(() => {
        if (!jwtToken) router.push('/auth');
        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = jwtToken ? await getUser(jwtToken) : null;
                console.log('userData: ', userData);

                if (userData === null) {
                    localStorage.setItem('fromCheckout', 'true');
                    router.push('/auth');
                }

                setUser(userData);

                if (userData) {
                    setAddresses(userData.acf.addresses || [])
                }

                const [paymentsData, shippingZones] = await Promise.all([
                    fetchWooCommerce('payment_gateways',
                        {
                            withCredentials: true
                        }),
                    fetchWooCommerce('shipping/zones',
                        {
                            withCredentials: true
                        })
                ]);

                setPayments(paymentsData.filter((gateway: { enabled: any }) => gateway.enabled));

                if (shippingZones.length > 0) {
                    const methodsData = await fetchWooCommerce(`shipping/zones/${shippingZones[0].id}/methods`,
                        {
                            withCredentials: true
                        });
                    setDeliveryMethods(methodsData);
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwtToken]);

    const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement & CheckoutFormData;
        const deliveryIndex = parseInt(form.deivery_methods.value, 10);
        const paymentMethod = form.payments.value;
        const isTinkoff = paymentMethod === 'tinkoff_custom_gateway';
        const isDolyami = paymentMethod === "dolyamepayment";

        const order = {
            status: 'pending',
            payment_method: paymentMethod,
            payment_method_title: payments.find(p => p.id === paymentMethod)?.method_title,
            customer_id: user?.id || 0,
            set_paid: false,
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
            coupon_lines: coupon ? [{
                code: coupon.code,
            }] : [],
            shipping_lines: [{
                method_id: deliveryMethods[deliveryIndex]?.method_id,
                method_title: deliveryMethods[deliveryIndex]?.method_title,
                total: deliveryMethods[deliveryIndex]?.settings.cost?.value,
            }],
        };

        try {
            const orderResponse = await fetchWooCommerce("orders", {
                withCredentials: true
            }, 'post', order);
            const orderId = orderResponse.id;

            if (isTinkoff) {
                const res = await fetch(`${process.env.WP_ADMIN_REST_URL}/tinkoff/v1/init`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        success_url: `https://limited-kicks.ru/success?orderId=${orderId}`,
                        fail_url: `https://limited-kicks.ru/fail`,
                    }),
                });

                const data = await res.json();

                if (data.PaymentURL) {
                    window.location.href = data.PaymentURL;
                    return;
                } else {
                    toast.error('Не удалось получить ссылку оплаты от Тинькофф');
                    return;
                }
            }

            if (isDolyami) {
                try {
                    const res = await fetch(`https://limited-kicks.ru/admin/wp-json/dolyame/v1/create-payment-link`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            order_id: orderId,
                            /* success_url: `https://limited-kicks.ru/success?orderId=${orderId}`,
                            fail_url: `https://limited-kicks.ru/fail`, */
                        }),
                    });

                    const data = await res.json();
                    if (data?.redirect) {
                        window.location.href = data.redirect;
                        return;
                    } else {
                        toast.error('Не удалось получить ссылку на оплату через Долями');
                        return;
                    }
                } catch (error) {
                    console.error('Ошибка при инициализации оплаты Долями:', error);
                    toast.error('Ошибка оплаты через Долями');
                    return;
                }
            }

            // Если не Тинькофф, оформляем заказ как обычно
            toast.success('Заказ успешно оформлен');

            try {
                await fetchWooCommerce(`orders/${orderId}`, {}, "PUT", {
                    status: "processing",
                });
            } catch (err) {
                console.error("Ошибка при обновлении статуса заказа:", err);
            }

            clearCart();
            router.push('/');
        } catch (error) {
            console.error('Ошибка оформления заказа:', error);
            toast.error('Ошибка при оформлении заказа');
        }
    };

    const updateAddresses = async () => {

        const newAddress = {
            'city': city,
            'street': street,
            'build': build,
            'apartment_number': apartmentNumber,
        };

        const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom/v1/update-user/${user?.id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`, // Если требуется авторизация
            },
            body: JSON.stringify({
                acf: {
                    addresses: [...addresses, newAddress]
                }
            }),
        });

        if (!response.ok) {
            toast.error('Ошибка добавления адреса');
            throw new Error('Ошибка добавления адреса');
        }
        if (response.ok) {
            toast.success('Адрес добавлен');
            setAddresses(prevAddresses => [...prevAddresses, newAddress]);
            setShowAddForm(false);
        }

        return response.json();
    };



    return (
        <form className="relative lg:col-span-3 2xl:col-span-4 min-h-[100vh] row-start-2 lg:row-start-1" onSubmit={handleCheckout}>
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
                            <div className="sm:col-span-2 ">
                                <Input
                                    type="text"
                                    className="md:py-6 md:px-10 border border-add_4"
                                    label="Email"
                                    name="email"
                                    placeholder="Введите email"
                                    defaultValue={user?.email}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 lg:mb-11">
                        <h2 className="mb-3 lg:mb-7 max-md:text-base">2. Адрес доставки</h2>
                        <div className="grid gap-2 md:gap-4 mb-4 md:mb-7">
                            {addresses.length ? (addresses.map((item, index) => (
                                <Radio
                                    key={index + '-user'}
                                    label={`${item.city}, ул.${item.street}, д. ${item.build} ${!!item.apartment_number && `, кв. ${item.apartment_number}`}`}
                                    name="delivery_address"
                                    id={`delivery-address-${index}`}
                                    defaultChecked={index === 0}
                                    value={`${item.city}, ул.${item.street}, д. ${item.build} ${!!item.apartment_number && `, кв. ${item.apartment_number}`}`}

                                />
                            ))) : <p>Адреса еще не добавлены</p>}
                        </div>
                        {showAddForm && <div className="mt-6">
                            <div className="grid grid-cols-1 xs:grid-cols-2 2xl:grid-cols-4 gap-2 ">
                                <input className="py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base" type="text" name="city" placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} />
                                <input className="py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base" type="text" name="street" placeholder="Улица" value={street} onChange={(e) => setStreet(e.target.value)} />
                                <input className="py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base" type="text" name="build" placeholder="Дом" value={build} onChange={(e) => setBuild(e.target.value)} />
                                <input className="py-3 px-4 md:py-4 md:px-6 w-full bg-white rounded-[10px] border border-add_4 text-xs xs:text-sm lg:text-base" type="text" name="apartment_number" placeholder="Квартира" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} />
                            </div>
                            <Button type="button" styled="filled" className='mt-3' onClick={updateAddresses}>Сохранить</Button>
                        </div>}
                        {!showAddForm && <Button type="button" styled={"filled"} className={'w-full mt-4 xs:w-fit'} onClick={() => setShowAddForm(true)}>Добавить новый адрес</Button>}
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
                                <div key={item.id + 'pay'} onClick={() => setPaymentType(item.method_title.includes('Т-Касса') ? "card" : "cash")}>
                                    <Radio
                                        label={item.method_title}
                                        name="payments"
                                        id={`payments-${item.id}`}
                                        defaultChecked={index === 0}
                                        value={item.id}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                    <Button styled="filled" type="submit">
                        {paymentType === "cash" ? "Оформить заказ" : "Перейти к оплате"}
                    </Button>
                </div>
            )}

        </form>
    )
}

export default CheckoutForm