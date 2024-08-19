const express=require("express");
const app=express();
const dotenv=require("dotenv");
const axios = require('axios');
const response = require('./data');
const cors = require('cors');

dotenv.config({path:'config.env'});

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.status(200).send("welcome to currency convertor");
});

app.get("/convert",async (req,res)=>{
    const { from, to, amount } = req.query;
    try{
        //const apiKey = process.env.EXCHANGE_RATES_API_KEY;
        //const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`);
        //rate=response.data.rates[to];
        rate=response.rates[to];
        convertedAmount=amount * rate;
        res.status(200).json({ from, to, amount, rate, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching currency rate', details: error.message });
    }
});

const PORT=5000;
app.listen(PORT,()=>{
        console.log(`server is running on:${PORT}`);
})
