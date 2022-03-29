import { VFC } from "react";
import { UserProfile } from "../types/userProfile"

type Props = {
    user: UserProfile;
    // 型を呼び出す
};

export const UserCard: VFC<Props> = (props) => {
  // 型を確認
    const { user } = props;
    // 渡されたpropsの値からuserを取り出す
    
    const style = {
      border: "solid 1px #ccc",
      borderRadius: "8px",
      padding:"0 16px",
      margin: "8px"
    }

  return (
    <div style={style}>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>メール</dt>
        <dd>{user.email}</dd>
        <dt>住所</dt>
        <dd>{user.address}</dd>
      </dl>
    </div>
  );
};
