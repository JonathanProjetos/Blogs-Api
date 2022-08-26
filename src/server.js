require('dotenv').config();
const app = require('./api');
require('express-async-errors');
const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/UserContoller');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.post('/login', LoginController.Login);
app.post('/user', UserController.addUser);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const [code, message] = err.message.split('|');
  console.log(code, message);
  return res.status(code).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
