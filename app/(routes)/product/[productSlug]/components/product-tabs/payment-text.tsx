import React from 'react'

type Props = {}

const PaymentText = (props: Props) => {
  return (
    <div>
      <p className="mb-3">Оплату заказа можно произвести любым удобным способом:</p>
      <ul className="list-disc list-inside">
        <li>Банковской картой Мир, Mastercard, Visa, Maestro</li>
        <li>Оплата долями</li>
        <li>Бессплатная рассрочка от Тинькофф – 0%</li>
        <li>СберPay, Yandex Pay, MIR Pay, Т-БанкPay.</li>
        <li>Через Систему быстрых платежей (СБП)</li>
        <li>В криптовалюте (USDT)</li>
      </ul>
    </div>
  )
}

export default PaymentText