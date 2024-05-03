import { fetchWooCommerce } from '@/lib/utils';
import { Attribute } from '@/types';



const getAttributes = async (id: number): Promise<Attribute[]> => {
    const res = await fetchWooCommerce(`products/attributes/${id}/terms`);
    return res;
}

export default getAttributes