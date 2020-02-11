const express = require('express');
const app = express();


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT   }`));

// Get route: HOME
app.get('/', ( req,res) => res.json(
    {msg: 'Welcome to the ContactKeeper API'}
    ));