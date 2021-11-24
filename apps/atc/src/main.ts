import * as express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..')));

app.get('/courses/?*', (req, res) => {
  console.log('there it is');
  res.sendFile(path.join(__dirname, '..', 'courses', 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
