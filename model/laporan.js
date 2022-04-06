import mongoose from "mongoose";

const laporanSchema = new mongoose.Schema({
  type: String,
  item: Object,
  total: Number,
  qty: Number,
  date: String,
  time: Number,
});

laporanSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

module.exports =
  mongoose.models.Laporan || mongoose.model("Laporan", laporanSchema);
