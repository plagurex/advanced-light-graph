## Overview
The Infographics Library provides tools to create scalable, customizable SVG-based infographics such as line graphs and pie charts (diagrams). The library is lightweight and built to work seamlessly with modern JavaScript environments. This guide walks you through its installation, usage, and key features.

---

## Installation

The library is hosted on npm. You can install it using npm or yarn:

```bash
npm install advanced-light-graph
```

---

## Quick Start

Here is how you can quickly get started with creating graphs and diagrams:

### Line Graph Example
```javascript
import { Graph } from 'advanced-light-graph';

const graph = new Graph(600, 400); // Width: 600px, Height: 400px
graph.table = [
    [0, 10],
    [1, 20],
    [2, 15],
    [3, 25],
    [4, 30],
]; // Set data for the graph

const container = document.getElementById('graph-container'); // A container div or element in your HTML
graph.draw(container); // Render the graph
```

### Pie Chart (Diagram) Example
```javascript
import { Diagram } from 'advanced-light-graph';

const Diagram = new Diagram(400, 400); // Width: 400px, Height: 400px
Diagram.table = [
    { name: "Category A", value: 40 },
    { name: "Category B", value: 30 },
    { name: "Category C", value: 20 },
    { name: "Category D", value: 10 },
]; // Set data for the pie chart

const container = document.getElementById('pie-container'); // A container div or element in your HTML
Diagram.draw(container); // Render the pie chart
```

---

## Features

### Graph Class
The `Graph` class is used to create line graphs. It supports axes, grid lines, and data points. 

#### Constructor
```javascript
const graph = new Graph(width, height);
```
- **`width`**: The width of the graph in pixels.
- **`height`**: The height of the graph in pixels.

#### Properties
- **`padding`**: Space between the edges of the graph and the content (default: `10`).
- **`verticalMarkLength`**: Length of the marks on the vertical axis (default: `8`).
- **`horizontalMarkLength`**: Length of the marks on the horizontal axis (default: `8`).
- **`horizontalCoefficient`**: Controls the major/minor tick marks on the horizontal axis (default: `2`).
- **`table`**: The data to plot, in the format `[[x1, y1], [x2, y2], ...]`.

#### Methods
- **`setProperty(property, value)`**: Dynamically set a property. If the property doesn't exist, a warning is issued.
- **`draw(where)`**: Renders the graph inside the given container (a DOM element).

#### Example
```javascript
const graph = new Graph(800, 600);
graph.table = [
    [0, 5],
    [1, 15],
    [2, 25],
    [3, 20],
    [4, 35],
];
graph.setProperty("padding", 20); // Adjust padding
graph.draw(document.getElementById('graph-container'));
```

---

### Diagram Class
The `Diagram` class is used to create pie charts. It supports customizable labels, colors, and segment sizes.

#### Constructor
```javascript
const Diagram = new Diagram(width, height);
```
- **`width`**: The width of the pie chart in pixels.
- **`height`**: The height of the pie chart in pixels.

#### Properties
- **`padding`**: Space between the edges of the chart and the segments (default: `0`).
- **`table`**: The data to display, in the format `[{ name: "Label1", value: X }, ...]`.
- **`minPercent`**: Minimum percentage a segment must have to show a label (default: `10`).

#### Methods
- **`setProperty(property, value)`**: Dynamically set a property. If the property doesn't exist, a warning is issued.
- **`draw(where, colors)`**: Renders the pie chart in the given container. Optionally, pass an array of colors for customization.

#### Example
```javascript
const Diagram = new Diagram(500, 500);
Diagram.table = [
    { name: "Apple", value: 45 },
    { name: "Banana", value: 25 },
    { name: "Cherry", value: 15 },
    { name: "Date", value: 15 },
];
Diagram.draw(document.getElementById('pie-container'));
```


---

## Advanced Examples

### Customizing Line Graph Axes
You can modify the graph’s axes by adjusting the `horizontalCoefficient` or `padding`.

```javascript
graph.setProperty('horizontalCoefficient', 3);
graph.setProperty('padding', 20);
```

### Customizing Pie Chart Colors
```javascript
const customColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];
Diagram.draw(document.getElementById('pie-container'), customColors);
```

---

## Error Handling
- If no data is provided (`table` is not set), the `draw` method will throw an error: `"Data is not set"`.
- For pie charts, if the total value of the dataset is zero, an error will be thrown: `"Total value of the table is zero. Cannot draw."`

---

## Browser Compatibility
The library works in all modern browsers that support SVG elements. Ensure your environment supports ES6 modules.
