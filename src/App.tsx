import axios from "axios";
import { useState } from "react";
import "./App.css";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

export default function App() {
  const [UserProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const onClickFetchUser = () => {
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data)
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      {UserProfiles.map((user)=>(
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

