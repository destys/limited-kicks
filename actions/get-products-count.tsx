// Функция для получения количества товаров на основе фильтров
const getProductsCount = async (params: string): Promise<{ count: number }> => {
    try {
        const response = await fetch(`${process.env.WP_ADMIN_REST_URL}/custom-woocommerce/v1/products/count?${params.toString()}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product count: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Предполагается, что ответ содержит { count: number }
    } catch (error) {
        console.error('Failed to fetch product count:', error);
        throw new Error('Error fetching product count');
    }
};

export default getProductsCount;