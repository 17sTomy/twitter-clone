import { AiOutlineRetweet } from "react-icons/ai";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { retweetTweet } from "../api/tweets";

const Retweet = ({ t }) => {
  const queryClient = useQueryClient();

  const rtMutation = useMutation({
    mutationFn: retweetTweet,
    onSuccess: () => {
      queryClient.invalidateQueries("tweets");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <AiOutlineRetweet
        size={20}
        onClick={() => rtMutation.mutate(t.id)}
        {...(t.iretweeted ? { color: "green" } : { color: "" })}
        />
      <p>{t.retweets_count}</p>
    </>
  );
};

export default Retweet;
