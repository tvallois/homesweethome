import { connect } from "mongoose";
import Config from "../config/config";

const connectToMongoDB = async (config: Config): Promise<void | Error> => {
  await connect(
    `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`,
    { useNewUrlParser: true, useCreateIndex: true }
  );
};

export default connectToMongoDB;
