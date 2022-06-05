const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: String,
  messages: [String], // String is shorthand for {type: String}
  state: {
    day: String,
    hour: String,
    studio: String,
    confirm: Boolean,
  },
});

userSchema.methods.clearMessages = function () {
  this.messages = [];
  this.save();
};

userSchema.methods.addMessage = function (msg) {
  this.messages.push(msg);
  this.save();
};

userSchema.methods.addToState = function (data) {
  this.state = { ...this.state, ...data };
  this.save();
};

userSchema.methods.clearState = function () {
  this.state = {};
  this.save();
};

module.exports = model('TelegaUser', userSchema);
