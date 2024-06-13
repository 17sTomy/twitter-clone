import { getTweets } from "../api/tweets"
import { useQuery } from '@tanstack/react-query'
import Loader from '../components/Loader';
import { toast } from "react-hot-toast";
import AddTweet from "../components/AddTweet";
import Tweet from "../components/Tweet";

const Feed = () => {
  
  const { data, isLoading, isError, error } = useQuery({
      queryKey: ['tweets'],
      queryFn: getTweets,
    }
  );

  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">
                Home
              </p>
            </div>
          </div>
        </div>
      </div>
      <AddTweet/>
        <div>
          {data.map(t => (
            <Tweet key={t.id} t={t} />
          ))}
        </div>
    </>
  );
};

export default Feed;