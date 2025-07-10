import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  action: {
    type: String,
    default: 'created'
  }
}, { timestamps: true });

export default mongoose.model('News', newsSchema);
