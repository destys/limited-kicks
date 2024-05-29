import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import useUser from "@/hooks/use-user";
import { User } from "@/types";

interface ISidebar {
  onChangeActiveTab: (e: any) => void;
  userName: string | undefined;
}

const Sidebar: React.FC<ISidebar> = ({ onChangeActiveTab, userName }) => {
  const [activeTab, setActivetab] = useState(0);
  const { logout } = useUser();
  const router = useRouter();

  const links = [
    {
      id: 0,
      title: "Личная информация",
      icon: "Profile",
    },
    {
      id: 1,
      title: "Мои заказы",
      icon: "Orders",
    },
    {
      id: 2,
      title: "Мои адреса",
      icon: "Address",
    },
    /* {
      id: 3,
      title: "Способ оплаты",
      icon: "Payments",
    }, */
    {
      id: 4,
      title: "Дисконтная программа",
      icon: "Discount",
    },
  ];

  const handleSetActiveTab = (e: SetStateAction<number>) => {
    setActivetab(e);
    onChangeActiveTab(e);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth')
  }

  return (
    <div className="mb-3 pb-3 lg:mb-0 lg:pb-0">
      <div className="flex items-center gap-10 mb-6">
        <Image
          src={"/images/avatar.jpg"}
          alt="avatar"
          width={76}
          height={76}
          className="rounded-lg"
        />
        {userName ? (
          <h3>
            <span>Добрый день, </span>
            <span>{userName}</span>
          </h3>
        ) : (<h3>
          <span>Добрый день</span>
        </h3>
        )}
      </div>
      <div className="flex items-center lg:grid gap-1 max-lg:overflow-x-scroll">
        {links.map((item, index) => (
          <button
            key={item.id}
            className={`flex items-center gap-5 xl:gap-10 py-3 px-5 md:py-4 md:px-7 xl:py-6 xl:px-10 rounded-lg transition-colors hover:bg-add_2 hover:text-white lg:hover:bg-add_1_hv lg:hover:text-black  whitespace-nowrap lg:whitespace-normal text-left text-xs sm:text-xs md:text-base ${activeTab === index &&
              " bg-add_2 text-white lg:bg-add_1 lg:text-black"
              }`}
            onClick={() => handleSetActiveTab(index)}
          >
            <div className="hidden lg:block lg:basis-[24px]">
              <Image
                src={`/icons/Icon/${item.icon}.svg`}
                alt={`icon ${item.title}`}
                width={28}
                height={28}
              />
            </div>

            <span>{item.title}</span>
          </button>
        ))}
        <button
          className={`flex items-center gap-5 xl:gap-10 py-3 px-5 md:py-4 md:px-7 xl:py-6 xl:px-10 rounded-lg transition-colors hover:bg-add_1_hv`}
          onClick={() => handleLogout()}
        >
          <div className="basis-[24px]">
            <Image
              src={`/icons/Icon/Exit.svg`}
              alt={`icon Exit`}
              width={28}
              height={28}
            />
          </div>
          <span>Выход</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;