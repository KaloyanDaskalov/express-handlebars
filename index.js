const express = require('express');
const router = require('./controllers/routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/mongoose')(config.DB_URI);

const app = express();

require('./config/expressExtend')(app, express.static, express.urlencoded);
app.use(router);

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}! Now its up to you...`));