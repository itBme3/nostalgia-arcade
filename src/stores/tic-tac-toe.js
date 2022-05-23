import { writable, derived } from 'svelte/store';

export const createBoard = () => {
      const { set, update, subscribe } = writable([
            [null, null, null],
            [null, null, null],
            [null, null, null]
      ]);
      return {
            subscribe,
            setSpace ({ row, col, player }) {
                  console.log({ row, col, player })
                  update((board) => {
                        board[row][col] = player;
                        console.log(board);
                        return board
                  })
            },
            reset () {
                  set([
                        [null, null, null],
                        [null, null, null],
                        [null, null, null]
                  ])
            }
      }
}

export const board = createBoard();

export const currentPlayer = writable('x')

const determineWinner = (board, currentPlayer, returnIndexes = false) => {
      const winningPatterns = [
            // rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
      ];
      const spaceIndexes = [
            // rows
            ['0,0','0,1','0,2'],
            ['1,0','1,1','1,2'],
            ['2,0','2,1','2,2'],
            // columns
            ['0,0','1,0','2,0'],
            ['0,1','1,1','2,1'],
            ['0,2','1,2','2,2'],
            // diagonals
            ['0,0','1,1','2,2'],
            ['0,2','1,1','2,0'],
      ];
      const winner = (() => {
            const isWinner = {
                  x: winningPatterns.filter(arr => arr.filter(space => space === 'x').length === 3).length > 0,
                  o: winningPatterns.filter(arr => arr.filter(space => space === 'o').length === 3).length > 0,
            }
            return Object.keys(isWinner).filter(k => isWinner[k])[0] || null
      })();

      const isCats = (() => {
            const canWin = {
                  x: winningPatterns.map(arr => arr.map(space => space === null ? 'x' : space))
                        .filter(arr => arr.filter(space => space === 'x').length === 3).length > 0,
                  o: winningPatterns.map(arr => arr.map(space => space === null ? 'o' : space))
                        .filter(arr => arr.filter(space => space === 'o').length === 3).length > 0,
            }
            const potentialWinners = Object.keys(canWin).filter(k => canWin[k]);
            const spacesLeft = board.reduce((acc, row) => {
                  const inRow = row.filter(space => space === null).length;
                  return acc + inRow
            }, 0);
            if (!potentialWinners.length || (spacesLeft === 1 && !canWin[currentPlayer])) {
                  return true
            }
            return false
      })();
      
      if (!returnIndexes) {
            console.log(isCats ? 'cats' : winner)
            return isCats ? 'cats' : winner
      }
      if (isCats || !winner) {
            return []
      }
      const spaces = winningPatterns.reduce((acc, arr, i) => {
            if (arr.filter(space => space === winner).length === 3) {
                  console.log({i, arr})
                  return [...acc, ...spaceIndexes[i]]
            }
            return acc
      }, [])
      console.log({spaces})
      return spaces 
}
export const results = derived([board, currentPlayer], vals => {
      
      return determineWinner(vals[0], vals[1]);

      
});

export const winningSpaces = derived([board, currentPlayer], vals => {
      const spaces = determineWinner(vals[0], vals[1], true);
      console.log({ spaces })
      return spaces;
})