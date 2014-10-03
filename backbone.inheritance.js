(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone', 'exports'], function(_, Backbone, exports) {
            factory(root, _, Backbone);
        });
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore'),
            Backbone = require('backbone');

        factory(root, _, Backbone);
    } else {
        factory(root, root._, root.Backbone);
    }

}(this, function(root, _, Backbone) {
    var config = Backbone.inheritance = {
        viewOptions: ['events']
    };

    Backbone.View = (function(View) {
        return View.extend({
            constructor: function(options) {
                var parent, obj;

                _.each(config, function(prop) {
                    parent = this.constructor.__super__;
                    obj = {};

                    while (parent) {
                        if (parent[prop]) {
                            _.extend(obj, parent[prop]);
                        }

                        parent = parent.constructor.__super__;
                    }

                    this[prop] = _.extend({}, obj, this.constructor.prototype[prop]);
                }, this);

                View.apply(this, arguments);
            }
        });
    })(Backbone.View);
}));