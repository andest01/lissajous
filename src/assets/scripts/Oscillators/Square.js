define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var d3 = require('d3');
    var interpolate = d3.scale.linear()
    	.domain([0.0, Math.PI * 2.0])
    	.range([1.0, -1.0]);

    var square = function(t) {
    	var result = interpolate(t);
    	return result;
    };

    return square;
});