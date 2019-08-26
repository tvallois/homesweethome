import { MongoError } from "mongodb";

export const getDuplicateKeyValueFromMongoError = (
  error: MongoError
): [string, string] => {
  console.log(error.errmsg);
  if (!error.errmsg) {
    return ["unknown", "value"];
  }
  console.log(error.errmsg.match(/index:\s([a-z]+).*{\s?:\s?"([a-z]+)"/i));
  const [i, field, value] = error.errmsg.match(
    /index:\s([a-z]+).*{\s?:\s?"([a-z]+)"/i
  );
  return [field, value];
};
