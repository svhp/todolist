require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks');
const auth = require('./routes/login')
const authJWT = require('./middleware/authJWT')
const port = process.env.PORT || 5000;  
const notfoundmessage = require('./middleware/notfoundmessage');
const errorhandlers = require('./middleware/errorhandler');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', auth);
app.use('/api/tasks', authJWT , tasks);
app.use(notfoundmessage);
app.use(errorhandlers);

const start = async () => {
  try {
    await connectDB();
    
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start()

