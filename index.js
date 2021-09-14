const express = require('express');
var mongoose = require('mongoose');

const app = express();
//const dotenv = dotenv();
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
//dotenv.config();
var userController= require('./controllers/userController');
var facilityController = require('./controllers/facilityController');
const dotenv = require("dotenv");
dotenv.config(); 

mongoose.connect(
 'mongodb+srv://hanna:testing@123@cluster0.ivmui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
});
mongoose.set('useFindAndModify', false)


// var options = {
//   customCss: '.swagger-ui .topbar { display: none }'
// };

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

//app.set('view engine','ejs');
app.use(express.json());
//app.use(express.bodyParser());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: true}));

userController(app);
facilityController(app);

app.listen(3000);
console.log('You are listening to port 3000');