import { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalStateContext } from "../../globalState/GlobalStateProvider";

export function MenuView() {
  const { user } = useContext(GlobalStateContext);
  console.log({ user });

  return (
    <div className="menu">
      {user ? (
        <span>@{user.username} | Logout</span>
      ) : (
        <Link to="/register">Join</Link>
      )}
    </div>
  );
}
