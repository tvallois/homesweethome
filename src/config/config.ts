class Config {
  public dbName: string;
  public dbHost: string;
  public dbPort: string;
  constructor() {
    if (
      !process.env.homesweethomeDbName ||
      !process.env.homesweethomeDbHost ||
      !process.env.homesweethomeDbPort
    ) {
      throw new Error(
        "You need to set homesweethomeDbPort, homesweethomeDbHost and homesweethomeDbName in your env variable"
      );
    }
    this.dbName = process.env.homesweethomeDbName;
    this.dbHost = process.env.homesweethomeDbHost;
    this.dbPort = process.env.homesweethomeDbPort;
  }
}

export default Config;
