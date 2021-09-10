const connectToMongo = require('./db');
const express = require('express'); 

const app = express();
const port = 5000;
connectToMongo();

app.use(express.json());
//Avlaible routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.listen(port,()=>{
    console.log("server start listening on the port "+port);
}); 