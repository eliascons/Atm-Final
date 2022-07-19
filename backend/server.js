import express from 'express';
import accountRoute from './routes/accounts.js';
import authRoute from './routes/auth.js';
import authenticateJWT from './middleware/authenticateJWT.js';
import mongoose from 'mongoose';



mongoose.connect(process.env.MONGO_STRING)


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRoute);
app.use('/account', authenticateJWT, accountRoute)

app.use(express.static(new URL('./bank-client/build', import.meta.url).pathname));

app.get('*', (req, res)=>{
    res.sendFile(new URL('./bank-client/build/index.html', import.meta.url).pathname);
});

app.listen(PORT, ()=>{
    console.log(`listening on PORT: ${PORT}...`);
});

