import getAcfOptions from "@/actions/get-acf-options";

import Ticker from "@/components/ticker/ticker";
import Banner from "@/components/banner/banner";
import CheckoutCart from "./components/checkout-cart";
import CheckoutForm from "./components/checkout-form";


export async function generateMetadata() {
  return {
    title: "Оформление заказа",
    description: "Страница оформления заказа",
  }
} 

const Checkout = async () => {
  const siteOptions = await getAcfOptions();
  return (
    <>
      <section>
        <h1 className="mb-10 uppercase">Оформление заказа</h1>
        <div className="grid lg:grid-cols-7 gap-6 lg:gap-10 2xl:gap-12">
          <CheckoutForm />
          <CheckoutCart />
        </div>
      </section>
      <Ticker />
      {/* <Listing data={listing} title="Вам также понравится" />*/}
      <Banner data={siteOptions?.acf?.bannery} />
      {/* <Listing data={listing} title="Смотрите также" /> */}
    </>
  );
}

export default Checkout;
