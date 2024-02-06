import express from 'express';
import dotenv from 'dotenv';

// route
import userRoute from "./routes/UserRoute.js";
import noteRoute from "./routes/NoteRoute.js"

// import to connection database
import db from './config/Server.js';

// dotenv call 
dotenv.config()

// error handling block connect to database
try {
    await db.authenticate()
    console.log('Database running')
    await db.sync()
} catch (error) {
    console.log(error)    
}

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(userRoute)
app.use(noteRoute)

app.listen(port, () => {
    console.log(`Server up and Running`)
})
