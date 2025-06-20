const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use(express.json()); 

app.use(express.static('public')); 

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
    process.exit(1); 
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

const taskRoutes = require('./routes/tasks');

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
