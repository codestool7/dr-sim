const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//app.use(express.static('src'));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});
