import Ticker from "@/components/ticker/ticker";
import CheckoutCart from "./components/checkout-cart";
import CheckoutForm from "./components/checkout-form";


export default function Checkout() {

  return (
    <>
      <section>
        <h1 className="mb-10 uppercase">Оформление заказа</h1>
        <div className="2xl:grid 2xl:grid-cols-7 2xl:gap-12">
          <CheckoutForm />
          <CheckoutCart />
        </div>
      </section>
      <Ticker />
      {/* <Listing data={listing} title="Вам также понравится" />
      <Banner data={ } />
      <Listing data={listing} title="Смотрите также" /> */}
    </>
  );
}
