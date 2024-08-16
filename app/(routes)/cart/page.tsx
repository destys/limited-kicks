import CartContent from "./components/cart-content";

export async function generateMetadata() {
  return {
    title: "Корзина",
    description: "Страница корзины",
  }
}

export default function Cart() {
  return (
    <div className="flex flex-col justify-center items-center min-h-80">
      <h1 className="mb-10 text-center uppercase  ">Корзина</h1>
      <CartContent />
    </div>
  );
}

