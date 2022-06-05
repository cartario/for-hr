const express = require('express');
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');

const secretRouter = require('./routes/secret');
const authRouter = require('./routes/auth');
const router = require('./routes/main.routes.js');
const lessonRouter = require('./routes/lesson.routes.js');
const scoreRouter = require('./routes/score.routes.js');
const offersRouter = require('./routes/offer.routes.js');

const variablesMiddleware = require('./middleware/variables');
const authMiddleware = require('./middleware/auth');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions',
});

const app = express();

//graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }),
);

//rest
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  session({
    secret: 'secret test',
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

// app.use(csurf());

//мидлвары
app.use(flash());

//роуты
app.use('/secret', secretRouter);
app.use('/auth', authRouter);
app.use('/api/main', router);
app.use('/api/lessons', lessonRouter);
app.use('/api/scores', scoreRouter);
app.use('/api/offers', offersRouter);

//статическая папка
app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server started on ${PORT} port`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();
