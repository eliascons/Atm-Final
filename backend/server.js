import express from 'express';
import accountRoute from './routes/accounts.js';
import authRoute from './routes/auth.js';
import authenticateJWT from './middleware/authenticateJWT.js';
import mongoose from 'mongoose';



mongoose.connect(process.env.MONGO_STRING)


const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRoute);
app.use('/account', authenticateJWT, accountRoute)
app.use('/', (req, res)=>{
    res.send('Origin');
});

app.listen(PORT, ()=>{
    console.log(`listening on PORT: ${PORT}...`);
});

