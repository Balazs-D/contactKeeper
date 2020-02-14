const express = require('express');
const connectDB = require('./config/db')
const app = express();

//Connect Database 
connectDB();

// Init middleware
app.use(express.json({extended: false}));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Get route: HOME
app.get('/', ( req,res) => res.json(
    {msg: 'Welcome to the ContactKeeper API'}
    ));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));