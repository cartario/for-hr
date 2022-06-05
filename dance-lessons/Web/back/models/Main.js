const {Schema, model} = require('mongoose');

const MainSchema = new Schema({
  score: {
    type: String    
  },
  feedback: {
    type: String  
  }
}, {
  timestamps: true
})

module.exports = model('Main', MainSchema);
