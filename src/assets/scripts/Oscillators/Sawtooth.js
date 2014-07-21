define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var d3 = require('d3');
    var interpolation = d3.scale.linear()
    	.domain([0.0, 2 * Math.PI])
		.range([1.0, -1.0]);

    var sawTooth = function(t) {
    	var result = interpolation(t);
    	return result;
    };

    return sawTooth;
});