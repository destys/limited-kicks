import { useState } from "react";


import styles from "./product-tabs.module.scss";
import Button from "@/components/ui/button/button";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Описание",
      content:
        "There Elevate High Light Lilac Black Toe consists of an upper in white leather broken to which zips are added to the inner part. She also has overlays and a swoosh in black leather, as well as encroachments in Daim LilasOn the flap and the heel. THE design Complete with its signature element, namely its imposing two -color platform sole while the ankle is adorned by outline of a Wings logo.",
    },
    {
      id: 1,
      title: "Оплата",
      content: "",
    },
    {
      id: 2,
      title: "Доставка",
      content: "",
    },
    {
      id: 3,
      title: "100% Оригинал",
      content: "",
    },
    {
      id: 4,
      title: "Гарантия",
      content: "",
    },
    {
      id: 5,
      title: "Отзывы",
      content: "",
    },
    {
      id: 6,
      title: "Подбор размера",
      content: "",
    },
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
              ${
                activeTab !== index
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
