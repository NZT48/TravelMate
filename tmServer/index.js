const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;
const mongoDb = process.env.MONGODB_URL || 'mongodb://localhost:27017/travelmate';

mongoose.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB: Connection OK!');
        app.listen(port, () => {
            console.log('Server running on => http://localhost:' + port);
        });
    })
    .catch(err => console.log(err));

console.log('Server starting...');
