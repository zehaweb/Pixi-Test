function RandomShape(stage, x, y, type) {
    this.texture = this.createRandomShape(type);
    PIXI.Sprite.call(this, this.texture);
    this.x = x;
    this.y = y;
    this.anchor.set(.5);
    this.interactive = true;
    stage.addChild(this);
    /*this.click = function (e) {
        stage.removeChild(this);
    };*/
}

RandomShape.prototype = Object.create(PIXI.Sprite.prototype);
RandomShape.prototype.constructor = RandomShape;
RandomShape.CIRCLE = 'circle';
RandomShape.ELLICPSE = 'ellipse';
RandomShape.RECT = 'rect';
RandomShape.TRIANGLE = 'triangle';
RandomShape.PENTAGON = 'penta';
RandomShape.HEXGON = 'hexagon';
RandomShape.POLYGON = 'polygon';
RandomShape.CLOUD = 'cloud';

RandomShape.prototype.createRandomShape = function (type) {
    var shape = new PIXI.Graphics();

    shape.beginFill(this.getRandomColor());
    shape.lineStyle(2, '0x008000', 0.67);

    switch (type) {
        case RandomShape.CIRCLE:
            shape.drawCircle(0, 0, Math.floor((Math.random() * 40) + 10));
            break;
        case RandomShape.RECT:
            shape.drawRect(0, 0, Math.floor((Math.random() * 40) + 10), Math.floor((Math.random() * 40) + 10));
            break;
        case RandomShape.ELLICPSE:
            shape.drawEllipse(0, 25, Math.floor((Math.random() * 40) + 10), 25);
            break;
        case RandomShape.POLYGON:
            shape.drawPolygon([0, Math.floor((Math.random() * 20) + 10), 50, 0, 50, 40, 50, 80, 0, Math.floor((Math.random() * 40) + 10)]);
            break;
        case RandomShape.TRIANGLE: {
            shape.drawPolygon([
                -32, 64,
                32, 64,
                0, 0
            ]);
        }
            break;
        case RandomShape.PENTAGON:
            shape.drawPolygon([54, 0, Math.floor((Math.random() * 123) + 100), 45, Math.floor((Math.random() * 113) + 100), 116, 35, 116, 0, 45]);
            break;
        case RandomShape.HEXGON:
            shape.drawPolygon([55, 0, 95, 23, 89, 57, 40, 72, 0, 50, 7, 16]);
            break;
        case RandomShape.CLOUD: {
            shape.moveTo(22, 11);
            shape.arcTo(35, -8, 53, 11, 15);
            shape.arcTo(81, 20, 60, 48, 15);
            shape.arcTo(57, 74, 25, 61, 25);
            shape.arcTo(-4, 69, 4, 35, 15);
            shape.arcTo(-2, 11, 22, 11, 15);
        }
    }

    shape.endFill();
    return shape.generateTexture();
};

RandomShape.prototype.getRandomColor = function () {
    return PIXI.utils.rgb2hex([
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ]);
};