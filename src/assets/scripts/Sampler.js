define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var Buffer = require('Buffer');

    var d3 = require('d3');

    var Sampler = function(samplesPerSecond, bufferLengthInSeconds) {
    	if (isNaN(samplesPerSecond)) {
    		throw new Error('samplesPerSecond must be a number');
    	}

    	if (isNaN(bufferLengthInSeconds)) {
    		throw new Error('bufferLengthInSeconds must be a number');
    	}

    	this.init(samplesPerSecond, bufferLengthInSeconds);
    };

    var proto = Sampler.prototype;

    proto.init = function(samplesPerSecond, bufferLengthInSeconds) {
    	this.samplesPerSecond = samplesPerSecond;
    	var bufferLength = samplesPerSecond * bufferLengthInSeconds;
    	this.buffer = new Buffer(bufferLength);
    };

    proto.sample = function(startTime, stopTime, source) {
    	var length = stopTime - startTime;
    	length *= 16;
    	var lengthInSeconds = length;
    	var samples = lengthInSeconds * this.samplesPerSecond;
    	var interpolate = d3.scale.linear()
    		.domain([0, length])
    		.range([startTime, stopTime]);

    	var newSamples = [];

    	for (var i = 0; i < length; i++) {
    		var time = interpolate(i);
    		var sample = source.sing(time);
    		newSamples.push(sample);
    	}

    	var result = this.buffer.record(newSamples);
    	return result;
    };

    proto.sampleSmooth = function(startTime, stopTime, source) {
    	var length = stopTime - startTime;
    }

    return Sampler;
});