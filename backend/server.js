import express from 'express'
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import blogRouter from './routes/blogRoute.js'
import mongoose from 'mongoose';

const app = express();
const uri = process.env.ATLAS_URI || '';
const PORT = process.env.PORT || ''

app.use(cors({origin: "https://blognet-l4bw.onrender.com"}))
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)

try {

    await mongoose.connect(`${uri}`);
    console.log('You have successfully connected to the mongoDB database')

    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT)
    })

} catch (error) {
    console.log(error)
}