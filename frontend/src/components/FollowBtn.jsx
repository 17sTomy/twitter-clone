import { follow } from "../api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FollowBtn = ({ user, page }) => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
    onError: () => {
      toast.error(error.message);
    }
  });

  return (
    <>
      {page ? (
        <button 
        onClick={() => followMutation.mutate(user.username)}
        className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-sky-600 transition">
        {user.i_follow ? "Unfollow" : "Follow"} 
        </button>
      ) : (
        <button 
        onClick={() => followMutation.mutate(user.username)}
        className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5 transition">
        {user.i_follow ? "Unfollow" : "Follow"}
        </button>
      )}
    </>
  );
};

export default FollowBtn;