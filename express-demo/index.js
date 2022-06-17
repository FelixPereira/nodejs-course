const express = require('express');
const app = express();
const home = require('./routes/home');
const courses = require('./routes/courses');

app.use(express.json());
app.use('/', home);
app.use('/api/courses', courses);



// PORT 
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));