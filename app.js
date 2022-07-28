const message = require(`./message`);

const express = require(`express`);
const app = express();

const cors = require(`cors`);
app.use(cors());

const dotenv = require(`dotenv`);
dotenv.config();

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dataBase = require(`./database/mongoDB`);

const userRoutes = require(`./routes/userRoutes`);

app.use(`/v1`, userRoutes);

app.get(`/`, (req, res) => {
  res.json();
});

app.listen(9000, () => {
  console.log(message.portMessage);
});
