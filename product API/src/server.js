import app from "./app.js";
import { envs } from "./config/envs.js";
app.listen(envs.port, () => console.log(`Express server listening on port ${envs.port}`));
