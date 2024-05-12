import { boot } from "quasar/wrappers";
import store from "src/store";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app /*router*/ }) => {
  // something to do
  app.use(store);
});
