import axios from "axios";

import * as cheerio from "cheerio";

import Story from "../models/Story.js";

const HN_URL =
  "https://news.ycombinator.com";


const scrapeStories =
  async () => {
    try {
      console.log('Scraping stories...');



      const { data } =
        await axios.get(HN_URL);



      const $ = cheerio.load(data);


      const stories =
        $(".athing")
          .slice(0, 10)
          .toArray();


      for (const story of stories) {
        const title =
          $(story)
            .find(".titleline a")
            .text()
            .trim();
        console.log(
          `Saved: ${title}`
        );

        let url =
          $(story)
            .find(".titleline a")
            .attr("href");


        if (
          url &&
          url.startsWith("item?")
        ) {
          url = `${HN_URL}/${url}`;
        }



        const subtext =
          $(story).next();


        const pointsText =
          subtext
            .find(".score")
            .text()
            .trim();

        const points =
          parseInt(pointsText) || 0;


        const author =
          subtext
            .find(".hnuser")
            .text()
            .trim() || "Unknown";

        const postedAt =
          subtext
            .find(".age")
            .text()
            .trim() || "Unknown";

        await Story.findOneAndUpdate(
          { url },
          {
            title,
            url,
            points,
            author,
            postedAt,
          },
          {
            upsert: true,
            new: true,
          }
        );
      }

      console.log(`Stories Scraped Successfully`);
    } catch (error) {
      console.error(`SCRAPER ERROR ${error.message}`);
    }
  };

export default scrapeStories;