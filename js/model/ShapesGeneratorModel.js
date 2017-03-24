ShapesGeneratorModel = function () {
    this.gravity = 1;
    this.surface = 0;
    this.numberOfShapesPerSecond = 1;
    this.spritesList = [];
    this.startShapesY = -160;
};

ShapesGeneratorModel.prototype = {
    addShape: function (sprite) {
        this.spritesList.push(sprite)
    },

    removeShape: function (sprite) {
        var index = this.spritesList.indexOf(sprite);
        this.spritesList.splice(index, 1);
    }
};
ShapesGeneratorModel.constructor = ShapesGeneratorModel;