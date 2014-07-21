define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    

    var TWO_PI = Math.PI * 2.0;
    var HERTZ_TO_KILOHERTZ = 1000;
    var KHZ_TO_RADIANS = TWO_PI / HERTZ_TO_KILOHERTZ;

    var Oscillator = function(oscillatorFunction, time) {
    	if (time == null) {
    		time = new Date.now();
    	}
    	this.init(oscillatorFunction, time);
    };

    var proto = Oscillator.prototype;

    proto.init = function(oscillatorFunction, time) {
    	if (typeof(oscillatorFunction) !== 'function') {
    		throw new Error('oscillatorFunction must be a function');
    	}

    	if (time == null) {
    		throw new Error('Time must be defined.');
    	}

    	this.generateSignal = oscillatorFunction;
    	this.setFrequency(1.0);
    	this.amplitude = 1.0;
    	this.phase = 0.0;
    	this.currentOffset = 0.0;
    	this.sync(time);
    };

    proto.setFrequency = function(frequencyInHertz) {
    	if (frequencyInHertz == null || isNaN(frequencyInHertz)) {
    		throw new Error('frequencyInHertz must be a number.');
    	}

    	if (frequencyInHertz < 0) {
    		return;
    	}

    	this.frequency = frequencyInHertz;
    };

    proto.sync = function(date) {
    	this.currentTime = date;
    	this.oldTime = date;
    	//this.currentOffset = 0.0;
    };

    proto.setPhase = function(phase) {
    	if (phase == null || isNaN(phase)) {
    		throw new Error('phase must be a number.');
    	}

    	this.phase = phase;
    };

    proto.setAmplitude = function(amplitude) {
    	if (amplitude == null || isNaN(amplitude)) {
    		throw new Error('amplitude must be a number.');
    	}

    	this.amplitude = amplitude;
    };

    // I want this to be deterministic, so you'll need to provide your input times...
    proto.sing = function(currentTime) {
    	this.oldTime = this.currentTime;
    	this.currentTime = currentTime;
    	var delta = this.currentTime - this.oldTime;
    	var deltaOffsetInRadians = this.delta * KHZ_TO_RADIANS;

    	this.currentOffset += (delta * this.frequency);
    	var asRadians = this.currentOffset * KHZ_TO_RADIANS;
    	var normalizedOffset = (asRadians + this.phase) % TWO_PI; // ignore phase for now.
    	
    	var signal = this.generateSignal(normalizedOffset);
    	var result = signal * this.amplitude;

    	return result;
    };

    proto.generateSignal = function(t) {
    	throw new Error('implement generateSignal at your earliest convenience.');
    }

    return Oscillator;
 });