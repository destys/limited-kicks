import { AcfOptions } from "@/types";

const URL = `${process.env.WP_ADMIN_REST_URL}/acf/v3/options/options`;

const getAcfOptions = async (): Promise<AcfOptions> => {
    const res = await fetch(`${URL}`, {
        next: { revalidate: 10 }
    });

    return res.json();
};

export default getAcfOptions;