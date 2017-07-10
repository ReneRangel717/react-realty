import mongoose from 'mongoose';
import limax from 'limax';

const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  community: String,
  price: Object,
  acres: Object,
  sqft: Object,
  hoa_amount: Object,
  school_elem: String,
  school_middle: String,
  school_high: String,
  custom_images: Array,
  communityAmenities: Array,
  nearby_communities: Array,
  landmarks: Array,
  mlsid: String,
  url: String,
  custom_headline: String,
  custom_body: String,
  custom_body_br: String,
  custom_img: String,
  city: String,
  need_recalculate: Boolean,
  realtor_reviews: Array,
  oldNames: Array,
  similar: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
  locSearch: { type: Array, index: '2dsphere' },
  region: String,
  total_active: Number,
  total_sold: Number,
  youtube: String,
  hoa_fees: String,
  last_recalc: Date
}, { read: 'nearest' });

CommunitySchema.set('toJSON', { virtuals: true });

// eslint-disable-next-line
CommunitySchema.virtual('price_range').get(function () {
  let minPrice;
  let maxPrice;

  if (this.price && this.price.lowest) {
    minPrice = this.price.lowest >= 1000000 ? `$${Math.round(this.price.lowest / 1000000)}M` : `$${Math.round(this.price.lowest / 1000)}k`;
  }

  if (this.price && this.price.highest) {
    maxPrice = this.price.highest >= 1000000 ? `$${Math.round(this.price.highest / 1000000)}M` : `$${Math.round(this.price.highest / 1000)}k`;
  }
  let res = '';
  if (minPrice && maxPrice) {
    res = minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
  }

  return res;
});

// eslint-disable-next-line
CommunitySchema.pre('save', function (next) {
  const self = this;
  mongoose.model('Community')
    .findById(self._id)
    .then((community) => {
      if (community && community.community !== self.community) {
        if (!community.oldNames) {
          community.oldNames = []; // eslint-disable-line
        }
        community.oldNames.push({
          communityName: community.community,
          url: community.url
        });
        community.url = `${limax(community.city)}/${limax(community.community)}`;  // eslint-disable-line
        community.save(() => {
          next();
        });
      }
    })
    .catch(() => {
      next();
    });
});

export default mongoose.model('Community', CommunitySchema);
