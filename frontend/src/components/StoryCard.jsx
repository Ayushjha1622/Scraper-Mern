import React from 'react';

const StoryCard = ({
  story,
  onBookmark,
  isBookmarked,
}) => {
  return (
    <div className="story-card">
      <h3>{story.title}</h3>

      <div className="story-meta">
        <p>
          <strong>Points</strong>
          {story.points || 0}
        </p>

        <p>
          <strong>Author</strong>
          {story.author || 'Anonymous'}
        </p>
        
        <p style={{ gridColumn: 'span 2' }}>
          <strong>Published</strong>
          {story.postedAt || 'Recently'}
        </p>
      </div>

      <div className="story-actions">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Article →
        </a>

        <button
          onClick={() => onBookmark(story._id)}
          className={isBookmarked ? 'active' : ''}
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
