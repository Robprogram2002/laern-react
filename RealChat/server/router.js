const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server backend is running');
})

module.exports = router;