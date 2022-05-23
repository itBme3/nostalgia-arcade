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
  default: () => Boxes_dots
});
module.exports = __toCommonJS(stdin_exports);
var import_index_b068bf91 = require("../../chunks/index-b068bf91.js");
var import_index_a608607f = require("../../chunks/index-a608607f.js");
var import_chroma_js = __toESM(require("chroma-js"));
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
const currentPlayer = (0, import_index_a608607f.w)(1);
const boardDimensions = (0, import_index_a608607f.w)([6, 6]);
const boardMatrix = (0, import_index_a608607f.d)(boardDimensions, ($boardDimensions) => {
  return [...new Array($boardDimensions[0])].map((row, rowIndex) => [...new Array($boardDimensions[1])].map((col, colIndex) => [
    [`r${rowIndex}`, `r${rowIndex}`, `c${colIndex}`, `c${colIndex + 1}`],
    [
      `r${rowIndex}`,
      `r${rowIndex + 1}`,
      `c${colIndex + 1}`,
      `c${colIndex + 1}`
    ],
    [
      `r${rowIndex + 1}`,
      `r${rowIndex + 1}`,
      `c${colIndex}`,
      `c${colIndex + 1}`
    ],
    [`r${rowIndex}`, `r${rowIndex + 1}`, `c${colIndex}`, `c${colIndex}`]
  ]));
});
const createOccupied = () => {
  const { set, update, subscribe: subscribe2 } = (0, import_index_a608607f.w)([]);
  return {
    subscribe: subscribe2,
    reset() {
      set([]);
    },
    update(newSide) {
      update((occupied2) => {
        return [newSide, ...occupied2];
      });
    }
  };
};
const occupied = createOccupied();
const createOwnedSquares = () => {
  const { set, update, subscribe: subscribe2 } = (0, import_index_a608607f.w)({ 1: [], 2: [] });
  return {
    subscribe: subscribe2,
    reset() {
      set({ 1: [], 2: [] });
    },
    update(player, square) {
      update((owned) => {
        console.log(owned);
        return __spreadProps(__spreadValues({}, owned), {
          [player]: [...owned[player], square]
        });
      });
    }
  };
};
const ownedSquares = createOwnedSquares();
(0, import_index_a608607f.d)([boardMatrix, occupied], ($values, set) => {
  const allOccupied = [...$values[1][1], ...$values[1][2]].map((side) => side.join());
  const val = $values[0].reduce((acc, row) => {
    return row.reduce((rowAcc, col) => {
      try {
        const res = [
          ...rowAcc,
          ...col.map((side) => side.join()).filter((side) => !allOccupied.includes(side) && !rowAcc.includes(side))
        ];
        return !Array.isArray(res) ? rowAcc : res;
      } catch {
        return rowAcc;
      }
    }, acc);
  }, []);
  set([...val]);
});
const ownedSides = (0, import_index_a608607f.d)(ownedSquares, (ownedSquares2) => {
  return [...ownedSquares2["1"], ...ownedSquares2["2"]].reduce((acc, square) => {
    return [...acc, ...square.split("-").reduce((_acc, sides) => {
      return [..._acc, ...sides.split("|")];
    }, [])];
  }, []);
});
const availableSquareCount = (0, import_index_a608607f.d)([boardDimensions, ownedSquares], ($values, set) => {
  const totalSquares = $values[0][0] * $values[0][1];
  const totalOwned = $values[1]["1"].length + $values[1]["2"].length;
  set(totalSquares - totalOwned);
});
const winner = (0, import_index_a608607f.d)([availableSquareCount, ownedSquares], ($values, set) => {
  set($values[0] > 0 ? false : $values[1]["1"].length > $values[1]["2"].length ? "1" : $values[1]["2"].length > $values[1]["1"].length ? "2" : "tie");
});
const confettiColors = {
  blue: [],
  pink: []
};
const blue = "#06b6d4";
const pink = "#ec4899";
for (let i = 0; i < 5; i++) {
  confettiColors.pink.push({
    front: (0, import_chroma_js.default)(pink).set("hsl.h", `*0.${97 - i}`).saturate(1).brighten(0.7),
    back: (0, import_chroma_js.default)(pink).set("hsl.h", `*0.${97 - i}`).saturate(1).darken(0.5)
  });
  confettiColors.blue.push({
    front: (0, import_chroma_js.default)(blue).set("hsl.h", `*0.${97 - i}`).saturate(1).brighten(0.7),
    back: (0, import_chroma_js.default)(blue).set("hsl.h", `*0.${97 - i}`).saturate(1).darken(0.5)
  });
}
var BoxesDotsSquare_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.connect-dot-square.svelte-1ao1x5a.svelte-1ao1x5a{position:relative;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgb(28 28 36 / var(--tw-bg-opacity))}.side.svelte-1ao1x5a.svelte-1ao1x5a{position:absolute;left:-1px;right:-1px;top:-1px;bottom:-1px;display:flex;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));align-content:center;align-items:center}.side.svelte-1ao1x5a.svelte-1ao1x5a::after{content:"";margin:auto;height:2px;width:2px;--tw-bg-opacity:1;background-color:rgb(16 16 21 / var(--tw-bg-opacity))}.side.top.svelte-1ao1x5a.svelte-1ao1x5a::after,.side.bottom.svelte-1ao1x5a.svelte-1ao1x5a::after{width:100%}.side.left.svelte-1ao1x5a.svelte-1ao1x5a::after,.side.right.svelte-1ao1x5a.svelte-1ao1x5a::after{height:100%}.side.top.svelte-1ao1x5a.svelte-1ao1x5a,.side.bottom.svelte-1ao1x5a.svelte-1ao1x5a{height:8px}.side.left.svelte-1ao1x5a.svelte-1ao1x5a,.side.right.svelte-1ao1x5a.svelte-1ao1x5a{width:8px}.side.top.svelte-1ao1x5a.svelte-1ao1x5a{bottom:auto;width:100%;--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.side.bottom.svelte-1ao1x5a.svelte-1ao1x5a{top:auto;width:100%;--tw-translate-y:50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.side.left.svelte-1ao1x5a.svelte-1ao1x5a{right:auto;height:100%;--tw-translate-x:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.side.right.svelte-1ao1x5a.svelte-1ao1x5a{left:auto;height:100%;--tw-translate-x:50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.owned-1.svelte-1ao1x5a.svelte-1ao1x5a,.owned-2.svelte-1ao1x5a.svelte-1ao1x5a{--tw-scale-x:.97;--tw-scale-y:.97;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.owned-1.svelte-1ao1x5a .side.svelte-1ao1x5a,.owned-2.svelte-1ao1x5a .side.svelte-1ao1x5a{display:none !important}.owned-1.svelte-1ao1x5a.svelte-1ao1x5a{--tw-bg-opacity:1;background-color:rgb(236 72 153 / var(--tw-bg-opacity))}.owned-2.svelte-1ao1x5a.svelte-1ao1x5a{--tw-bg-opacity:1;background-color:rgb(6 182 212 / var(--tw-bg-opacity))}.side.svelte-1ao1x5a.svelte-1ao1x5a:hover::after,.occupied-true.svelte-1ao1x5a.svelte-1ao1x5a::after{--tw-bg-opacity:1;background-color:rgb(186 187 195 / var(--tw-bg-opacity))}',
  map: null
};
const BoxesDotsSquare = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  var _a, _b;
  let occupiedSides;
  let ownsSquare;
  let $$unsubscribe_currentPlayer;
  let $ownedSquares, $$unsubscribe_ownedSquares;
  let $occupied, $$unsubscribe_occupied;
  let $ownedSides, $$unsubscribe_ownedSides;
  $$unsubscribe_currentPlayer = (0, import_index_b068bf91.a)(currentPlayer, (value) => value);
  $$unsubscribe_ownedSquares = (0, import_index_b068bf91.a)(ownedSquares, (value) => $ownedSquares = value);
  $$unsubscribe_occupied = (0, import_index_b068bf91.a)(occupied, (value) => $occupied = value);
  $$unsubscribe_ownedSides = (0, import_index_b068bf91.a)(ownedSides, (value) => $ownedSides = value);
  let { squareSize: squareSize2 } = $$props;
  let { sides } = $$props;
  let squareElem;
  const squareKey = sides.map((s) => s.join(",")).join("|");
  if ($$props.squareSize === void 0 && $$bindings.squareSize && squareSize2 !== void 0)
    $$bindings.squareSize(squareSize2);
  if ($$props.sides === void 0 && $$bindings.sides && sides !== void 0)
    $$bindings.sides(sides);
  $$result.css.add(css$2);
  occupiedSides = sides.map((side) => $occupied.map((i) => i.join(",")).includes(side.join(",")) ? true : false);
  ownsSquare = ((_a = $ownedSquares["1"]) == null ? void 0 : _a.includes(squareKey)) ? "1" : ((_b = $ownedSquares["2"]) == null ? void 0 : _b.includes(squareKey)) ? "2" : null;
  $$unsubscribe_currentPlayer();
  $$unsubscribe_ownedSquares();
  $$unsubscribe_occupied();
  $$unsubscribe_ownedSides();
  return `<div class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`connect-dot-square relative ${ownsSquare !== null ? `owned-${ownsSquare}` : ""}`)) + " svelte-1ao1x5a"}"${(0, import_index_b068bf91.b)("style", `height: ${squareSize2}px; width: ${squareSize2}px`, 0)}${(0, import_index_b068bf91.b)("this", squareElem, 0)}>${(0, import_index_b068bf91.d)(["top", "right", "bottom", "left"], (side, i) => {
    return `${!$ownedSides.includes(sides[i].join(",")) ? `<button class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`side ${side} occupied-${occupiedSides[i]}`)) + " svelte-1ao1x5a"}" ${occupiedSides[i] ? "disabled" : ""}></button>` : ``}`;
  })}

</div>`;
});
var BoxesDotsScore_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".scoreboard.svelte-m9etui.svelte-m9etui{margin-left:auto;margin-right:auto;display:flex;width:9rem;align-items:center\n}.scoreboard.svelte-m9etui span.svelte-m9etui{display:inline-block;border-radius:0.25rem;background-color:rgb(16 16 21 / var(--tw-bg-opacity));--tw-bg-opacity:0.8;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem\n}",
  map: null
};
const BoxesDotsScore = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let $ownedSquares, $$unsubscribe_ownedSquares;
  $$unsubscribe_ownedSquares = (0, import_index_b068bf91.a)(ownedSquares, (value) => $ownedSquares = value);
  $$result.css.add(css$1);
  $$unsubscribe_ownedSquares();
  return `<div class="${"scoreboard svelte-m9etui"}"><span class="${"text-pink-500 ml-auto svelte-m9etui"}">${(0, import_index_b068bf91.e)($ownedSquares["1"].length)}</span>
    <small class="${"mx-2"}">TO</small>
    <span class="${"text-cyan-500 mr-auto svelte-m9etui"}">${(0, import_index_b068bf91.e)($ownedSquares["2"].length)}</span>
</div>`;
});
const squareSize = 50;
const BoxesDotsBoard = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let $currentPlayer, $$unsubscribe_currentPlayer;
  let $boardMatrix, $$unsubscribe_boardMatrix;
  $$unsubscribe_currentPlayer = (0, import_index_b068bf91.a)(currentPlayer, (value) => $currentPlayer = value);
  $$unsubscribe_boardMatrix = (0, import_index_b068bf91.a)(boardMatrix, (value) => $boardMatrix = value);
  $$unsubscribe_currentPlayer();
  $$unsubscribe_boardMatrix();
  return `
<h1 class="${"text-xl tracking-wider text-gray-800 py-4 font-bold " + (0, import_index_b068bf91.e)($currentPlayer === 1 ? "bg-pink-500" : "bg-cyan-500")}">Player ${(0, import_index_b068bf91.e)($currentPlayer)}&#39;s Turn</h1>

<div class="${"my-2 text-gray-600"}">${(0, import_index_b068bf91.v)(BoxesDotsScore, "BoxesDotsScore").$$render($$result, {}, {}, {})}</div>

<div class="${"flex content-center text-center max-w-lg w-[calc(100vw-2rem)] h-[80vh] mx-auto"}"><div class="${"boxes-dots-matrix mx-auto flex flex-col w-auto"}">${(0, import_index_b068bf91.d)($boardMatrix, (row, i) => {
    return `<div class="${"matrix-row flex"}">${(0, import_index_b068bf91.d)(row, (square, ii) => {
      return `${(0, import_index_b068bf91.v)(BoxesDotsSquare, "BoxesDotsSquare").$$render($$result, { squareSize, sides: $boardMatrix[i][ii] }, {}, {})}`;
    })}
      </div>`;
  })}</div></div>`;
});
var BoxesDotsWinnerMessage_svelte_svelte_type_style_lang = "";
const css = {
  code: ".winner-1.svelte-1l08on9.svelte-1l08on9{--tw-bg-opacity:1;background-color:rgb(236 72 153 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(131 24 67 / var(--tw-text-opacity))}.winner-2.svelte-1l08on9.svelte-1l08on9{--tw-bg-opacity:1;background-color:rgb(6 182 212 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(22 78 99 / var(--tw-text-opacity))}button.svelte-1l08on9.svelte-1l08on9{--button-color:rgb(176 128 217)}button.svelte-1l08on9.svelte-1l08on9:hover{--tw-text-opacity:1;color:rgb(28 28 36 / var(--tw-text-opacity))}.winner-1.svelte-1l08on9 button.svelte-1l08on9{--button-color:rgb(253, 162, 232)}.winner-2.svelte-1l08on9 button.svelte-1l08on9{--button-color:rgb(0, 255, 255)}",
  map: null
};
const BoxesDotsWinnerMessage = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let message;
  let $winner, $$unsubscribe_winner;
  $$unsubscribe_winner = (0, import_index_b068bf91.a)(winner, (value) => $winner = value);
  $$result.css.add(css);
  message = !$winner ? false : $winner === "tie" ? `That's a Tie...` : `Player ${$winner} Wins!`;
  $$unsubscribe_winner();
  return `<div class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`flex flex-col w-screen h-screen items-center content-center winner-${$winner}`)) + " svelte-1l08on9"}"><div class="${"message flex m-auto flex-col content-center items-center mt-auto mb-6"}"><h1 class="${"text-4xl sm:text-6xl font-black text-center leading-normal"}">${(0, import_index_b068bf91.e)(message)}</h1></div>
    ${(0, import_index_b068bf91.v)(BoxesDotsScore, "BoxesDotsScore").$$render($$result, {}, {}, {})}
    <button class="${"button neon-button mt-6 mb-auto w-40 rounded-md mt-8 svelte-1l08on9"}">Play Again
    </button>
</div>`;
});
const Boxes_dots = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let $winner, $$unsubscribe_winner;
  $$unsubscribe_winner = (0, import_index_b068bf91.a)(winner, (value) => $winner = value);
  $$unsubscribe_winner();
  return `${!$winner ? `${(0, import_index_b068bf91.v)(BoxesDotsBoard, "BoxesDotsBoard").$$render($$result, {}, {}, {})}` : `${(0, import_index_b068bf91.v)(BoxesDotsWinnerMessage, "BoxesDotsWinnerMessage").$$render($$result, {}, {}, {})}`}`;
});
