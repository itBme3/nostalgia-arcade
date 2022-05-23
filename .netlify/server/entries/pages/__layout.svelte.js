var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_b068bf91 = require("../../chunks/index-b068bf91.js");
var global = "";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{font-family:'Press Start 2P', monospace}main.svelte-99r3f7{text-align:center;padding:0;width:100vw;margin:0 auto;min-height:calc(100vh - 200px);overflow-y:hidden}",
  map: null
};
const _layout = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="${"svelte-99r3f7"}">${slots.default ? slots.default({}) : ``}</main>
${$$result.head += `<link href="${"https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"}" rel="${"stylesheet"}" data-svelte="svelte-1933y">`, ""}`;
});
