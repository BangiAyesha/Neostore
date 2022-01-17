const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 2800;
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use(productRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use(orderRoutes);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${PORT}`);
});
