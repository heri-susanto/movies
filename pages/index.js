// import Content from "./Content";
import { useState, useEffect } from "react";
import { getTweets } from "./api/tweets";
import ReactPaginate from "react-paginate";
import { Tweet } from "react-twitter-widgets";


export default function Home( {data} ) {
  const [localData, setLocalData] = useState(data)

  // totalDocs: 14248,
  // limit: 30,
  // totalPages: 475,
  // page: 1,
  // pagingCounter: 1,
  // hasPrevPage: false,
  // hasNextPage: true,
  // prevPage: null,
  // nextPage: 2

  const [tweets, setTweets] = useState(localData.docs);

  // dibawah sini ada property bawaan sih
  const pageCount = data.totalPages;

  const displayTweets = tweets.map((tweet) => {
    return (
      <div key={tweet._id}>
        <Tweet tweetId={tweet.id} />
      </div>
    );
  });
  // const changePage = ({ selected }) => {

  //   // disini dijalankan abis panggi ke backend
  //   setTweets([])

  //   console.log(selected, "ini adalah selected")
  //   setPageNumber(selected);
  // };

  const changePage = async ({selected}) => {
    const changeTo = selected + 1
    const res = await fetch(`/api/tweets?page=${changeTo}`);
    let response = await res.json();
    let newTweets = response.data;
    setLocalData(newTweets);
    const tempNewTweets = newTweets.docs;
    setTweets(tempNewTweets)
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tweets])

  return (
    <>
      {/* <div>
        <Content data={props.data} />
      </div> */}
      {displayTweets}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const options = {
    page: 1,
    limit: 30,
    collation: {
      locale: "en",
    },
  };

  let data = await getTweets(options);
  data = JSON.parse(JSON.stringify(data));
  console.log(data, "INI ADALAH DATAAAAAA")
  return {
    props: { data },
  };
};
