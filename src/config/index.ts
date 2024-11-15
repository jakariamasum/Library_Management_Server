import dotenv from "dotenv";
import path from "path";
dotenv.config();

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
