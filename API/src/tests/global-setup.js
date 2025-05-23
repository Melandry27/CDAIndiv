const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.test") });

module.exports = async () => {
  console.log("\n🧪 Resetting test database...");
  execSync(
    "npx prisma migrate reset --force --skip-seed --schema=prisma/schema.prisma",
    {
      stdio: "inherit",
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL_TEST,
      },
    }
  );
};
