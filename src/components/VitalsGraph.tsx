import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

//initializing datatype as array of 2 values
interface VitalsGraphProps {
  data: { HbO2: number; Hb: number; }[];
}

export const VitalsGraph: React.FC<VitalsGraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    //dimensions made responsive
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const margins = {top:30, bottom:80, left:40, right: 40 };
    const chartWidth = width - margins.left - margins.right;
    const chartHeight = height - margins.top - margins.bottom;

    svg.selectAll('*').remove();


    //CREATION
    //scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, chartWidth]);
    
    var fnir_min: number = -0.005;     //domain min
    var fnir_max: number = 0.005;   //domain max
    const yScale = d3.scaleLinear()
      .domain([fnir_min, fnir_max])
      .range([chartHeight, 0]);

    //axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickFormat((d,i) => `T-${data.length - i*10}`);
    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    //lines
    const line1 = d3.line<any>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d.HbO2));

    const line2 = d3.line<any>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d.Hb));


    //DISPLAYING
    const chartGroup = svg.append('g').attr('transform', `translate(${margins.left}, ${margins.top})`);

    //append axes
    chartGroup.append('g')
      .call(yAxis)
      .attr('class', 'y-axis')
      .attr('stroke', '#ffffff')
      .attr('font-size', '10px')
      .attr('color', '#ffffff');
    chartGroup.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .attr('class', 'x-axis')
      .attr('stroke', '#ffffff')
      .attr('font-size', '10px')
      .attr('color', '#ffffff');
    
    
    //append grid lines
    const gridLines = 10;
      for (let i = 1; i < gridLines; i++) {
        const yPosition = (chartHeight / gridLines) * i;
        
        chartGroup.append('line')
          .attr('x1', 0)
          .attr('x2', chartWidth)
          .attr('y1', yPosition)
          .attr('y2', yPosition)
          .attr('stroke', '#1a4f1f')
          .attr('stroke-width', 1);
      }


    //append lines
    const linesGroup = chartGroup.append('g')
      .attr('clip-path', 'url(#clip)');

    linesGroup.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 1.5)
      .attr('d', line1);

    linesGroup.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0000ff')
      .attr('stroke-width', 1.5)
      .attr('d', line2);
    
  

  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="bg-black" />
    </div>
  );
};