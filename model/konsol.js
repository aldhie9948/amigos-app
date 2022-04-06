import mongoose from 'mongoose';

const konsolSchema = new mongoose.Schema({
  type: { required: true, type: String },
  isActive: { required: true, type: Boolean },
  name: String,
  start: Number,
  end: Number,
  price: Number,
});

konsolSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports =
  mongoose.models.Konsol || mongoose.model('Konsol', konsolSchema);
