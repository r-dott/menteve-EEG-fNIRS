import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface EEGGraphProps {
  data: number[][];
}

export const EEGGraph: React.FC<EEGGraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const channels = ['Ch1', 'Ch2', 'Ch3', 'Ch4'];
  const channel_colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

  const num_channels = 4;

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || data.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight*0.8;


    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Only create the base elements once
    if (svg.select('.grid-container').empty()) {
      svg.append('g').attr('class', 'grid-container');
      svg.append('g').attr('class', 'labels-container');
      svg.append('g').attr('class', 'lines-container');
    }

    const margins = {top:30, bottom:80, left:20, right: 20 };
    
    //for each channel
    const channelHeight = height / num_channels;
    const channelWidth = width -margins.right-margins.left;
    const eeg_min = -10;
    const eeg_max = 100;

    data.forEach((channelData, channelIndex) => {

      //scale
      const yScale = d3.scaleLinear()
      .domain([eeg_min, eeg_max])
      .range([channelHeight * (channelIndex + 1) - 10, channelHeight * channelIndex + 10]);
      const xScale = d3.scaleLinear()
      .domain([0, channelData.length - 1])
      .range([margins.left, width-margins.right]);
      

      const chartGroup = svg.append('g').attr('transform', `translate(${margins.left}, 0)`);

      // center gridline for each channel
      chartGroup.append('line')
        .attr('x1', margins.left)
        .attr('x2', channelWidth + margins.left)
        .attr('y1', channelHeight * channelIndex + channelHeight / 2)
        .attr('y2', channelHeight * channelIndex + channelHeight / 2)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.25);
      

      //line
      const line = d3.line<number>()
        .x((_, i) => xScale(i))
        .y(d => yScale(d));


      const linesGroup = chartGroup.append('g')
        .attr('clip-path', 'url(#clip)');
  
      linesGroup.append('path')
        .datum(channelData)
        .attr('fill', 'none')
        .attr('stroke', channel_colors[channelIndex])
        .attr('stroke-width', 1.5)
        .attr('d', line);

      

      chartGroup.append('text')
        .attr('x', margins.left - 30)
        .attr('y', channelHeight * channelIndex + channelHeight / 2 + 5)
        .attr('fill', channel_colors[channelIndex])
        .style('font-size', '12px')
        .text(channels[channelIndex]);

    });
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="bg-black" />
    </div>
  );
};