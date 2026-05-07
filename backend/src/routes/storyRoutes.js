import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
} from "../controllers/StoryController.js";

const router = express.Router();

router.get("/", getStories);

router.get(
  "/bookmarks/me",
  protect,
  getBookmarks
);

router.get(
  "/:id",
  getSingleStory
);

router.post(
  "/:id/bookmark",
  protect,
  toggleBookmark
);

export default router;