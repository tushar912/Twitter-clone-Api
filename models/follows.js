const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema ({
    followee: {
        type: Schema.Types.ObjectId,
        ref: "User",
       required: true
   },
   follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
       required: true
   }
})
module.exports = mongoose.model('Follow',followSchema);
