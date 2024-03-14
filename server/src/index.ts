import server from "./app";
import { config } from "./config/config";
const port = config.port;

server.listen(port, () => {
  config.db();
  console.log(`Server listening on ${port}`);
});
