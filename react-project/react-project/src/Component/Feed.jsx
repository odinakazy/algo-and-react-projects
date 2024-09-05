import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { FixedSizeList as List } from "react-window";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner";
import ErrorComponent from "./ErrorComponent";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const POSTS_PER_PAGE = 10;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true); // Loading state for initial fetch
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for subsequent fetches
  const [error, setError] = useState(null);
  const observer = useRef();

  //   fetching post from Api
  const fetchPosts = useCallback(async () => {
    setLoadingMore(true); // Set loading for additional posts
    try {
      const response = await axios.get(API_URL, {
        params: {
          _page: page,
          _limit: POSTS_PER_PAGE,
        },
      });
      const newPosts = response.data;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
      setLoadingMore(false);
    } catch {
      setError("Failed to load posts");
      setLoadingMore(false);
    }
  }, [page]);

  // using useeffect hook to call the fecthpost function on initial loading
  useEffect(() => {
    fetchPosts().finally(() => setLoadingInitial(false)); // Set initial loading to false after the first fetch
  }, [fetchPosts]);

  // lastpostref function to know when you scroll to the last post which is observe by intersection observer api to load nmore post
  const lastPostRef = useCallback(
    (node) => {
      if (loadingMore || loadingInitial) return; // Skip intersection if loading
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, loadingInitial, hasMore]
  );

  return (
    // jsx for the user interface
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
        {loadingInitial && <LoadingSpinner />}
        {error && <ErrorComponent message={error} />}

        <List
          height={window.innerHeight}
          itemCount={posts.length}
          itemSize={150}
          width="100%"
        >
          {({ index, style }) => {
            const post = posts[index];
            if (index === posts.length - 1) {
              return (
                <div ref={lastPostRef} style={style} className="mb-4">
                  <Post post={post} />
                </div>
              );
            }
            return (
              <div style={style} className="mb-4">
                <Post post={post} />
              </div>
            );
          }}
        </List>
        {loadingMore && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Feed;
