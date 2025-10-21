const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const productRouter = require('./routers/product.router');



// express app initialization
const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;


// connect to mongoose
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'));

app.use('/api/v1/products', productRouter);

// default error handler
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})