import express from "express";
import bearerToken from "express-bearer-token";
import  { resolve, dirname } from 'path';
import { fileURLToPath } from "url";
import {  v1AdminRouter } from "./routes/index.js";
import i18n from "i18n";
import { connect as dbConnect, morganConf, handleError,StatusSuccess } from "./config/index.js";
import { errors } from "celebrate";
import { createServer } from "http";

const app = express();

/**
 * Initilization of internationalization(i18n)
 * default language english.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18n.configure({
  locales: ["en"],
  directory: resolve(__dirname, "./assets/locales"),
});
app.use(i18n.init);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bearerToken());
/**
 * Logger methods => error, warn, info, debug
 */
app.use(morganConf);
app.use(StatusSuccess);


/**
 * Handaling database connection
 */
dbConnect();

/**
 * Initializing Admin APIs base routes
 */
app.use("/api", v1AdminRouter);

/**
 * Default Route
 */
app.get("/", (_req, res) => res.send({ message: "Ok" }));

/**
 * 404 Route
 */
app.get("*", (req, res) => res.status(404).send({ message: "Not found!" }));

/**
 * ok = 200
 * created = 201
 * noData = 204
 * badRequest = 400
 * forbidden = 403
 * severError = 500
 */
app.use(errors());
app.use(handleError);


const httpServer = createServer(app);

export default httpServer;
