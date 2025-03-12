const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const boards = require('./routes/api/boards');
const taskLists = require('./routes/api/taskLists');
const tasks = require('./routes/api/tasks');
const auth = require('./routes/api/auth');
const config = require('./config/configs');
const logger = require('./utilities/logger');
const cors = require('cors');

const app = express();
const port = 5000;

app.use('/uploads', express.static('uploads'));
// Cors middleware
// Define the allowed origins
const allowedOrigins = ['https://task-manager-frontend-brof7jtx7-profecis-projects.vercel.app'];

// Cors middleware with options
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true,  // If you need to allow cookies or authentication headers
}));


// Bodyparser
app.use(express.json());

// Connect to Mongo DB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(error => console.log(error));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/boards', boards);
app.use('/api/tasklists', taskLists);
app.use('/api/tasks', tasks);


// Start Server
app.listen(port, ()=> {
    console.log(`Server started on ${port}`);
})

