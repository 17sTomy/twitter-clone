import { getTweet } from '../api/tweets';
import { useParams } from 'react-router-dom';
import { useQuery} from '@tanstack/react-query'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Comments from '../components/Comments';
import Tweet from '../components/Tweet';

const OneTweet = () => {
  const { id } = useParams();

  const { data: tweet, isLoading, isError, error } = useQuery({
    queryKey: ["oneTweet", id],
    queryFn: () => getTweet(id),
  });

  if(isLoading) return <Loader/>
  if(isError) return toast.error(error.message);

  return (
    <>
      <Tweet key={tweet.id} t={tweet} />
      <Comments tweet={tweet} />
    </>
  );
};

export default OneTweet;