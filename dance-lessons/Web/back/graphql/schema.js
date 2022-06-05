const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Lesson {
    _id: String
    title: String
    level: String
    practiceUrl: String
    tutorialUrl: String
    booked: Boolean
    createdAt: String
    updatedAt: String
  }

  type Offer {
    _id: String
    name: String
    description: String
    imgUrl: String
    price: String
    pricePer: String
    longTimeMonths: String
    personalSessions: String
    newElements: String
    createdAt: String
    updatedAt: String
  }

  type Score {
    _id: String
    lessonId: String
    score: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    hello: String
    getLessons: [Lesson]
    getScores: [Score]
    getOffers: [Offer]
  }  
`);

module.exports = schema;
