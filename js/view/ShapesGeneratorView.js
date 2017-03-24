ShapesGeneratorView = function (model, stage, renderer) {
    this.model = model;
    this.stage = stage;
    this.renderer = renderer;

    this.shapes = document.getElementById("shapes");
    this.perSec = document.getElementById("perSec");
    this.gv = document.getElementById("gv");
    this.surface = document.getElementById("surface");

    this.btnGVMax = document.getElementById("btnGVMax");
    this.btnGVMin = document.getElementById("btnGVMin");
    this.btnPerSecMax = document.getElementById("btnPerSecMax");
    this.btnPerSecMin = document.getElementById("btnPerSecMin");

    var BG = new PIXI.Graphics();
    BG.beginFill(0x333333);
    BG.drawRect(0, 0, APP_WIDTH, APP_HEIGHT);
    BG.endFill();
    var texture = BG.generateTexture();

    this.background = new PIXI.Sprite(texture);
    this.background.interactive = true;
    this.stage.addChild(this.background);
};

ShapesGeneratorView.prototype = {
    animate: function () {
        this.shapes.innerHTML = '' + this.model.spritesList.length;
        this.perSec.innerHTML = '' + this.model.numberOfShapesPerSecond;
        this.gv.innerHTML = '' + this.model.gravity;
        this.surface.innerHTML = '' + this.model.surface;

        var items = this.model.spritesList;
        items.forEach(function (item) {
            if (item.y > APP_HEIGHT) {
                this.stage.removeChild(item);
                this.model.removeShape(item);
            }
            item.y += this.model.gravity;
        }.bind(this));
    },

    addShape: function (x, y, type) {
        var shape = new RandomShape(this.stage, x, y, type);
        this.model.addShape(shape);
        shape.click = function (e) {
            this.stage.removeChild(shape);
            this.model.removeShape(shape);
        }.bind(this);
    }
};
ShapesGeneratorView.constructor = ShapesGeneratorView;