const LessonModel = require('../models/Lesson');
const OfferModel = require('../models/Offers');
const ScoreModel = require('../models/Score');

const resolver = {
  hello: () => {
    return 'Hello world!';
  },
  getLessons: async () => {
    try {
      return await LessonModel.find({});
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
  getScores: async () => {
    try {
      return await ScoreModel.find({});
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
  getOffers: async () => {
    try {
      return await OfferModel.find({});
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
};

module.exports = resolver;
