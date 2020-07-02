const express = require('express');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const port = process.env.PORT || 3000;
const apiProxy = httpProxy.createProxyServer();

const calendarServer = 'http://localhost:3001';
const photosServer = 'http://localhost:3002';
const aboutServer = 'http://localhost:3003';
const reviewsServer = 'http://13.57.249.34';


// CALENDAR

app.all('/api/calendar/db/*', (req, res) => {
  console.log('redirecting to calendar server');
  apiProxy.web(req, res, {target: calendarServer, changeOrigin: true});
});

app.all('/api/calendar/update/', (req, res) => {
  console.log('redirecting to calendar server');
  apiProxy.web(req, res, {target: calendarServer, changeOrigin: true});
});

// PHOTOS

// app.all('/*', (req, res) => {
//   console.log('redirecting to photos-carousel server');
//   apiProxy.web(req, res, {target: photosServer, changeOrigin: true});
// });

app.all('/api/:hotelId/photos', (req, res) => {
  console.log('redirecting to photos-carousel server');
  apiProxy.web(req, res, {target: photosServer, changeOrigin: true});
});

// ABOUT
app.all('/api/photos/*', (req, res) => {
  console.log('redirecting to about server');
  apiProxy.web(req, res, {target: aboutServer, changeOrigin: true});
});

// REVIEWS
app.all('/reviews/*', (req, res) => {
  console.log('redirecting to reviews server');
  apiProxy.web(req, res, {target: reviewsServer, changeOrigin: true});
});


// ALL
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server is running at port ${port}`));