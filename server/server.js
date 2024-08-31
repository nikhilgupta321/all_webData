const express = require('express');
const { sequelize, config } = require('./config/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path')
// Import routes
const webentryrouter = require('./routes/webentry.route');
const authrouter = require('./routes/auth.route')
const helperrouter = require('./routes/helper.route')
const settingRoutes = require('./routes/setting.route')
const journalsroute = require('./routes/journals.route')
const userRoute = require('./routes/user.route')


const app = express();
const cors = require('cors');
const Journals = require('./models/journals.model');
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
const port = 8080;
// app.use(
//   fileUpload({
//     limits: { fileSize: 5 * 1024 * 1024 },
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);



// Use routes
app.use('/api', webentryrouter);
app.use("/api", journalsroute)
app.use("/", userRoute)

app.use('/', authrouter, helperrouter, settingRoutes)

// Login 
sequelize.authenticate().then(() => {
  console.error('Database connected successfully')
})
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is running on port http://localhost:${config.port}`);
});

module.exports = sequelize;

