const express = require('express');
const app = express();
const PORT= process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(require("./routes/html"));
app.use(require("./routes/api"));
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
  });