import app from "./app.js";
import connectDB from "./config/db.js";
import scrapeStories from "./services/ScraperService.js";

connectDB();
scrapeStories();


const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});