const message = require(`../message`);
const mongoose = require(`mongoose`);

const dotenv = require(`dotenv`);
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(message.dataBase);
  });
