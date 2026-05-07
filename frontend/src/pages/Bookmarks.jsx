import API from "../api/axios";

import Navbar from "../components/Navbar";

import StoryCard from "../components/StoryCard";

import { useAuth } from "../context/AuthContext";

const Bookmarks = () => {
  const {
    bookmarks,
    fetchBookmarks,
  } = useAuth();

  const handleBookmark =
    async (storyId) => {
      try {
        await API.post(
          `/stories/${storyId}/bookmark`
        );

        fetchBookmarks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1>
          My Bookmarks
        </h1>

        {bookmarks.length === 0 ? (
          <div className="empty-state">
            <h3>
              No bookmarks yet
            </h3>
          </div>
        ) : (
          <div className="stories-grid">
            {bookmarks.map(
              (story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  onBookmark={
                    handleBookmark
                  }
                  isBookmarked={
                    true
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
