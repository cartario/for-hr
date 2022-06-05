const {Schema, model} = require('mongoose');

const ScoreSchema = new Schema({
  lessonId: {
    type: String,
    required: true,  
  },
  score: {
    type: String,
    required: true, 
  }
}, {
  timestamps: true
})

module.exports = model('Score', ScoreSchema);
