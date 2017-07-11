import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  email: { type: String, lowercase: true, index: true },
  external_email: { type: String, lowercase: true, index: true },
  username: String,
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: { type: String, select: false },
  provider: String,
  salt: String,
  first: String,
  last: String,
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  rank: { type: Number, default: 0 },
  phone: { type: String, index: true },
  outgoingPhone: { type: String, index: true },
  pin: Number,
  bio: String,
  review_header: String,
  review_body: String,
  signature: String,
  region: Object,
  callSID: { type: String, index: true },
  callMobile: {
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    phone: String
  },
  gmail: {
    refreshToken: String,
    email: { type: String, index: true, lowercase: true },
    lastUpdated: Date
  },
  smtp: {
    user: String,
    password: String,
    host: String,
    port: Number,
    tls: Boolean
  },
  imap: {
    user: String,
    password: String,
    host: String,
    port: Number,
    tls: Boolean
  },
  annualSalesGoal: Number,
  date: {
    last_active: { type: Date, default: null }
  },
  communities: [{
    type: Schema.Types.ObjectId, ref: 'Community'
  }]
}, { collection: 'users' });

AgentSchema.virtual('profile').get(function () {
  return {
    name: this.name,
    role: this.role
  };
});

export default mongoose.model('Agent', AgentSchema);
