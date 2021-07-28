import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tweet } from "react-twitter-widgets";

const Content = ({ data }) => {
  const [tweets, setTweets] = useState(data.docs);
  const [hasMore, setHasMore] = useState(data.hasNextPage);
  const [localData, setLocalData] = useState(data);

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const getMoreTweet = async () => {
    const res = await fetch(`/api/tweets?page=${localData.nextPage}`);
    let response = await res.json();

    let newTweets = response.data;

    setLocalData(newTweets);
    setHasMore(newTweets.hasNextPage);
    const tempNewTweets = newTweets.docs;
    for (var i = 0; i < tempNewTweets.length; i++) {
      console.log(i);
      setTweets((tweet) => [...tweet, tempNewTweets[i]]);
      await timer(1000); // then the created Promise can be awaited
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={tweets.length}
        next={getMoreTweet}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {tweets.map((row) => (
          <div key={row.id}>
            <Tweet tweetId={row.id} />
          </div>
        ))}
      </InfiniteScroll>
      <style jsx>
        {`
          .back {
            padding: 10px;
            background-color: dodgerblue;
            color: white;
            margin: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Content;
