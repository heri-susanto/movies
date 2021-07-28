import mongoose from "mongoose";
// const mongoosePaginate =("mongoose-paginate-v2");
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  author_id: {
    type: String,
    required: [true, "Please provide author_id."],
  },
  id: {
    type: String,
    required: [true, "Please provide id."],
  },
  text: {
    type: String,
    required: [true, "Please provide text."],
  },
  attachments: {
    media_keys: {
      type: Array,
    },
  },
});

TweetSchema.plugin(mongoosePaginate);

global.TweetSchema = global.TweetSchema || mongoose.model("video", TweetSchema);
export default global.TweetSchema;
