const axios = require("axios");

const LOG_API_URL = "http://20.207.122.201/evaluation-service/logs";

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const COMMON_PACKAGES = ["auth", "config", "middleware", "utils"];

async function Log(stack, level, packageName, message) {
  const normalizedStack = stack.toLowerCase();
  const normalizedLevel = level.toLowerCase();
  const normalizedPackage = packageName.toLowerCase();

  if (!ALLOWED_STACKS.includes(normalizedStack)) {
    console.warn(`[Logger] Invalid stack value: "${stack}". Allowed values: ${ALLOWED_STACKS.join(", ")}`);
    return;
  }

  if (!ALLOWED_LEVELS.includes(normalizedLevel)) {
    console.warn(`[Logger] Invalid level value: "${level}". Allowed values: ${ALLOWED_LEVELS.join(", ")}`);
    return;
  }

  const allowedPackages = [...BACKEND_PACKAGES, ...FRONTEND_PACKAGES, ...COMMON_PACKAGES];
  if (!allowedPackages.includes(normalizedPackage)) {
    console.warn(`[Logger] Invalid package value: "${packageName}". Allowed values: ${allowedPackages.join(", ")}`);
    return;
  }

  try {
    await axios.post(
      LOG_API_URL,
      {
        stack: normalizedStack,
        level: normalizedLevel,
        package: normalizedPackage,
        message: String(message)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error(`[Logger] Failed to send log to API: ${error.message}`);
  }
}

module.exports = Log;
