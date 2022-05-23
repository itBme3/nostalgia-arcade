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
  default: () => Snake
});
module.exports = __toCommonJS(stdin_exports);
var import_index_b068bf91 = require("../../chunks/index-b068bf91.js");
var import_chroma_js = __toESM(require("chroma-js"));
var import_index_a608607f = require("../../chunks/index-a608607f.js");
var import_coloring_9fe4261b = require("../../chunks/coloring-9fe4261b.js");
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const browser = false;
const randomInt = (min, max, current = []) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  for (let i = 0; i < max * 10; i++) {
    let random = Math.floor(Math.random() * (max - min)) + min;
    if (!!!current.includes(random))
      return random;
    for (let x = 0; x < 10; x++) {
      const randomInc = random + x;
      if (!!!current.includes(random + x) && random + x <= max)
        return randomInc;
      const randomDec = random - x;
      if (!!!current.includes(randomDec) && randomDec >= min)
        return randomDec;
    }
  }
};
const direction = (0, import_index_a608607f.w)("right");
const squares = (0, import_index_a608607f.w)([]);
const occupied = (0, import_index_a608607f.w)([[3, 3]]);
const colors = (0, import_index_a608607f.d)(occupied, ($occupied) => (0, import_coloring_9fe4261b.g)($occupied));
const createDifficulty = () => {
  let stored = (() => {
    try {
      if (browser)
        ;
    } catch {
      return 5;
    }
  })();
  const { set, update, subscribe: subscribe2 } = (0, import_index_a608607f.w)(stored);
  return { set, update, subscribe: subscribe2 };
};
const difficulty = createDifficulty();
difficulty.subscribe((value) => {
  try {
    if (browser)
      ;
  } catch (err) {
    console.warn(err);
  }
});
const createFood = () => {
  const { subscribe: subscribe2, set, update } = (0, import_index_a608607f.w)([0, 0]);
  return {
    subscribe: subscribe2,
    set,
    update,
    reset: (matrixCount2) => set([randomInt(0, matrixCount2), randomInt(0, matrixCount2)])
  };
};
const food = createFood();
var SnakeSquare_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".snake-square.svelte-1t1okaj{position:relative;display:block;--tw-scale-x:.9;--tw-scale-y:.9;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgb(28 28 36 / var(--tw-bg-opacity));text-align:center\n}",
  map: null
};
const SnakeSquare = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let isOccupied;
  let isFood;
  let squareStyle;
  let $food, $$unsubscribe_food;
  let $occupied, $$unsubscribe_occupied;
  $$unsubscribe_food = (0, import_index_b068bf91.a)(food, (value) => $food = value);
  $$unsubscribe_occupied = (0, import_index_b068bf91.a)(occupied, (value) => $occupied = value);
  let { squareSize } = $$props;
  let { squareIndex } = $$props;
  let { bgColor } = $$props;
  if ($$props.squareSize === void 0 && $$bindings.squareSize && squareSize !== void 0)
    $$bindings.squareSize(squareSize);
  if ($$props.squareIndex === void 0 && $$bindings.squareIndex && squareIndex !== void 0)
    $$bindings.squareIndex(squareIndex);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  $$result.css.add(css$1);
  isOccupied = $occupied.map((s) => s.join()).includes(squareIndex.join());
  isFood = Array.isArray($food) && $food.join() === squareIndex.join();
  squareStyle = [
    `z-index: ${isFood ? "2" : "0"}`,
    `height: ${squareSize}`,
    `width: ${squareSize}`,
    isOccupied ? ` background-color: ${bgColor}; box-shadow: 0 0 120px ${(0, import_chroma_js.default)(bgColor).alpha(0.5)}` : ""
  ].join("; ");
  $$unsubscribe_food();
  $$unsubscribe_occupied();
  return `<div${(0, import_index_b068bf91.b)("id", `square-${squareIndex.join("-")}`, 0)} class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`snake-square${isOccupied ? " occupied" : ""}`)) + " svelte-1t1okaj"}"${(0, import_index_b068bf91.b)("style", squareStyle, 0)}>${isFood ? `<span class="${"absolute inset-px"}" style="${"background: url(/svg/peach.svg); background-size: 70% auto; background-position: center; background-repeat: no-repeat"}"></span>` : ``}
</div>`;
});
const createScores = () => {
  let stored = (() => {
    let defaultScores = { snake: [], ticTacToe: [] };
    try {
      if (browser)
        ;
    } catch {
      return defaultScores;
    }
  })();
  const { set, update, subscribe: subscribe2 } = (0, import_index_a608607f.w)(stored);
  return {
    subscribe: subscribe2,
    update: (key, value) => update((scores2) => {
      const current = scores2[key] || [];
      if (current.length >= 100) {
        current.pop();
      }
      return __spreadProps(__spreadValues({}, scores2), {
        [key]: [value, ...current]
      });
    }),
    set: (key, value) => set((scores2) => {
      return __spreadProps(__spreadValues({}, scores2), {
        [key]: value
      });
    })
  };
};
const scores = createScores();
scores.subscribe((value) => {
});
var snake_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-1qlqfxs{--button-color:rgb(255, 185, 185)}",
  map: null
};
let matrixCount = 30;
const Snake = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let boardWidth;
  let squareSize;
  let $$unsubscribe_difficulty;
  let $$unsubscribe_occupied;
  let $$unsubscribe_food;
  let $$unsubscribe_direction;
  let $$unsubscribe_squares;
  let $colors, $$unsubscribe_colors;
  $$unsubscribe_difficulty = (0, import_index_b068bf91.a)(difficulty, (value) => value);
  $$unsubscribe_occupied = (0, import_index_b068bf91.a)(occupied, (value) => value);
  $$unsubscribe_food = (0, import_index_b068bf91.a)(food, (value) => value);
  $$unsubscribe_direction = (0, import_index_b068bf91.a)(direction, (value) => value);
  $$unsubscribe_squares = (0, import_index_b068bf91.a)(squares, (value) => value);
  $$unsubscribe_colors = (0, import_index_b068bf91.a)(colors, (value) => $colors = value);
  let matrix = [...new Array(matrixCount)].map(() => [...new Array(matrixCount)].map(() => 0));
  squares.set(matrix.reduce((acc, row, i) => {
    return [...acc, ...row.map((col, ii) => [i, ii])];
  }, []));
  let w;
  let interval;
  (0, import_index_b068bf91.o)(() => {
    try {
      clearTimeout(interval);
    } catch {
    }
  });
  $$result.css.add(css);
  boardWidth = Math.floor((w - matrixCount) / matrixCount) * matrixCount;
  squareSize = `${Math.round(boardWidth / matrixCount)}px`;
  $$unsubscribe_difficulty();
  $$unsubscribe_occupied();
  $$unsubscribe_food();
  $$unsubscribe_direction();
  $$unsubscribe_squares();
  $$unsubscribe_colors();
  return `
<h1 class="${"text-xl text-gray-300 font-bold tracking-widest my-4"}"><span class="${"text-green-500"}">S</span><span class="${"text-cyan-500"}">N</span><span class="${"text-purple-500"}">A</span><span class="${"text-pink-500"}">K</span><span class="${"text-yellow-500"}">E</span></h1>


${``}

${``}



<div class="${"flex content-center text-center max-w-[calc(100vh-4rem)] mx-auto"}"><div class="${"snake-matrix mx-auto flex flex-col w-auto"}">${(0, import_index_b068bf91.d)(matrix, (row, i) => {
    return `<div class="${"matrix-row flex"}">${(0, import_index_b068bf91.d)(row, (square, ii) => {
      return `${(0, import_index_b068bf91.v)(SnakeSquare, "SnakeSquare").$$render($$result, {
        squareSize,
        squareIndex: [i, ii],
        bgColor: $colors[`${i},${ii}`]
      }, {}, {})}`;
    })}
      </div>`;
  })}</div>
</div>`;
});
