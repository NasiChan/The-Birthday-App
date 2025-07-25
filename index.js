
const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎂 Birthday website is running on http://0.0.0.0:${PORT}`);
    console.log('🕯️ Click on the candles to light them up!');
});
