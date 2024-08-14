import { useState } from "react";

import { Product } from "@/types";

import styles from "./product-tabs.module.scss";
import Button from "@/components/ui/button/button";
import PaymentText from "./payment-text";
import DeliveryText from "./delivery-text";
import Details from "./details";
import Description from "./description";

interface IProductTabs {
  data: Product;
}

const ProductTabs: React.FC<IProductTabs> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Описание",
      content: <Description data={data} />,
    },
    {
      id: 1,
      title: "Детали",
      content: <Details data={data} />,
    },
    {
      id: 2,
      title: "Оплата",
      content: <PaymentText />,
    },
    {
      id: 3,
      title: "Доставка",
      content: <DeliveryText />,
    },
    {
      id: 4,
      title: "100% Оригинал",
      content: "Каждый товар проходит тщательную проверку в несколько этапов. Мы применяем наш опыт и ИИ технологии для исследования каждого заказа. Приобретая товар в нашем магазине, Вы можете быть уверенными в его аутентичности на 100%.",
    },
    {
      id: 5,
      title: "Гарантия",
      content: "Вы можете вернуть или обменять товар в течение 14 дней с момента получения заказа. Товар должен быть в оригинальном состоянии и упаковке без следов использования.",
    },
    {
      id: 6,
      title: "Подбор размера",
      content: "Мы оказываем сервис подбора размера для всех клиентов. Вам больше не стоит переживать! Подобрать размер можно в Telegram или WhatsApp (ссылки)",
    },
    /* {
      id: 7,
      title: "Отзывы",
      content: "",
    }, */
  ];
  return (
    <div className={styles.tabs}>
      <div className={styles.navigation}>
        {tabs.map((item, index) => (
          <Button
            key={item.id}
            type="button"
            styled={"filled"}
            className={`whitespace-nowrap
              ${activeTab !== index
                ? "bg-add_1 text-black"
                : "hover:bg-black hover:text-white"
              }
            `}
            onClick={() => setActiveTab(item.id)}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className={styles.body}>
        {tabs.map((item, index) => (
          <div
            key={item.id}
            className={activeTab === index ? "block" : "hidden"}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductTabs;