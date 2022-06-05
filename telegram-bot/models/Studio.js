const { Schema, model } = require('mongoose');

const studioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  couch: String,
  img: String,
  timetable: [
    {
      day: Number,
      start: String,
      end: String,
    },
  ],
});

studioSchema.methods.clearTimetable = function () {
  this.timetable = [];
  this.save();
};

studioSchema.methods.updateStudio = function (timetable) {
  const dayIdx = this.timetable.findIndex((each) => each.day === timetable.day);

  if (dayIdx === -1) {
    this.timetable.push(timetable);
  } else {
    this.timetable = [
      ...this.timetable.slice(0, dayIdx),
      timetable,
      ...this.timetable.slice(dayIdx + 1),
    ];
  }

  this.save();
};

module.exports = model('TelegaStudio', studioSchema);
