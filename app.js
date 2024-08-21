const express = require('express');
const app = express();

require('dotenv').config();
require('./start/routes')(app);
require('./start/db')

//connect to server  
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
});