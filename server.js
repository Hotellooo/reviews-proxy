const express = require('express');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const port = 3000;
const apiProxy = httpProxy.createProxyServer();

const calendarServer = 'http://ec2-3-17-163-130.us-east-2.compute.amazonaws.com/';
const photosServer = 'http://ec2-18-217-154-181.us-east-2.compute.amazonaws.com/';
const aboutServer = 'http://ec2-54-241-67-8.us-west-1.compute.amazonaws.com/';
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