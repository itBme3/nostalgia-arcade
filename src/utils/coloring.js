import { scale } from 'chroma-js';
// export const rainbow = [
//   // '#a2fc3b',
//   '#04fc84',
//   // '#2e42f7', 
//   '#03f4f4',  
//   '#8735ff', 
//   '#ff479c', 
//   '#fffb38', 
//   '#00FF3F', 
//   // '#ff817c', 
// ];
export const rainbow = ['#00ff3f', '#35b5ff', '#8735ff', '#ff479c', '#fffb38'];

export const getColors = (occupied) => {
  const colorScale = rainbow.slice(
    0,
    occupied.length < 5
      ? 2
      : occupied.length < 10
      ? 3
      : occupied.length < 18
      ? 4
      : 5
  );
  const colors = scale(colorScale).colors(occupied.length);
  return occupied.reduce((acc, coordinates, i) => {
    return { ...acc, [coordinates.join()]: colors[i] };
  }, {});
};


