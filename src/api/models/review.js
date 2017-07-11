import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const ReviewSchema = new Schema({
  general_feedback: {
    type: Number,
    validate: isNumber,
    required: true
  },
  local_knowledge: {
    type: Number,
    validate: isNumber,
    required: true
  },
  process_expertise: {
    type: Number,
    validate: isNumber,
    required: true
  },
  responsiveness: {
    type: Number,
    validate: isNumber,
    required: true
  },
  negotiation_skills: {
    type: Number,
    validate: isNumber,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  service_provided: {
    type: String,
    required: true
  },
  primary_point_of_contact: {
    type: String,
    required: true
  },
  years_of_service: {
    type: Number,
    validate: isNumber,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Review', ReviewSchema);
