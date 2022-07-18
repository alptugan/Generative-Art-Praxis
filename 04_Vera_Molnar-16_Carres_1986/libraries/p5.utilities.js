(function(root, factory) {
    if (typeof define === 'function' && define.amd)
        define('p5.Utils', ['p5'], function(p5) {
            (factory(p5));
        });
    else if (typeof exports === 'object')
        factory(require('../p5'));
    else
        factory(root['p5']);
}(this, function(p5) {
    // =============================================================================
    //                         p5.Utils
    // =============================================================================

    /**
     * Base class for a function generator
     *
     * @class p5.Utils
     * @constructor
     */
    p5.Utils = function() {

        this.version = 0.01; // 

        var that = this; // 
    }; // end p5.Utils constructor


    // Timestamp function
    p5.Utils.prototype.getTimeStamp = function(_date = true) {

        var _tv = (hour() + "-" + minute() + "-" + second());
        var _dv = (year() + "-" + month() + "-" + day());
        var _t = "";
        if (_date) {
            _t = _dv + "_" + _tv;
        } else {
            _t = _tv;
        }

        return _t;
    };

    // Save canvas with timestamp
    p5.Utils.prototype.saveCanvas = function(_prefix, _suffix = ".png") {
        saveCanvas(_prefix + "_" + this.getTimeStamp() + _suffix);
    };

}));

// Template
p5.prototype.fooMethod = function() {
    fill(0, 102, 153);
    text("Title", 8, 22);

    // It can be called as
    // fooMethod();
    // in sketch.js file
}