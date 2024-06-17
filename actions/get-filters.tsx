import axios from "axios";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 секунда

// Функция для построения URL с параметрами
const buildUrlWithParams = (baseUrl: string | URL, params: { [x: string]: string; }) => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
};

// Функция для задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для получения фильтров с повторными попытками
const getFilters = async (params: {}) => {
    const baseUrl = `${process.env.WP_ADMIN_REST_URL}/custom/v1/filters`;
    const apiUrl = buildUrlWithParams(baseUrl, params);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error: { response: { status: number; }; } | any) {
            if (attempt === MAX_RETRIES || !error.response || error.response.status !== 500) {
                console.error('Error fetching filters:', error);
                throw error;
            } else {
                console.warn(`Attempt ${attempt} failed. Retrying in ${RETRY_DELAY / 1000} seconds...`);
                await delay(RETRY_DELAY);
            }
        }
    }
};

export default getFilters;
