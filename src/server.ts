import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { datasource } from "./config/ormconfig";
import router from "./routes/user.routes";
import path from "path";
// import annotRoute from "./routes/annot.route";

dotenv.config();
const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use('/user',router);
// app.use('/annot',annotRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await datasource.initialize()
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err: any) => console.log({ errorMessage: err }));
  console.log(`server is running in port ${PORT}`);
});
