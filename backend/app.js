import express from 'express'
import mongoose from 'mongoose';
import cors  from 'cors'
import router  from './routes/user-routes.js'
import blogRouter from './routes/blog-routes.js';
//add your mongoose id to connect
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.kpm6gjf.mongodb.net/newApp?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);
const app =express();
app.use(express.json())
app.use(cors());
app.use('/api/user',router)
app.use('/api/blog',blogRouter)
app.use('/api',(req,res)=>{
    res.send('hello world')
})

app.listen(3001,()=>{
    console.log('server is running on port 3000')
})
