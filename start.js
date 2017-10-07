const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const mainRoutes = require('./routes/main');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api', mainRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`🔥 🔥 🔥 🔥 🔥 \n listening on port ${port}`);
});