import { wooApi } from "@/lib/wc-rest-api";
import { Products } from "@/types";

const addToCart = async (query?: {}): Promise<Products[]> => {
    const res = await wooApi.post('cart/add', query);
    console.log('res: ', res);

    return res.data;
};

export default addToCart;