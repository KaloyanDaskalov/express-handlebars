const express = require('express');
const router = require('./config/routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = express();

(async () => await require('./config/mongoose')(config.DB_URI))();

require('./config/expressExtend')(app, express.static, express.urlencoded);

app.use(router);

app.listen(config.PORT, console.log(`Listening on port ${config.PORT}! Now its up to you...`));