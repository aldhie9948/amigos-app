import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  type: { required: true, type: String },
  name: { required: true, type: String },
  price: { required: true, type: Number },
});

menuSchema.set("toJSON", {
  transform: (doc, object) => {
    object.id = object._id;
    delete object._id;
    delete object.__v;
  },
});

module.exports = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
