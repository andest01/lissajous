define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var TARGET_CLASS = 'js-lissaload';
    var TARGET_SELECTOR = '.' + TARGET_CLASS;
    var d3 = require('d3');
    var SAMPLES_PER_SECOND = 8000;
    var SAMPLE_LENGTH_IN_SECONDS = 0.5;

    var Sampler = require('Sampler');

    var getFrequencyFromOctave = function(octave) {
    	var result = Math.pow(2.0, octave);
    	return result;
    };

   	var Oscilliscope = function(xOscillator, yOscillator) {
   		if (xOscillator == null) {
   			throw new Error('no xOscillator was supplied.')
   		}

   		if (yOscillator == null) {
   			throw new Error('no yOscillator was supplied');
   		}

   		this.xOscillator = xOscillator;
   		this.yOscillator = yOscillator;
   		this.init();
   	};

   	var proto = Oscilliscope.prototype;

   	proto.init = function() {
   		this.now = Date.now();
   		this.then = this.now;

   		this.xSampler = new Sampler(SAMPLES_PER_SECOND, SAMPLE_LENGTH_IN_SECONDS);
   		this.ySampler = new Sampler(SAMPLES_PER_SECOND, SAMPLE_LENGTH_IN_SECONDS);

   		this.isEnabled = false;

   		this.width = 1000,
    	this.height = 1000;

    	this.scaleX = d3.scale.linear()
			.domain([-1, 1])
			.range([0, this.width]);

		this.scaleY = d3.scale.linear()
			.domain([-1, 1])
			.range([0, this.height]);



		this.root = d3.select(TARGET_SELECTOR).node();
    	if (this.root == null) {
    		throw new Error('could not find root element with target class ' + TARGET_CLASS);
    	}

    	this.canvas = this.root.appendChild(document.createElement("canvas")),
        this.context = this.canvas.getContext("2d");

    	this.setupEvents();
   	};

   	proto.draw = function() {
   		this.then = this.now;
   		this.now = Date.now();


   		this.canvas.width = this.width;
      	this.canvas.height = this.height;

      	var xBuffer = this.xSampler.sample(this.then, this.now, this.xOscillator);
      	var yBuffer = this.ySampler.sample(this.then, this.now, this.yOscillator);

   		this.context.beginPath();
   		this.context.lineWidth = 0.1;
   		for (var i = 0; i < xBuffer.length; i++) {
   			var xSample = xBuffer[i];
   			var ySample = yBuffer[i];

   			var xCoordinate = this.scaleX(xSample);
   			var yCoordinate = this.scaleY(ySample);

   			this.context.lineTo(xCoordinate, yCoordinate);
   		}

   		this.context.stroke();
   	};

   	proto.turnOn = function() {   
   		if (this.isEnabled) {
   			return;
   		}

   		this.isEnabled = true;

   		d3.timer(this.draw.bind(this));
   	};

   	proto.turnOff = function() {
   		if (this.isEnabled == false) {
   			return;
   		}

   		this.isEnabled = false;
   	};

   	proto.destroy = function() {
   		// TODO: DESTROY DESTROY DESTROY
   	};

   	proto.setupEvents = function() {
   		d3.select('#js-x-frequency').on('input', function() {
			var value = d3.event.srcElement.valueAsNumber;
			var frequency = getFrequencyFromOctave(value);
			this.xOscillator.setFrequency(frequency);
		}.bind(this));

		d3.select('#js-y-frequency').on('input', function() {
			var value = d3.event.srcElement.valueAsNumber;
			var frequency = getFrequencyFromOctave(value);
			this.yOscillator.setFrequency(frequency);
		}.bind(this));

        d3.select('#js-buffer-length').on('input', function() {
        var value = d3.event.srcElement.valueAsNumber;
        this.xSampler.buffer.setBufferLength(value);
        this.ySampler.buffer.setBufferLength(value);
      }.bind(this));
   	}

   	return Oscilliscope;
});