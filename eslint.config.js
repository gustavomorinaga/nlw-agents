import antfu from "@antfu/eslint-config";
import prettierOptions from "./prettier.config.js";

export default antfu({
  formatters: { prettierOptions },
  react: true,
});
