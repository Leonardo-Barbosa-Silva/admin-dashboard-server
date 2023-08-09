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

await database( async () => {
    app.listen(port, () => {
        console.log(`Server is running on: ${port}...`.gray)
    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(router);