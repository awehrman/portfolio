import * as d3 from 'd3';

const data1 = [
	{ 'label': 'Front-End', 'percent': 55 },
	{ 'label': 'Back-End', 'percent': 35 },
	{ 'label': 'Meetings', 'percent': 10 }
];

const data2 = [
	{ 'label': 'Front-End', 'percent': 30 },
	{ 'label': 'Back-End', 'percent': 50 },
	{ 'label': 'Meetings', 'percent': 20 }
];

const width = 200,
	height = 200,
	radius = Math.min(width, height) / 2;

const color = d3.scaleOrdinal()
	.range([
		'#58D68D',
		'#F2C93B',
		'#F56C4E'
	]);

const pie = d3.pie()
	.value(function(d) {
		return d.percent;
	})(data2);

const arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

const labelArc = d3.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

const svg = d3.select('#FH_pie')
	.append('svg')
	.attr('width', width)
	.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + width/2 + ',' + height/2 +')');

const g = svg.selectAll('arc')
	.data(pie)
	.enter().append('g')
	.attr('class', 'arc');

g.append('path')
	.attr('d', arc)
	.style('fill', function(d) { return color(d.data.label);});

g.append('text')
	.attr('transform', function(d) { return 'translate(' + labelArc.centroid(d) + ')'; })
	.text(function(d) { return d.data.label;})
	.style('fill', '#373D3F');