import { createSVGElement, generateColors, createSVGElement } from './functions.js'


export class Diagram {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.padding = 0;
        this.table = [];
        this.minPercent = 10;
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

    #createSector(ang1, ang2, color) {
        const rx = Math.max(0, this.width / 2 - this.padding);
        const ry = Math.max(0, this.height / 2 - this.padding);

        let x1 = this.width / 2     + rx * Math.cos(degreesToRadians(90 + ang1));
        let x2 = this.width / 2     + rx * Math.cos(degreesToRadians(90 + ang2));
        let y1 = this.height / 2    - ry * Math.sin(degreesToRadians(90 + ang1));
        let y2 = this.height / 2    - ry * Math.sin(degreesToRadians(90 + ang2));
    
        const largeArcFlag = Math.abs(ang2 - ang1) > 180 ? 1 : 0;
    
        let str = `M${x1},${y1} A${rx},${ry} 0 ${largeArcFlag},0 ${x2},${y2} L${this.width / 2},${this.height / 2} Z`;
    
        return createSVGElement("path", {
            d: str,
            fill: color,
            class: "sector"
        });
    }

    #createText(x, y, textContent) {
        // const text = document.createElement("p")
        // text.setAttribute("display", "absolule")
        // text.setAttribute("x", x)
        // text.setAttribute("y", y)
        const text = createSVGElement("text", {
            x: x,
            y: y,
            "font-size": 14,
            "font-family": "Helvetica",
            class: "text",
            fiil: "gray",
            "text-anchor": "middle"
        })
        text.textContent = textContent;
        return text;
    }
    
    draw(where, colors = null) {
        let svg = createSVGElement("svg", {
            width: this.width,
            height: this.height
        })
        if (!this.table) throw new Error("Data is not set");
        
        let totalValue = this.table.reduce((sum, entry) => sum + entry.value, 0);

        if (totalValue === 0) throw new Error("Total value of the table is zero. Cannot draw.");
        
        let currentAngle = 0;
        
        this.table.sort((a, b) => a.value - b.value);

        if (!colors) {
            colors = generateColors(this.table.length, 360 * Math.random())
            // colors.sort(() => Math.random() - 0.5)
        }
        
        const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        for (let i = 0; i < this.table.length; i++) {
            const angleStart = currentAngle;
            const angleEnd = currentAngle + (this.table[i].value / totalValue) * 360;
            
            const sector = this.#createSector(angleStart, angleEnd, colors[i]);
            svg.appendChild(sector);
            
            if (this.table[i].value > totalValue * this.minPercent / 100) {
                
                const midAngle = (angleStart + angleEnd) / 2;
                const radius = Math.max(0, this.width / 2 - this.padding) / 2;
                const textX = this.width / 2 + radius * Math.cos(degreesToRadians(90 + midAngle));
                const textY = this.height / 2 - radius * Math.sin(degreesToRadians(90 + midAngle));
                
                const sectorText = this.#createText(textX, textY, this.table[i].name);
                textGroup.appendChild(sectorText);
            }

            currentAngle = angleEnd;
        }
        
        svg.appendChild(textGroup);
        where.appendChild(svg)
    }
}
