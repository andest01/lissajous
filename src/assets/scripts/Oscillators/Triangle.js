define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var d3 = require('d3');
    var interpolate = d3.scale.linear()
    	.domain([0.0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2.0])
    	.range([0.0, 1.0, 0.0, -1.0, 0.0]);

    var triangle = function(t) {
    	var result = interpolate(t);
    	return result;
    };

    return triangle;
});