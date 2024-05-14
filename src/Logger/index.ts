
import { devLogger } from "./devLogger";
import { Logger } from "./logger";

let logger: any = null;

if (process.env.NODE_ENV === "development") {
    logger = new devLogger()
}

if (process.env.NODE_ENV === "testing") {
    logger = new devLogger()
}
logger = new Logger()

export { logger };