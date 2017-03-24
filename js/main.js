

var loadGame = function () {

    var renderer = PIXI.autoDetectRenderer(APP_WIDTH, APP_HEIGHT);

    var view = document.getElementById('view');
    view.appendChild(renderer.view);

    var stage = new PIXI.Container();

    //--------

    var shapesModel = new ShapesGeneratorModel();
    var shapesView = new ShapesGeneratorView(shapesModel, stage, renderer);
    var shapesController = new ShapesGeneratorController(shapesModel, shapesView);
    
    //--------
    
    
    function animate() {
        requestAnimationFrame(animate);
        
        shapesView.animate();
        shapesController.animate();

        renderer.render(stage);
    }

    animate();
    
    //gameLogic(renderer, stage);
};
window.onload = loadGame;

var gameLogic = function (renderer, stage) {

    var spritesList = [];

    var types = ['rectangle', 'circle', 'ellipse', 'polygon', 'triangle', 'penta', 'hexagon', 'cloud'];
    var gravity = 1;
    document.getElementById("btnMin").disabled = true;

    function gravityValue(s) {
        gravity += s;
        document.getElementById("gv").innerHTML = gravity;
    }

    var spriteRectangle = null,
        spriteCircle = null,
        spriteEllipse = null,
        spritePolygon = null,
        spriteTriangle = null,
        spritePenta = null,
        spriteHexagon = null,
        spriteCloud = null,
        rectangle = null,
        circle = null,
        ellipse = null,
        polygon = null,
        penta = null,
        hexagon = null,
        cloud = null,
        triangle = null;


    setup();

    function setup() {

        var BG = new PIXI.Graphics();
        BG.beginFill(0x333333);
        BG.drawRect(0, 0, 800, 460);
        BG.endFill();

        var texture = BG.generateTexture();
        var bgSprite = new PIXI.Sprite(texture);
        bgSprite.interactive = true;
        stage.addChild(bgSprite);
        bgSprite.click = function (e) {

            var randomType = types[Math.floor(Math.random() * types.length)];
            createShape(e.data.global.x, e.data.global.y, randomType);
        };

        rectangle = new PIXI.Graphics();
        rectangle.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        rectangle.lineStyle(2, '0x008000', 0.67);
        rectangle.drawRect(0, 0, 50, 50);
        rectangle.endFill();

        cloud = new PIXI.Graphics();
        cloud.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        cloud.moveTo(25, 11);
        cloud.arcTo(35, -8, 53, 11, 15);
        cloud.arcTo(81, 20, 60, 48, 15);
        cloud.arcTo(57, 74, 25, 61, 25);
        cloud.arcTo(-4, 69, 4, 35, 15);
        cloud.arcTo(-2, 11, 22, 11, 15);
        cloud.endFill();

        penta = new PIXI.Graphics();
        penta.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        penta.lineStyle(2, '0x008000', 0.67);
        penta.drawPolygon([54, 0, 123, 45, 113, 116, 35, 116, 0, 45]);
        penta.endFill();

        hexagon = new PIXI.Graphics();
        hexagon.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        hexagon.lineStyle(2, '0x008000', 0.67);
        hexagon.drawPolygon([55, 0, 95, 23, 89, 57, 40, 72, 0, 50, 7, 16]);
        hexagon.endFill();

        circle = new PIXI.Graphics();
        circle.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        circle.lineStyle(2, '0x008000', 0.67);
        circle.drawCircle(0, 0, 30);
        circle.endFill();

        ellipse = new PIXI.Graphics();
        ellipse.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        ellipse.lineStyle(2, '0x008000', 0.67);
        ellipse.drawEllipse(0, 25, 45, 25);
        ellipse.endFill();

        polygon = new PIXI.Graphics();
        polygon.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        polygon.lineStyle(2, '0x008000', 0.67);
        polygon.drawPolygon([0, 0, 50, 0, 50, 40, 50, 80, 0, 50]);
        polygon.endFill();

        triangle = new PIXI.Graphics();
        triangle.beginFill(
            PIXI.utils.rgb2hex([
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ])
        );
        triangle.lineStyle(2, '0x008000', 0.67);
        triangle.drawPolygon([
            -32, 64,
            32, 64,
            0, 0
        ]);
        triangle.endFill();

        var texture = circle.generateTexture();
        spriteCircle = new PIXI.Sprite(texture);
        spriteCircle.x = Math.floor((Math.random() * 700) + 1);
        spriteCircle.y = Math.floor((Math.random() * -260) + 1);
        spriteCircle.interactive = true;
        stage.addChild(spriteCircle);
        spriteCircle.click = function (e) {
            stage.removeChild(this);
        };

        texture = hexagon.generateTexture();
        spriteHexagon = new PIXI.Sprite(texture);
        spriteHexagon.x = Math.floor((Math.random() * 700) + 1);
        spriteHexagon.y = Math.floor((Math.random() * -260) + 1);
        spriteHexagon.interactive = true;
        stage.addChild(spriteHexagon);
        spriteHexagon.click = function (e) {
            stage.removeChild(this);
        };

        texture = cloud.generateTexture();
        spriteCloud = new PIXI.Sprite(texture);
        spriteCloud.x = Math.floor((Math.random() * 700) + 1);
        spriteCloud.y = Math.floor((Math.random() * -260) + 1);
        spriteCloud.interactive = true;
        stage.addChild(spriteCloud);
        spriteCloud.click = function (e) {
            stage.removeChild(this);
        };

        texture = penta.generateTexture();
        spritePenta = new PIXI.Sprite(texture);
        spritePenta.x = Math.floor((Math.random() * 700) + 1);
        spritePenta.y = Math.floor((Math.random() * -260) + 1);
        spritePenta.interactive = true;
        stage.addChild(spritePenta);
        spritePenta.click = function (e) {
            stage.removeChild(this);
        };

        texture = rectangle.generateTexture();
        spriteRectangle = new PIXI.Sprite(texture);
        spriteRectangle.x = Math.floor((Math.random() * 700) + 1);
        spriteRectangle.y = Math.floor((Math.random() * -260) + 1);
        spriteRectangle.interactive = true;
        stage.addChild(spriteRectangle);
        spriteRectangle.click = function (e) {
            stage.removeChild(this);
        };

        texture = ellipse.generateTexture();
        spriteEllipse = new PIXI.Sprite(texture);
        spriteEllipse.x = Math.floor((Math.random() * 700) + 1);
        spriteEllipse.y = Math.floor((Math.random() * -260) + 1);
        spriteEllipse.interactive = true;
        stage.addChild(spriteEllipse);
        spriteEllipse.click = function (e) {
            stage.removeChild(this);
        };

        texture = polygon.generateTexture();
        spritePolygon = new PIXI.Sprite(texture);
        spritePolygon.x = Math.floor((Math.random() * 700) + 1);
        spritePolygon.y = Math.floor((Math.random() * -260) + 1);
        spritePolygon.interactive = true;
        stage.addChild(spritePolygon);
        spritePolygon.click = function (e) {
            stage.removeChild(this);
        };

        texture = triangle.generateTexture();
        spriteTriangle = new PIXI.Sprite(texture);
        spriteTriangle.x = Math.floor((Math.random() * 700) + 1);
        spriteTriangle.y = Math.floor((Math.random() * -260) + 1);
        spriteTriangle.interactive = true;
        stage.addChild(spriteTriangle);
        spriteTriangle.click = function (e) {
            stage.removeChild(this);
        };

        setInterval(function () {
            for (var i = 0; i < numberShapeSec; i++) {

                var randomType = types[Math.floor(Math.random() * types.length)];
                createShape(Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * -260) + 1), randomType);
            }
        }, 1000);

        animate();
    }

    function createShape(x, y, type) {
        var sprite = new RandomShape(stage, x, y, type);
        spritesList.push(sprite)
    }

    var numberShapeSec = 0;
    function shapesPerSec(shapeSec) {
        numberShapeSec += shapeSec;
        if (numberShapeSec == 0){
            document.getElementById("btnMin").disabled = true;
        } else {
            document.getElementById("btnMin").disabled = false;
        }
        document.getElementById("perSec").innerHTML = numberShapeSec;
    }

    /*function animate() {
        requestAnimationFrame(animate);
        spriteCircle.y += gravity;
        spriteRectangle.y += gravity;
        spriteEllipse.y += gravity;
        spritePolygon.y += gravity;
        spriteTriangle.y += gravity;
        spritePenta.y += gravity;
        spriteHexagon.y += gravity;
        spriteCloud.y += gravity;

        spritesList.forEach(function (item, index) {

            if (item.y > APP_HEIGHT) {
                stage.removeChild(item);
                spritesList.splice(index, 1);
            }
            item.y += gravity;
        });
        document.getElementById("shapes").innerHTML = spritesList.length;

        renderer.render(stage);
    }*/
};
