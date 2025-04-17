import React from "react";
import Button from "../ui/button/button";
import Input from "../ui/input/input";

import styles from "./subscribe.module.scss";
import ProductsOnRequest from "../products-on-request/products-on-request";
import getAcfOptions from "@/actions/get-acf-options";

export default async function Subscribe() {
  const siteOptions = await getAcfOptions();
  return <ProductsOnRequest data={siteOptions?.acf.tovary_po_zaprosu} />
  return (
    <div className={styles.subscribe}>
      <div className={styles.subscribe__title}>Получи скидку 10%</div>
      <p className={styles.subscribe__subtitle}>
        Оставь свой E-mail и получай рассылку с самыми сочными предложениями
      </p>
      <form action="" className={styles.subscribe__form}>
        <Input
          type="email"
          placeholder="Введите E-mail"
          className={"border-none"}
          name="subscribe"
        />
        <Button type="submit" styled={"filled"}>
          Отправить
        </Button>
      </form>
    </div>
  );
}
