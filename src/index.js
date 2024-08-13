import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app
      .listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
      })
      .on("error", (err) => {
        console.error(`Failed to start server: ${err.message}`);
      });
  })
  .catch((err) => {
    console.error("Connection Failed ", err);
  });
