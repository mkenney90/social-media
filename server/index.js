const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

const userRoute = require("./routes/User");
app.use('/user', userRoute);

const PORT = 3001;
app.listen(PORT, (req, res) => {
    console.log(`server running on http://localhost:${PORT}`);
})