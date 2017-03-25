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
    

};
window.onload = loadGame;
