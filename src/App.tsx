import axios from "axios";
import { useState } from "react";
import "./App.css";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

export default function App() {
  const [UserProfiles, setUserProfiles] =
  useState<Array<UserProfile>>([]);

  const [loading,setLoding] = useState(false);
  const [error,setError] = useState(false);

  const onClickFetchUser = () => {
    setLoding(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      }).catch(()=>{
        setError(true);
      })
      .finally(() => {
        setLoding(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color:"red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Lodding...</p>
      ) : (
        <>
      {UserProfiles.map((user)=>(
        <UserCard key={user.id} user={user} />
        ))}
        </>
      )}
    </div>
  );
};

