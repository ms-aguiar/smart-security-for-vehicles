const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');

require('./database');

const app = express();

app.use("/static", express.static('./static/'));
app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);

