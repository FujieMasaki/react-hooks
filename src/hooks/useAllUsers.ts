// 全ユーザー一覧を取得するカスタムフック
import axios from "axios";
import { useState } from "react";
import { User } from "../types/api/user";
import { UserProfile } from "../types/userProfile";

export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
//   stateの箱を用意
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    //   App.tsxのonClickFetchUserが発火したら呼び出される
    setLoding(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
    //   型を反映する
      .then((res) => {
        const data = res.data.map((user) => ({
        // 取った値を変換をかけてデータを回す
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data);
        // 最後にdataを引数で渡す。そしてuserProfilesが更新される
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoding(false);
        // 終わったらローディングが消える
      });
  };

  return { getUsers, userProfiles, loading, error };
};
