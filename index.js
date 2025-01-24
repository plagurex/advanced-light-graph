import {Graph} from './src/graph.js'

const array = [
    [2024, 100], [2025, 30], [2026, 40], [2027, 30], [2028, 20],
    [2029, 40], [2030, 30], [2031, 0], [2032, 20], [2033, 50],
    [2034, 20], [2035, 30], [2036, 40], [2037, 30], [2038, 20],
    [2039, 40], [2040, 0], [2041, 10], [2042, 20]
];

const graph = new Graph(700, 500);
graph.setProperty("padding", 20)
graph.setProperty("horizontalCoefficient", 4)
graph.setProperty("table", array)
graph.draw(document.body);



// const data = [
//     { name: 'Category A', value: 30 },
//     { name: 'Category B', value: 20 },
//     { name: 'Category C', value: 25 },
//     { name: 'Category D', value: 15 },
//     { name: 'Category E', value: 10 },
//     { name: 'Category F', value: 34 },
//     { name: 'Category G', value: 64 },
//     { name: 'Category H', value: 1 },
//     { name: 'Category I', value: 34 },
//     { name: 'Category J', value: 5 }
//   ];
  

// let svgContainer = document.getElementById("svg");

// let d = new Diogram(700, 700);
// d.setProperty("table", data)
// d.setProperty("minPercent", 5)
// d.draw(svgContainer);
