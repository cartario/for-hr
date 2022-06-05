const {Schema, model} = require('mongoose');

const LessonSchema = new Schema({
  booked: {
    type: Boolean,
    required: true  
  },
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true, 
  },
  practiceUrl: {
    type: String,
    required: true,
  },
  tutorialUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = model('Lesson', LessonSchema);

