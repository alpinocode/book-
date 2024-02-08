import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// route
import userRoute from "./routes/UserRoute.js";


// import to connection database
import db from './config/Server.js';

// dotenv call 
dotenv.config()

// error handling block connect to database
try {
    await db.authenticate()
    console.log('Database running')
} catch (error) {
    console.log(error)    
}

const port = process.env.PORT

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(cookieParser())
app.use(express.json())
app.use(userRoute)


app.listen(port, () => {
    console.log(`Server up and Running`)
})
    