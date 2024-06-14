import Loader from "./Loader";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserTweets, deleteTweet } from "../api/tweets";
import Tweet from "./Tweet";

const MyTweets = ({ user }) => {
  const queryClient = useQueryClient();

  const deleteTweetMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", user.username])
      toast.success("Tweet deleted")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tweets", user.username],
    queryFn: () => getUserTweets(user.username),
  });

  if (deleteTweetMutation.isLoading) return <Loader/>
  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  return (
    <>
      {data.map && data.map(t => (
        <Tweet key={t.id} t={t} />
      ))}
    </>
  );
};

export default MyTweets;