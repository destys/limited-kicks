const DeliveryText = () => {
    return (
        <div>
            <div className="mb-4">
                <p><strong>Из наличия:</strong></p>
                <ul className="list-disc list-inside">
                    <li>от 2-х часов по Москве,</li>
                    <li>от 24 часов для Санкт-Петербурга</li>
                    <li>до 7 дней по всей России.</li>
                </ul>
            </div>
            <div>
                <p>Под заказ:</p>
                <ul className="list-disc list-inside">
                    <li>Экспресс от 2 - х дней(3000₽)</li>
                    <li>Бесплатная доставка до 20 дней.</li>
                </ul>
            </div>
        </div>
    )
}

export default DeliveryText