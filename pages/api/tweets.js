import dbConnect from "../../lib/dbConnect";
import connectDB from "../../middleware/mongodb";
import Tweet from "../../models/Tweet";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function getTweets(options, query) {
  await dbConnect();
  const tweets = await Tweet.paginate(query, options);
  return tweets;
}

async function handler(req, res) {
  const { method, query } = req;
  await runMiddleware(req, res, cors);

  switch (method) {
    case "GET":
      // ini dibikin function dibawahnya
      const page = query?.page || 1;
      const options = {
        page,
        limit: 30,
        collation: {
          locale: "en",
        },
        sort: {
          id: 1
        }
      };

      try {
        const tweets = await getTweets(options);
        res.status(200).json({ success: true, data: tweets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
export default connectDB(handler);
