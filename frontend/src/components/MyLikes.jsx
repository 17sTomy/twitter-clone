import { useQuery } from "@tanstack/react-query"
import { getUserLikes } from "../api/tweets"
import { toast } from "react-hot-toast"
import Loader from "./Loader"
import Tweet from "./Tweet"

const MyLikes = ({ user }) => {

  const { data: likes, isLoading, isError, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getUserLikes(user.username),
  })

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (
    <>
      {likes.map && likes.map(t => (
        <Tweet key={t.id} t={t} />
      ))}
    </>
  );
};
 
export default MyLikes;