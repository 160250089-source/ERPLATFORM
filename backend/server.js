import app from "./src/app.js"
import connectDB from "./src/utils/db.js";
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});

