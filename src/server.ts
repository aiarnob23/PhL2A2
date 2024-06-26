import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

async function main() {
  try {
    await mongoose.connect(config.DB_URI as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
