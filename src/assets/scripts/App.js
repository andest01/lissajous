define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    var squareWave = require('Oscillators/Square');
    var sawtoothWave = require('Oscillators/Sawtooth');
    var sineWave = require('Oscillators/Sine');
    var triangleWave = require('Oscillators/Triangle');
    var noiseWave = require('Oscillators/Noise');

    var Oscillator = require('Oscillator');
    var Oscilliscope = require('Oscilliscope');

    var Sampler = require('Sampler');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        // Create your views here


        var then = 0;
        window.square = new Oscillator(squareWave, then);
        window.sawtooth = new Oscillator(sawtoothWave, then);
        window.sine = new Oscillator(sineWave, then);
        window.sine2 = new Oscillator(sineWave, then);
        window.sine2.setPhase(Math.PI * 0.5 )
        window.triangle = new Oscillator(triangleWave, then);
        window.noise = new Oscillator(noiseWave, then);

        var samplesPerSecond = 1000;
        var bufferLengthInSeconds = 2;
        var sampler = new Sampler(samplesPerSecond, bufferLengthInSeconds);

        var oscilliscope = new Oscilliscope(window.sine, window.sine2);
        oscilliscope.init();
        oscilliscope.turnOn();
    };

    return App;

});