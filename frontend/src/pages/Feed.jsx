import { getTweets } from "../api/tweets"
import { AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from "react-hot-toast";

const Feed = () => {
  const { ref, inView } = useInView()

  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: ['tweets'],
      queryFn: getTweets,
      getNextPageParam: (lastPage) => lastPage.meta.next
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    };
  }, [inView]);

  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Feed;