import { writable, derived } from 'svelte/store';

export const currentPlayer = writable(1);
export const boardDimensions = writable([6, 6]);
export const boardMatrix = derived(boardDimensions, ($boardDimensions) => {
  return [...new Array($boardDimensions[0])].map((row, rowIndex) =>
    [...new Array($boardDimensions[1])].map((col, colIndex) => [
      [`r${rowIndex}`, `r${rowIndex}`, `c${colIndex}`, `c${colIndex + 1}`],
      [
        `r${rowIndex}`,
        `r${rowIndex + 1}`,
        `c${colIndex + 1}`,
        `c${colIndex + 1}`,
      ],
      [
        `r${rowIndex + 1}`,
        `r${rowIndex + 1}`,
        `c${colIndex}`,
        `c${colIndex + 1}`,
      ],
      [`r${rowIndex}`, `r${rowIndex + 1}`, `c${colIndex}`, `c${colIndex}`],
    ])
  );
});
export const playerColors = writable({
  1: 'pink',
  2: 'cyan',
});

const createOccupied = () => {
  const { set, update, subscribe } = writable([]);
  return {
    subscribe,
    reset() {
      set([]);
    },
    update(newSide) {
      update((occupied) => {
        return [newSide, ...occupied];
      });
    },
  };
};

export const occupied = createOccupied();

const createOwnedSquares = () => {
  const { set, update, subscribe } = writable({ 1: [], 2: [] });
  return {
    subscribe,
    reset() {
      set({ 1: [], 2: [] });
    },
    update(player, square) {
      update((owned) => {
        console.log(owned);
        return {
          ...owned,
          [player]: [...owned[player], square],
        };
      });
    },
  };
};

export const ownedSquares = createOwnedSquares();

export const available = derived([boardMatrix, occupied], ($values, set) => {
  const allOccupied = [...$values[1][1], ...$values[1][2]].map((side) =>
    side.join()
  );
  const val = $values[0].reduce((acc, row) => {
    return row.reduce((rowAcc, col) => {
      try {
        const res = [
          ...rowAcc,
          ...col
            .map((side) => side.join())
            .filter(
              (side) => !allOccupied.includes(side) && !rowAcc.includes(side)
            ),
        ];
        return !Array.isArray(res) ? rowAcc : res;
      } catch {
        return rowAcc;
      }
    }, acc);
  }, []);
  set([...val]);
});


export const ownedSides = derived(ownedSquares, ownedSquares => {
  return [...ownedSquares['1'], ...ownedSquares['2']]
    .reduce((acc, square) => {
      return [...acc, ...square.split('-').reduce((_acc, sides) => {
        return [..._acc, ...sides.split('|')]
      }, [])]
    }, [])
});

export const availableSquareCount = derived([boardDimensions, ownedSquares], ($values, set) => {
  const totalSquares = $values[0][0] * $values[0][1];
  const totalOwned = $values[1]['1'].length + $values[1]['2'].length;
  set(totalSquares - totalOwned);
});

export const winner = derived([availableSquareCount, ownedSquares], ($values, set) => {
  set($values[0] > 0
    ? false
    : $values[1]['1'].length > $values[1]['2'].length
      ? '1'
      : $values[1]['2'].length > $values[1]['1'].length
        ? '2'
        : 'tie'
    )
})