const express = require('express');
const app = express();

require('dotenv').config();
require('./start/routes')(app);
require('./start/db')

app.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            message: "your request receive"
        })
    }
    catch (error) {
        next(error);
    }
});

//connect to server  
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});