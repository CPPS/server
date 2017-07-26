var model = {};

model.data = function (handler) {
    return function () {
        var values = Object.assign({}, this.get());
        if (handler) {
            _ = {};
            _.values = values;
            _.hide = function(element) {
                delete this.values[element];
                return this;
            };
            _.hideTimestamps = function() {
                this.hide('createdAt');
                this.hide('updatedAt');
            };

            handler(_);

            values = _.values;
        }

        return values;
    }
};

module.exports = model;
