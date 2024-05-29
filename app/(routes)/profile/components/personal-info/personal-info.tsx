'use client';
import { User } from "@/types";
import ChangeUserInfo from "./components/change-user-info";
import ChangeUserPassword from "./components/change-user-password";

interface IPersonalInfo {
  user: User;
}
const PersonalInfo: React.FC<IPersonalInfo> = ({ user }) => {


  return (
    <div>
      <h1 className="mb-8 uppercase">Личная информация</h1>
      <ChangeUserInfo user={user} />
      {/* <ChangeUserPassword user={user} /> */}
    </div>
  );
}

export default PersonalInfo;