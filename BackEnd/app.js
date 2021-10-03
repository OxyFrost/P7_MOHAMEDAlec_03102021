const express = require('express');
const helmet = require("helmet");
const {PrismaClient} = require('@prisma/client')
const path = require('path');
require('dotenv').config()


const userRoutes = require('./routes/user')


const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

const prisma = new PrismaClient()

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);

module.exports = app;