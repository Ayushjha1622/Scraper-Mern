import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { bookmarks, fetchBookmarks } = useAuth();

  useEffect(() => {
    fetchStories(1);
  }, []);

  const fetchStories = async (pageNum) => {
    try {
      if (pageNum === 1) setLoading(true);
      const { data } = await API.get(`/api/stories?page=${pageNum}&limit=10`);
      
      // Handle both { stories: [...] } and [...] formats
      const newStories = Array.isArray(data) ? data : (data.stories || []);
      
      if (pageNum === 1) {
        setStories(newStories);
      } else {
        setStories(prev => [...prev, ...newStories]);
      }
      
      setHasMore(newStories.length === 10);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStories(nextPage);
  };

  const handleBookmark = async (storyId) => {
    try {
      await API.post(`/api/stories/${storyId}/bookmark`);
      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="loader">Loading stories...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="stories-grid">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onBookmark={handleBookmark}
              isBookmarked={bookmarks.some(
                (bookmark) => bookmark._id === story._id
              )}
            />
          ))}
        </div>

        {hasMore && stories.length > 0 && (
          <div className="pagination-container">
            <button onClick={handleLoadMore} className="load-more-btn">
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
