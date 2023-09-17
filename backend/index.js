import express from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { error } from 'console';
import { Book } from './models/bookModls.js';
import router from './route/booksroute.js';
import cors from 'cors'


const app = express();

//middle wire
app.use(express.json())


var whitelist = ['http://localhost:5555', 'http://localhost:5173'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };  // Reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false };  // Disable CORS for this request
    }
    callback(null, corsOptions);  // Callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("welcome to mern stack toterial")
})

app.use('/books',router);





mongoose.connect(mongoDBURL)
.then(()=>{
    console.log(('App connected to the database'))
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})