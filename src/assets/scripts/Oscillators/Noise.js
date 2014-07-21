define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var d3 = require('d3');
    var interpolation = d3.scale.linear()
    	.domain([0.0, 1.0])
		.range([1.0, -1.0]);

    var noise = function(t) {
    	var randomNumber = Math.random();
    	var result = interpolation(randomNumber);
    	return result;
    };

    return noise;
});