import { fetchWooCommerce } from '@/lib/utils';
import { Attribute } from '@/types';

const getAttributes = async (id: number): Promise<Attribute[]> => {
    const allTerms: Attribute[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const res: Attribute[] = await fetchWooCommerce(`products/attributes/${id}/terms?per_page=100&page=${page}`);
        allTerms.push(...res);

        if (res.length < 100) {
            hasMore = false;
        } else {
            page += 1;
        }
    }

    return allTerms;
};

export default getAttributes;