const MyMedia = ({ tweets }) => {
  return (
    <>
      {tweets.map && tweets.map(t => (
        <div key={t.id} className="flex flex-row items-start gap-3">
          <img src={t.image} />
        </div>
      ))}
    </>
  );
};

export default MyMedia;