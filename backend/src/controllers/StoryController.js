import Story from "../models/Story.js";

import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

export const getStories =
  asyncHandler(
    async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const stories = await Story.find()
        .sort({ points: -1 })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        stories,
      });
    }
  );

export const getSingleStory =
  asyncHandler(
    async (req, res) => {
      const story =
        await Story.findById(
          req.params.id
        );

      if (!story) {
        res.status(404);

        throw new Error(
          "Story not found"
        );
      }

      res.status(200).json(
        story
      );
    }
  );

export const toggleBookmark =
  asyncHandler(
    async (req, res) => {
      const storyId =
        req.params.id;

      const user =
        await User.findById(
          req.user._id
        );

      const alreadyBookmarked =
        user.bookmarks.some(
          (bookmark) =>
            bookmark.toString() ===
            storyId
        );

      if (alreadyBookmarked) {
        user.bookmarks =
          user.bookmarks.filter(
            (bookmark) =>
              bookmark.toString() !==
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
    }
  );

export const getBookmarks =
  asyncHandler(
    async (req, res) => {
      const user =
        await User.findById(
          req.user._id
        ).populate("bookmarks");

      res.status(200).json(
        user.bookmarks
      );
    }
  );