import { useQuery } from "@tanstack/react-query"
import { getUserRetweets } from "../api/tweets"
import { toast } from "react-hot-toast"
import Loader from "./Loader"
import Tweet from "./Tweet"

const MyRetweets = ({ user }) => {

  const { data: retweets, isLoading, isError, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getUserRetweets(user.username),
  })

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (
    <>
      {retweets.map && retweets.map(t => (
        <Tweet key={t.id} t={t} />
      ))}
    </>
  );
};
 
export default MyRetweets;