import { createSVGElement } from './functions.js'

export class Graph {
    constructor(width, height) {
        // Initialize graph dimensions and default properties
        this.width = width; // Width of the graph
        this.height = height; // Height of the graph
        this.padding = 10; // Padding around the graph
        this.verticalMarkLenght = 8; // Length of marks on the vertical axis
        this.horizontalMarkLenght = 8; // Length of marks on the horizontal axis
        this.table = null; // Placeholder for data to be plotted
        this.horizontalCoefficient = 2; // Determines major and minor marks on the x-axis
    }

    setProperty(property, value) {
        if (this.hasOwnProperty(property)) {
            // Update the property if it exists
            this[property] = value;
        } else {
            // Warn if the property does not exist
            console.warn(`Property "${property}" does not exist on this object.`);
        }
    }


    #drawAxes(where) {
        // Create vertical axis
        const verticalLine = createSVGElement("line", {
            x1: this.padding + 30,
            y1: this.padding,
            x2: this.padding + 30,
            y2: this.height - this.padding,
            stroke: "gray",
            "stroke-width": 2,
            class: "vertical-axis"
        });

        // Create horizontal axis
        const horizontalLine = createSVGElement("line", {
            x1: this.padding + 30,
            y1: this.height - this.padding,
            x2: this.width - this.padding,
            y2: this.height - this.padding,
            stroke: "gray",
            "stroke-width": 2,
            class: "horizontal-axis"
        });

        // Append axes to the parent SVG element
        where.appendChild(verticalLine);
        where.appendChild(horizontalLine);
    }

    // Method to draw axis marks and grid lines
    #drawAxisMarks(where, xStep, yMax) {
        const vertical = createSVGElement("g", { class: "vertical" }); // Group for vertical marks
        const horizontal = createSVGElement("g", { class: "horizontal" }); // Group for horizontal marks

        // Draw vertical axis marks and grid lines
        for (let i = 0; i <= 10; i++) {
            const y = this.height - this.padding - i * ((this.height - 2 * this.padding) / 10);

            if (i !== 0) {
                // Create horizontal grid lines
                horizontal.appendChild(createSVGElement("line", {
                    x1: this.padding + 30,
                    y1: y,
                    x2: this.width - this.padding,
                    y2: y,
                    stroke: "lightgray",
                    class: "grid-line"
                }));

                // Create vertical axis marks
                vertical.appendChild(createSVGElement("line", {
                    x1: this.padding + 30 - this.verticalMarkLenght / 2,
                    y1: y,
                    x2: this.padding + 30 + this.verticalMarkLenght / 2,
                    y2: y,
                    stroke: "gray",
                    "stroke-width": 2,
                    class: "mark"
                }));
            }

            // Add labels for vertical axis
            vertical.appendChild(createSVGElement("text", {
                x: this.padding + 20,
                y: y + 5,
                fill: "gray",
                "text-anchor": "end",
                "font-family": "Helvetica",
                "font-size": 14,
                class: "text"
            })).textContent = (i * (yMax / 10)).toFixed(1);
        }

        // Draw horizontal axis marks and labels
        for (let i = 0; i < this.table.length; i++) {
            const x = this.padding + i * xStep + 30;
            const isMajor = i % this.horizontalCoefficient === 0;

            if (i != 0) {
                // Create vertical grid lines
                horizontal.appendChild(createSVGElement("line", {
                    x1: x,
                    x2: x,
                    y1: this.padding,
                    y2: this.height - this.padding,
                    stroke: "#00000000", // Transparent grid lines
                    "stroke-width": 2,
                    class: "grid-line"
                }));

                // Create horizontal axis marks (major and minor)
                horizontal.appendChild(createSVGElement("line", {
                    x1: x,
                    x2: x,
                    y1: this.height - this.padding - 8 / (isMajor ? 2 : 4),
                    y2: this.height - this.padding + 8 / (isMajor ? 2 : 4),
                    stroke: "gray",
                    "stroke-width": 2,
                    class: "mark" + (isMajor ? " major" : " minor")
                }));
            }

            if (isMajor) {
                // Add labels for horizontal axis
                horizontal.appendChild(createSVGElement("text", {
                    x: x,
                    y: this.height - this.padding,
                    fill: "gray",
                    "text-anchor": "middle",
                    "font-family": "Helvetica",
                    "font-size": 14,
                    class: "text",
                    "dominant-baseline": "text-before-edge"
                })).textContent = this.table[i][0];
            }
        }
        where.appendChild(horizontal);
        where.appendChild(vertical);
    }

    // Method to draw the main graph line
    #drawGraph(where, array) {
        // Generate path data for the graph
        const pathData = array.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");

        // Create and append the path element
        where.appendChild(createSVGElement("path", {
            d: pathData,
            fill: "none",
            stroke: "red",
            "stroke-width": 2,
            class: "graph"
        }));
    }

    // Method to draw individual points on the graph
    #drawGraphPoints(where, array) {
        array.forEach(({ x, y }) => {
            where.appendChild(createSVGElement("circle", {
                cx: x,
                cy: y,
                r: 3, // Radius of the point
                fill: "red",
                class: "graph-point"
            }));
        });
    }

    // Method to draw the entire graph
    draw(where) {
        let svg = createSVGElement("svg", {
            height: this.height,
            width: this.width
        })
        if (!this.table) throw new Error("Data is not set");

        // Extract y-values and determine ranges
        const ys = this.table.map(row => row[1]);
        const xMin = this.table[0][0], xMax = this.table[this.table.length - 1][0];
        const yMin = Math.min(...ys), yMax = Math.max(...ys);

        // Calculate step sizes for x and y axes
        const xStep = (this.width - 2 * this.padding - 30) / (xMax - xMin);
        const yStep = (this.height - 2 * this.padding) / (yMax - yMin);

        // Map data points to coordinates in the SVG space
        const points = this.table.map(([x, y]) => ({
            x: (x - xMin) * xStep + 30 + this.padding,
            y: this.height - (y - yMin) * yStep - this.padding,
        }));

        // Create and append axes group
        const axes = createSVGElement("g", { class: "axes" });
        svg.appendChild(axes);

        this.#drawAxes(axes); // Draw axes
        this.#drawAxisMarks(axes, xStep, yMax); // Draw axis marks
        this.#drawGraph(svg, points); // Draw graph line
        this.#drawGraphPoints(svg, points); // Draw graph points
        where.appendChild(svg)
    }
}