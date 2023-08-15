import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import colors from 'colors';
import morgan from 'morgan';
import router from './router/router.js';
import database from './config/mongodb.js';
dotenv.config();


const app = express();
const port = process.env.PORT;
const allowedClients = process.env.ALLOWED_CLIENTS.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedClients.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};


app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV == "development" ? "dev" : "common"));
app.use(router);


await database( async () => {
    app.listen(port, () => {
        console.log(`Server is running on: ${port}...`.gray)
    })
});
