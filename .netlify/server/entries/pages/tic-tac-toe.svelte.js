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
  default: () => Tic_tac_toe
});
module.exports = __toCommonJS(stdin_exports);
var import_index_b068bf91 = require("../../chunks/index-b068bf91.js");
var import_index_a608607f = require("../../chunks/index-a608607f.js");
const createBoard = () => {
  const { set, update, subscribe: subscribe2 } = (0, import_index_a608607f.w)([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  return {
    subscribe: subscribe2,
    setSpace({ row, col, player }) {
      console.log({ row, col, player });
      update((board2) => {
        board2[row][col] = player;
        console.log(board2);
        return board2;
      });
    },
    reset() {
      set([
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]);
    }
  };
};
const board = createBoard();
const currentPlayer = (0, import_index_a608607f.w)("x");
const determineWinner = (board2, currentPlayer2, returnIndexes = false) => {
  const winningPatterns = [
    [board2[0][0], board2[0][1], board2[0][2]],
    [board2[1][0], board2[1][1], board2[1][2]],
    [board2[2][0], board2[2][1], board2[2][2]],
    [board2[0][0], board2[1][0], board2[2][0]],
    [board2[0][1], board2[1][1], board2[2][1]],
    [board2[0][2], board2[1][2], board2[2][2]],
    [board2[0][0], board2[1][1], board2[2][2]],
    [board2[0][2], board2[1][1], board2[2][0]]
  ];
  const spaceIndexes = [
    ["0,0", "0,1", "0,2"],
    ["1,0", "1,1", "1,2"],
    ["2,0", "2,1", "2,2"],
    ["0,0", "1,0", "2,0"],
    ["0,1", "1,1", "2,1"],
    ["0,2", "1,2", "2,2"],
    ["0,0", "1,1", "2,2"],
    ["0,2", "1,1", "2,0"]
  ];
  const winner = (() => {
    const isWinner = {
      x: winningPatterns.filter((arr) => arr.filter((space) => space === "x").length === 3).length > 0,
      o: winningPatterns.filter((arr) => arr.filter((space) => space === "o").length === 3).length > 0
    };
    return Object.keys(isWinner).filter((k) => isWinner[k])[0] || null;
  })();
  const isCats = (() => {
    const canWin = {
      x: winningPatterns.map((arr) => arr.map((space) => space === null ? "x" : space)).filter((arr) => arr.filter((space) => space === "x").length === 3).length > 0,
      o: winningPatterns.map((arr) => arr.map((space) => space === null ? "o" : space)).filter((arr) => arr.filter((space) => space === "o").length === 3).length > 0
    };
    const potentialWinners = Object.keys(canWin).filter((k) => canWin[k]);
    const spacesLeft = board2.reduce((acc, row) => {
      const inRow = row.filter((space) => space === null).length;
      return acc + inRow;
    }, 0);
    if (!potentialWinners.length || spacesLeft === 1 && !canWin[currentPlayer2]) {
      return true;
    }
    return false;
  })();
  if (!returnIndexes) {
    console.log(isCats ? "cats" : winner);
    return isCats ? "cats" : winner;
  }
  if (isCats || !winner) {
    return [];
  }
  const spaces = winningPatterns.reduce((acc, arr, i) => {
    if (arr.filter((space) => space === winner).length === 3) {
      console.log({ i, arr });
      return [...acc, ...spaceIndexes[i]];
    }
    return acc;
  }, []);
  console.log({ spaces });
  return spaces;
};
const results = (0, import_index_a608607f.d)([board, currentPlayer], (vals) => {
  return determineWinner(vals[0], vals[1]);
});
const winningSpaces = (0, import_index_a608607f.d)([board, currentPlayer], (vals) => {
  const spaces = determineWinner(vals[0], vals[1], true);
  console.log({ spaces });
  return spaces;
});
var ticTacToe_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tic-tac-toe-board.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{margin-left:auto;margin-right:auto;max-width:400px}.tic-tac-toe-board.svelte-1thduqj>.svelte-1thduqj:not([hidden])~.svelte-1thduqj.svelte-1thduqj:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.tic-tac-toe-board.svelte-1thduqj .row.svelte-1thduqj>.svelte-1thduqj:not([hidden])~.svelte-1thduqj:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.25rem * var(--tw-space-x-reverse));margin-left:calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))}.space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{display:flex;height:6rem;width:33.333333%;cursor:pointer;align-content:center;align-items:center;border-radius:0.25rem;--tw-bg-opacity:1;background-color:rgb(28 28 36 / var(--tw-bg-opacity));text-align:center;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj:disabled,.space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj:hover{--tw-bg-opacity:0.5}.space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj:disabled{cursor:default}.results-o.svelte-1thduqj .tic-tac-toe-board.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj,.results-x.svelte-1thduqj .tic-tac-toe-board.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.results-x.svelte-1thduqj .space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj,.results-o.svelte-1thduqj .space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{cursor:default;--tw-bg-opacity:1;opacity:0.05}.results-cats.svelte-1thduqj .space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{opacity:0}.results-o.svelte-1thduqj .space.winning-space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj,.results-x.svelte-1thduqj .space.winning-space.svelte-1thduqj.svelte-1thduqj.svelte-1thduqj{opacity:1}.results-x .neon-button{--button-color:#ff89d8 !important}.results-o .neon-button{--button-color:#75eaff !important}.results-cats .neon-button{--button-color:#FBE578 !important}",
  map: null
};
const Tic_tac_toe = (0, import_index_b068bf91.c)(($$result, $$props, $$bindings, slots) => {
  let $results, $$unsubscribe_results;
  let $board, $$unsubscribe_board;
  let $winningSpaces, $$unsubscribe_winningSpaces;
  $$unsubscribe_results = (0, import_index_b068bf91.a)(results, (value) => $results = value);
  $$unsubscribe_board = (0, import_index_b068bf91.a)(board, (value) => $board = value);
  $$unsubscribe_winningSpaces = (0, import_index_b068bf91.a)(winningSpaces, (value) => $winningSpaces = value);
  let currentPlayer2 = "x";
  $$result.css.add(css);
  (() => {
    const classes = {
      x: "bg-pink-500",
      o: "bg-cyan-500",
      cats: "bg-yellow-500"
    };
    return classes[$results];
  })();
  $$unsubscribe_results();
  $$unsubscribe_board();
  $$unsubscribe_winningSpaces();
  return `<div class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`results-${$results}`)) + " svelte-1thduqj"}">${typeof $results === "string" ? `<div class="${"gameover-message text-4xl text-center mx-auto mt-6 max-w-xs svelte-1thduqj"}"><h2 class="${"mb-6 font-arcade uppercase opacity-70 leading-relaxed"}">${$results === "cats" ? `Cat&#39;s Game` : `${(0, import_index_b068bf91.e)($results)}<span class="${"lowercase"}">s</span> win!`}</h2>
            <button class="${"button neon-button text-xl font-arcade"}">play again
            </button>
            ${$results === "cats" ? `<img class="${"mx-auto mt-20"}" src="${"/svg/cat.svg"}" alt="${"cat's game"}">` : ``}</div>` : `<h2 class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`text-2xl uppercase py-2 ${"bg-pink-500 text-pink-900"}`)) + " svelte-1thduqj"}">${(0, import_index_b068bf91.e)(currentPlayer2)}&#39;<span class="${"lowercase"}">s</span> Turn
    </h2>`}

    <div class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`tic-tac-toe-board h-auto mt-12 relative`)) + " svelte-1thduqj"}">${(0, import_index_b068bf91.d)($board, (row, i) => {
    return `<div class="${"row flex items-center content-center m-auto svelte-1thduqj"}">${(0, import_index_b068bf91.d)(row, (space, ii) => {
      return `<button class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`space${$winningSpaces.includes(`${i},${ii}`) ? " winning-space" : ""}`)) + " svelte-1thduqj"}" ${$board[i][ii] !== null ? "disabled" : ""}><span class="${(0, import_index_b068bf91.e)((0, import_index_b068bf91.n)(`m-auto text-4xl ${space === "x" ? "text-pink-500" : "text-cyan-500"}`)) + " svelte-1thduqj"}">${(0, import_index_b068bf91.e)(["x", "o"].includes(space) ? space : "")}</span>
            </button>`;
    })}
        </div>`;
  })}</div>
</div>`;
});
