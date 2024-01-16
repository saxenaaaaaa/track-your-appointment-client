const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 443;

// Your Express app setup and routes go here...

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const privateKey = fs.readFileSync('/usr/src/app/certs/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/usr/src/app/certs/fullchain.pem', 'utf8');
// const ca = fs.readFileSync('/path/to/your/ca.pem', 'utf8'); // Optional: Include CA certificate

const credentials = { key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// app.listen(port, () => {
//     console.log(`Server is running on https://yourdomain.com:${port}`);
// });