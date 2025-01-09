import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 12500 },
  { month: "Mar", value: 13500 },
  { month: "Apr", value: 14000 },
  { month: "May", value: 14500 },
  { month: "Jun", value: 15000 },
];

const PortfolioCard: React.FC = () => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Dimensions and margins
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value) ?? 0, d3.max(data, (d) => d.value) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create SVG
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear any previous chart

    svg
      .attr("width", width)
      .attr("height", height)
      .style("border-radius", "8px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)");

    // Draw X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "10px")
      .style("text-anchor", "middle");

    // Draw Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");

    // Draw Line
    const line = d3
      .line<{ month: string; value: number }>()
      .x((d) => xScale(d.month)! + xScale.bandwidth() / 2)
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#49d40d")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add Circles for Data Points
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.month)! + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .attr("fill", "#49d40d");
  }, []);

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Investment Portfolio</h2>
      <svg ref={chartRef}></svg>
      <p className="text-sm mt-4 text-gray-500">Total Portfolio Value: $15,000</p>
    </div>
  );
};

export default PortfolioCard;