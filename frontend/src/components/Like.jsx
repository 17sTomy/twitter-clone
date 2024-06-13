import { AiFillHeart } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { likeTweet } from "../api/tweets";

const Like = ({ t }) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <span>
        {t.iliked ? (
          <AiFillHeart
            onClick={() => likeMutation.mutate(t.id)}
            color="red"
            size={20}
          />
        ) : (
          <IoMdHeartEmpty 
            onClick={() => likeMutation.mutate(t.id)} 
            size={20} 
          />
        )}
      </span>
      <p>{t.likes_count}</p>
    </>
  );
};

export default Like;
