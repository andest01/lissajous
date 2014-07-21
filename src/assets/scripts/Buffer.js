define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var d3 = require('d3');

    var Buffer = function(maxBufferLength) {
    	if (isNaN(maxBufferLength)) {
    		throw new Error('maxBufferLength must be a number');
    	}

    	this.init(maxBufferLength);
    };

    var proto = Buffer.prototype;

    proto.init = function(maxBufferLength) {
    	this.maxBufferLength = maxBufferLength;
    	this.buffer = [];
    };

    proto.setBufferLength = function(bufferLength) {
        if (isNaN(bufferLength)) {
            throw new Error('bufferLength must be a number');
        }

        this.maxBufferLength = bufferLength;
    };

    proto.trimBuffer = function(newSample) {
    	var newSampleLength = newSample.length;
    	var currentLength = this.buffer.length;
    	if (currentLength + newSampleLength > this.maxBufferLength) {
    		var numberOfSamplesToSlice = (currentLength + newSampleLength) - this.maxBufferLength;
    		return this.buffer.slice(numberOfSamplesToSlice);
    	}

    	return this.buffer;
    };

    proto.record = function(newSample) {
    	this.buffer = this.trimBuffer(newSample);
		this.buffer.push.apply(this.buffer, newSample);

		return this.buffer;
    };

    return Buffer;
});