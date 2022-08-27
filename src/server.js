require('dotenv').config();
const app = require('./api');
require('express-async-errors');
const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/UserContoller');
const validateToken = require('./middleware/validateToken');
const CategoryController = require('./controllers/CategoryControllers');
const PostCategoryController = require('./controllers/PostCategoryController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.post('/login', LoginController.Login);
app.post('/user', UserController.addUser);
app.get('/user', validateToken.userToken, UserController.allUsers);
app.get('/user/:id', validateToken.userToken, UserController.getUser);
app.post('/categories', validateToken.userToken, CategoryController.addCategory);
app.get('/categories', validateToken.userToken, CategoryController.getCategory);
app.post('/post', validateToken.loginToken, PostCategoryController.addPostCategory);
app.get('/post', validateToken.loginToken, PostCategoryController.allPostCategory);
app.get('/post/:id', validateToken.loginToken, PostCategoryController.getPostCategory);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const [code, message] = err.message.split('|');
  console.error(err);
  return res.status(code).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
