const {Schema, model} = require('mongoose');

const OfferSchema = new Schema({
  
  description: {
    type: String  
  },

  disabled: {
    type: String  
  },

  imgUrl: {
    type: String  
  },

  longTimeMonths: {
    type: String  
  },

  name: {
    type: String  
  },

  newElements: {
    type: String  
  },

  personalSessions: {
    type: String  
  },

  price: {
    type: String  
  },

  pricePer: {
    type: String  
  },

  subscriptionFree: {
    type: String  
  },

  type: {
    type: String  
  },

}, {
  timestamps: true
})

module.exports = model('Offer', OfferSchema);
