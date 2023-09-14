const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/file/:fileIdentifier', (req, res) => {
  const fileIdentifier = req.params.fileIdentifier;
  const filePath = path.join(__dirname, '../uploads/images', fileIdentifier);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve file' });
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(data);
    }
  });
});

module.exports = router;
