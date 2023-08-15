import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);


const connectDB = async (server) => {
    mongoose.connect(
        `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.pb3badg.mongodb.net/app`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
            .then( async (conn) => {
                await server();
                console.log(`Database is running on: ${conn.connection.host}`.gray)
            })
            .catch( (error) => {
                console.log(`${error}`.red)
                process.exit(1)
            })
};


export default connectDB;