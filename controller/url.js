import { nanoid } from "nanoid";
import URL from "../URLModel.js";

/**
 * Handles the creation of a new shortened URL.
 * Workflow:
 *  - Checks if `req.body.url` exists; returns an error if missing.
 *  - Generates an 8-character unique shortId using nanoid.
 *  - Stores the shortId, URL, and an empty visitHistory in the database.
 *  - Sends the generated shortId as a JSON response.
 * 
 * Useful for creating and managing shortened URLs.
 */
const handleGenerateNewShortURL = (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!" });
  const shortId = nanoid(8);
  URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.json({ id: shortId });
};


/**
 * Redirects to the original URL based on the shortened URL.
 * Workflow:
 *  - Filters the database for the document with the matching shortId.
 *  - Updates the visitHistory array by pushing the current (visited time & date) timestamp.
 *  - Sends the user to the original redirect URL stored in the database.
 * 
 * Useful for maintaining analytics while seamlessly redirecting users.
 */
const redirectToURL = (req, res) => {
  const shortId = req.params.shortId;
  URL.findOneAndUpdate(
    // Filter to find the document by shortId
    { shortId },
    // Update operation to push the current timestamp into visitHistory
    { $push: { visitHistory: { timestamp: Date.now() } } }
  )
    // Data is new updated entry
    .then((data) => res.redirect(data.redirectURL));
};

/**
 * Retrieves and returns analytics for a shortened URL.
 * 
 * This function accepts a shortId from the URL parameters, fetches the corresponding data from the database,
 * and processes the visit history to generate a list of formatted date and time values. It then returns a JSON
 * response containing:
 *  - The original redirect URL
 *  - The total number of visits
 *  - A formatted list of visit timestamps with date and time
 * 
 * Workflow:
 *  - Retrieves the URL data using the provided shortId.
 *  - Processes the visitHistory array to extract and format each visit's timestamp.
 *  - Sends a response containing the original URL, visit count, and formatted visit times.
 * 
 * Useful for tracking how often and when a specific shortened URL has been accessed.
 */
const analyticOfLink = (req, res) => {
  const shortId = req.params.shortId;

  URL.findOne({ shortId })
  .then((data) => {
    let timeDate = [];

    // Process each timestamp in the visitHistory to format date and time
    data.visitHistory.map((item) => {
      const date = new Date(item.timestamp);
      timeDate.push({
        Date: date.toLocaleDateString(),
        Time: date.toLocaleTimeString(),
      });
    });

    // Respond with the original URL, visit count, and formatted timestamps
    res.send({
      "Link": data.redirectURL,
      "Visits": data.visitHistory.length,
      "TimeDate": timeDate
    });
  })
  .catch(error =>res.status(404).json(error))
};


export default { handleGenerateNewShortURL, redirectToURL, analyticOfLink };
