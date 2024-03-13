const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..')));

if (process.env.CREATE_STORYBOOK) {
  app.use(express.static(path.join(__dirname, '..', '..', 'storybook', 'ui')));
  app.get('/storybook/?*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'storybook', 'ui', 'index.html')
    );
  });
}

app.get('/:app//?*', (req, res) => {
  console.log('agnostic middleware');
  const { params: { app } } = req;
  console.log('app', app);
  res.sendFile(path.join(__dirname, '..', app, 'index.html'));
});

app.get('/recent-activity/?*', (req, res) => {
  console.log('recent-activity middleware');
  res.sendFile(path.join(__dirname, '..', 'recent-activity', 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
