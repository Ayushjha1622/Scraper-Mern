import Story from "../models/Story.js";

import User from "../models/User.js";

export const getStories =
  async (req, res) => {
    try {
      const stories =
        await Story.find().sort({
          points: -1,
        });

      res.status(200).json(
        stories
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch stories",
      });
    }
  };

export const getSingleStory =
  async (req, res) => {
    try {
      const story =
        await Story.findById(
          req.params.id
        );

      if (!story) {
        return res.status(404).json({
          message:
            "Story not found",
        });
      }

      res.status(200).json(
        story
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch story",
      });
    }
  };

export const toggleBookmark =
  async (req, res) => {
    try {
      const storyId =
        req.params.id;

      const user =
        await User.findById(
          req.user._id
        );

      const alreadyBookmarked =
        user.bookmarks.includes(
          storyId
        );

      if (alreadyBookmarked) {
        user.bookmarks =
          user.bookmarks.filter(
            (id) =>
              id.toString() !==
              storyId
          );

        await user.save();

        return res.status(200).json({
          message:
            "Bookmark removed",
          bookmarks:
            user.bookmarks,
        });
      }

      user.bookmarks.push(
        storyId
      );

      await user.save();

      res.status(200).json({
        message:
          "Bookmark added",
        bookmarks:
          user.bookmarks,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Bookmark operation failed",
      });
    }
  };

export const getBookmarks =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).populate("bookmarks");

      res.status(200).json(
        user.bookmarks
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch bookmarks",
      });
    }
  };