import { logoutReq } from "../api/users";

const Feed = () => {
    return (
      <div>
        <button onClick={logoutReq}>Logout</button>
      </div>
    );
};

export default Feed;