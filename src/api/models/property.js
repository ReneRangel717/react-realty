import mongoose from 'mongoose';
import fs from 'fs';
import Transformer from 'plus.transformer';
import moment from 'moment';

const codes = fs.readFileSync(`${__dirname}/../helpers/state_phone_codes.json`, 'utf8');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  mls: String,
  mlsid: { type: String, index: true },
  address: String,
  region: String,
  city: String,
  zip: String,
  state: String,
  type: String,
  remarks: String,
  sqft: { type: Number, index: true },
  beds: { type: Number, index: true },
  baths_full: { type: Number, index: true },
  baths_half: { type: Number, index: true },
  price: { type: Number, index: true },
  piccount: { type: Number, index: true },
  acres: Number,
  style: String,
  status: { type: String, index: true },
  garages: Number,
  levels: Number,
  school_elem: String,
  school_middle: String,
  school_high: String,
  list_agent: String,
  list_company: String,
  list_office: String,
  year_built: Number,
  tax_url: String,
  tax_amount: Number,
  tax_year: Number,
  taxid: String,
  hoa_amount: Number,
  hoa_term: String,
  features: Object,
  room_sizes: Object,
  alertScanned: Boolean,
  image_url: String,
  zero_results: Boolean,
  street_visible: Boolean,
  for: String,
  view_counter: { type: Number, default: 0, index: true },
  agents: Array,
  date: {
    listed: Date,
    updated: Date,
    generated_at: { type: Date, index: true }
  },
  price_history: [{
    Date,
    Price: Number
  }],
  listing_agent: {
    phone: String
  },
  sold: {
    price: String,
    date: Date,
    ratio: Number
  },
  meta: Object,
  community: String,
  coordinates: Object,
  url: String,
  new_nearby: [
    { type: Schema.Types.ObjectId, ref: 'Property' }
  ],
  water_name: String,
  locSearch: { type: Array, index: '2dsphere' },
  sites: [{
    date: {
      listed: Date,
      updated: Date,
      generated_at: Date
    },
    site: String
  }],
  nearby_properties: Array,
  locSearch_attempts: Number,
  lastNearbyUpdate: Date
});

PropertySchema.set('toJSON', {
  virtuals: true
});

const normalizeDate = (date) => moment(date).format('YYYY-MM-DD hh:mm:ss');
const normalizeSoldDate = (date) => moment(date).format('MM/DD/YYYY');

PropertySchema.pre('init', (next, data) => {
  if (data.new_nearby) {
    data.new_nearby.forEach((nearby, n) => {
      if (nearby.photo) {
        data.new_nearby[n].photo_thumb = nearby.photo.replace('/home', '/thumb'); // eslint-disable-line
      }
    });
  }

  next();
});

PropertySchema.virtual('listingPhone').get(function () {
  const nP = (phone) => {
    const result = /([0-9]{3})([0-9]{3})([0-9]{4})$/.exec(phone);
    const resultCode1 = JSON.parse(codes)[result[1]];
    const code4 = resultCode1 ? ` - ${resultCode1}` : '';
    return result ?
      `(${result[1]}) ${result[2]}-${result[3]}${code4}` :
      '';
  };

  return this.listing_agent && this.listing_agent.phone ? nP(this.listing_agent.phone) : '';
});

PropertySchema.virtual('n_price').get(function () {
  return this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
});

PropertySchema.virtual('price_short').get(function () {
  return this.price >= 1000000 ? `$${Math.round(this.price / 1000000)}M` : `$${Math.round(this.price / 1000)}k`;
});

PropertySchema.virtual('remarks_short').get(function () {
  return this.remarks ? this.remarks.split('.')[0] : '';
});

PropertySchema.virtual('n_sold').get(function () {
  const obj = {};

  if (this.sold && (this.sold.price || this.sold.date || this.sold.ratio)) {
    obj.price = this.sold.price;
    if (this.sold.price) {
      obj.price = parseInt(this.sold.price, 10)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace('.00', '');
    }
    obj.ratio = this.sold.ratio ? (this.sold.ratio * 100).toFixed(2) : this.sold.ratio;
    obj.date = this.sold.date ? normalizeSoldDate(this.sold.date) : this.sold.date;
  }

  return obj;
});

PropertySchema.virtual('date_listed').get(function () {
  return this.date && this.date.listed ? normalizeDate(this.date.listed) : '';
});

PropertySchema.virtual('city_link').get(function () {
  if (this.city) {
    const city = this.city.toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-zA-Z0-9_]+/g, '');
    return `${city}/`;
  }

  return '';
});

PropertySchema.static('getMap', () => (
  new Transformer({
    _id: '_id',
    mlsid: 'mlsid',
    price: 'price',
    mls: 'mls',
    address: 'address',
    url: 'url',
    city: 'city',
    zip: 'zip',
    state: 'state',
    date: 'date'
  })
));

export default mongoose.model('Property', PropertySchema);
