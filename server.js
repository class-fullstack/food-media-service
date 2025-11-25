const app = require("./src/app");
const appConfigs = require("./src/configs/app.configs");

const Port = appConfigs.App.Port;

app.listen(Port, () => {
  console.log(`🚀 Server is listening on port http://localhost:${Port}`);
});
