import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './route/user.route';
import vendor from './route/vendor.route';
import adminRouter from './route/admin.route';
dotenv.config();

const app = express();
app.use(cors({
    origin: ['*','http://localhost:3000', 'https://crewplay.vercel.app','https://crewplay.in'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crewplay';

if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in environment variables.');
    process.exit(1);
}

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Connected to MongoDB');    
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);    
    process.exit(1);
});

app.use('/user',router);
app.use('/vendor',vendor);
app.use('/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('Crewplay Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});