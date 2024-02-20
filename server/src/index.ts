import app from "./app";
import { config } from "./config/config";
const port = config.port;

app.listen(port, () => {
  config.db();
  console.log(`Server listening on ${port}`);
});
