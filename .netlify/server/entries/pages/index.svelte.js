var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_b068bf91 = require("../../chunks/index-b068bf91.js");
var import_coloring_9fe4261b = require("../../chunks/coloring-9fe4261b.js");
var import_chroma_js = __toESM(require("chroma-js"));
var import_gsap = require("gsap");
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: '.square.svelte-1uz0q2d{position:relative;--tw-scale-x:.5;--tw-scale-y:.5;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.5rem;--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.square.svelte-1uz0q2d:before{content:"";position:absolute;top:0px;right:0px;bottom:0px;left:0px;--tw-translate-y:-0.5rem;--tw-translate-x:-0.75rem;--tw-scale-x:.5;--tw-scale-y:.5;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;--tw-border-opacity:1;border-color:rgb(255 255 255 / var(--tw-border-opacity));background-color:rgb(255 255 255 / var(--tw-bg-opacity));--tw-bg-opacity:0.1;--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.square.svelte-1uz0q2d:after{content:"";position:absolute;top:0.75rem;right:0.75rem;bottom:0.75rem;left:0.75rem;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;background-color:rgb(255 255 255 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.square.svelte-1uz0q2d:hover:before{--tw-blur:blur(0);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.page-tile.svelte-1uz0q2d{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));transition:.3s all ease-in-out}',
  map: null
};
const rowCount = 10;
const Routes = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let matrix;
  let squareSize;
  let colors;
  let w, interval, matrixCoverage = 0.2;
  (0, import_index_b068bf91.o)(() => {
    try {
      clearTimeout(interval);
    } catch {
    }
  });
  $$result.css.add(css);
  matrix = Array(rowCount).fill(null).map((row, i) => Array(rowCount).fill(null).map((col, ii) => `r${i}c${ii}`));
  squareSize = Math.round(w / rowCount);
  colors = import_chroma_js.default.scale(import_coloring_9fe4261b.r).colors(rowCount * rowCount);
  return `<div class="${"page bg-gray-900 h-screen"}">${Array.isArray(matrix) ? `<div class="${"home-grid fixed inset-2 rounded-sm z-0 svelte-1uz0q2d"}">${(0, import_index_b068bf91.d)(matrix, (row, i) => {
    return `<div${(0, import_index_b068bf91.b)("name", `row-${i}`, 0)} class="${"row flex w-full items-center content-stretch"}">${(0, import_index_b068bf91.d)(row, (coords, ii) => {
      return `<div${(0, import_index_b068bf91.b)("name", coords, 0)} class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`square ${coords}`)) + " svelte-1uz0q2d"}"${(0, import_index_b068bf91.b)("style", `height: ${squareSize}px; width: ${squareSize}px; background-color: ${colors[i * rowCount + ii * rowCount * matrixCoverage]}`, 0)}></div>`;
    })}
                    </div>`;
  })}</div>` : ``}
    

    ${(0, import_index_b068bf91.d)(import_coloring_9fe4261b.r, (color) => {
    return `<div class="${"home-title"}"${(0, import_index_b068bf91.b)("style", `color: ${color}`, 0)}>Nostalgia Arcade</div>`;
  })}

    <div class="${"flex flex-col space-y-8 pt-[380px]"}">${(0, import_index_b068bf91.d)([
    { label: "Rainbow Snake", path: "/snake" },
    {
      label: "Boxes & Dots",
      path: "/boxes-dots"
    },
    {
      label: "Tic Tac Toe",
      path: "/tic-tac-toe"
    }
  ], (link) => {
    return `<a${(0, import_index_b068bf91.b)("href", link.path, 0)} class="${"button glowing-button"}"><span class="${"inner"}"><span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <strong class="${"relative z-1"}">${(0, import_index_b068bf91.e)(link.label)}</strong></span>
            </a>`;
  })}</div>
</div>`;
});
