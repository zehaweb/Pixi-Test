ShapesGeneratorController = function (model, view) {
    this.model = model;
    this.view = view;
    this.frameCounter = 0;

    this.view.background.click = function (e) {
        this.view.addShape(e.data.global.x, e.data.global.y, this.getRandomShapeType());
    }.bind(this);

    this.view.btnGVMax.addEventListener('click', function () {
        this.model.gravity++;
    }.bind(this));
    this.view.btnGVMin.addEventListener('click', function () {
        this.model.gravity--;
    }.bind(this));
    this.view.btnPerSecMax.addEventListener('click', function () {
        this.model.numberOfShapesPerSecond++;
    }.bind(this));
    this.view.btnPerSecMin.addEventListener('click', function () {
        this.model.numberOfShapesPerSecond--;
    }.bind(this));
};

ShapesGeneratorController.prototype = {
    animate: function () {
        this.frameCounter++;
        if (this.frameCounter == 60) {
            this.frameCounter = 0;

            this.addShapes();

            // get all pixels to calculate surface
            var pixels = this.view.renderer.extract.pixels(this.view.stage);
            var surface = 0;
            for (var i = 0; i < pixels.length; i+=4) {
                if (pixels[i] && pixels[i] !== 51 &&
                    pixels[i+1] !== 51 &&
                    pixels[i+2] !== 51) {
                    surface++
                }
            }

            this.model.surface = surface;
        }


    },

    addShapes: function () {
        for (var i = 0; i < this.model.numberOfShapesPerSecond; i++) {
            this.addRandomShape();
        }
    },

    addRandomShape: function () {
        var x = Math.floor(Math.random() * APP_WIDTH);
        var y = Math.floor(Math.random() * this.model.startShapesY + 1);
        var randomType = this.getRandomShapeType();
        this.view.addShape(x, y, randomType);
    },

    getRandomShapeType: function () {
        var types = [
            RandomShape.prototype,
            RandomShape.prototype,
            RandomShape.CIRCLE,
            RandomShape.ELLICPSE,
            RandomShape.RECT,
            RandomShape.TRIANGLE,
            RandomShape.PENTAGON,
            RandomShape.HEXGON,
            RandomShape.POLYGON,
            RandomShape.CLOUD
        ];
        return types[Math.floor(Math.random() * types.length)];
    }
};
ShapesGeneratorController.constructor = ShapesGeneratorController;