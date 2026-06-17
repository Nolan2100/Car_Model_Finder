const express = require('express');
const fetch = require('node-fetch'); // or use axios
const router = express.Router();

router.get('/cars', async (req, res) => {
  const { s } = req.query;
  if (!s) return res.status(400).json({ error: 'Query parameter s is required' });
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(s)}?format=json`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

module.exports = router;