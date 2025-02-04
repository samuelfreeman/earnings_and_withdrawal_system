import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default  [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } ,rules: { "no-restricted-imports": "off", semi: "error",
    "prefer-const": "error" }  },
  { languageOptions: { globals: globals.node } },

  pluginJs.configs.recommended,
  
 
   


  
];
