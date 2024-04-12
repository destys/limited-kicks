"use client";
import { User } from "@/types";

import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import useUser from "@/hooks/use-user";
import getUser from "@/actions/get-user";

import Sidebar from "./components/sidebar/sidebar";
import PersonalInfo from "./components/personal-info/personal-info";
import OrderHistory from "./components/order-history/order-history";
import Addresses from "./components/addresses/addresses";
import Payments from "./components/payments/payments";
import Discount from "./components/discount/discount";
import Loader from "@/components/ui/loader/loader";

const Profile = () => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { jwtToken } = useUser();

    useEffect(() => {
        const FetchData = async () => {
            if (jwtToken) {
                try {
                    setLoading(true);
                    setError(false);
                    const userData = await getUser(jwtToken);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                    router.push('/auth');
                } finally {
                    setLoading(false);
                }
            }
        }
        FetchData();
    }, [jwtToken, router]);

    const [activeIndex, setActiveIndex] = useState(0);

    const handleActiveTab = (e: SetStateAction<number>) => {
        setActiveIndex(e);
    };


    return (
        <section className="relative">
            {loading && <Loader />}
            <div className="lg:grid lg:grid-cols-[335px_1fr] xl:grid-cols-[535px_1fr] ">
                <Sidebar onChangeActiveTab={handleActiveTab} userName={user?.first_name} />
                {user && <div className="lg:pl-10 xl:pl-20">
                    {activeIndex === 0 && <PersonalInfo user={user} />}
                    {activeIndex === 1 && <OrderHistory />}
                    {activeIndex === 2 && <Addresses />}
                    {activeIndex === 3 && <Payments />}
                    {activeIndex === 4 && <Discount totalAmount={37568 || 0} />}
                </div>}
            </div>
        </section>
    );
}
export default Profile;