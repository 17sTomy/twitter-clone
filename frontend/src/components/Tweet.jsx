import { AiOutlineMessage } from 'react-icons/ai';
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Retweet from "../components/Retweet";
import Like from "../components/Like";
 
const Tweet = ({ t, deleteTweetMutation }) => {
  return (
    <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${t.avatar}`} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              <Link to={`/${t.user}`}>
                {t.name}
              </Link>
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{t.user}
            </span>
            <span className="text-neutral-500 text-sm">
              {new Date(t.created_at).toDateString().slice(4)}
            </span>
          </div>
          <Link to={`/tweet/${t.id}`}>
            <div className="text-white mt-1 mb-2 text-start">
              {t.content}
            </div>
          </Link>
          <img src={t.image} />
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <Link to={`/tweet/${t.id}`}>
                <AiOutlineMessage size={20} />
              </Link>
              {t.comments_count}
            </div>
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
              <Retweet t={t} />
            </div>
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <Like t={t} />
            </div>
            {deleteTweetMutation && (
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <BsFillTrashFill onClick={() => deleteTweetMutation.mutate(t.id)} size={17} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
