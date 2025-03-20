// Функция для получения количества товаров на основе фильтров
const getProductsCount = async (params: string): Promise<{ count: number }> => {
    try {
        const response = await fetch(`https://admin.limited-kicks.ru/wp-json/custom-woocommerce/v1/product-count?${params.toString()}`, {
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