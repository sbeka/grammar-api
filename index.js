const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

const port = 3000;
const mongoUri = 'mongodb+srv://narimanovadian:Dayana3648@cluster0.as5jhvq.mongodb.net/kazakh-grammar?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json({ extended: true }));


app.use('/api/users', require('./routes/user.routes'));
app.use('/api/videos', require('./routes/video.routes'));
app.use('/api/sentences', require('./routes/sentence.routes'));


async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        // Listen HTTP
        const httpServer = http.createServer(app);
        httpServer.listen(port, () => {
            console.log(`HTTP Server running on port ${port}`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start().then();
