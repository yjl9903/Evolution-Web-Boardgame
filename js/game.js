var game = {
ended: false,
offsetLeft: 0,
start: function(){
    //alert(1);
    alert(game.offsetLeft);
    //game.animationFrame = window.requestAnimationFrame(game.animate, main.canvas);
    window.requestAnimationFrame(game.animate, main.canvas);
},
animate: function(){
    main.context.clearRect(game.offsetLeft, 0, 78, 120);
    game.offsetLeft++;
    main.context.drawImage(cardImage[0], game.offsetLeft, 0, 77, 120);
    
    if (!game.ended)
        //game.animationFrame = window.requestAnimationFrame(game.animate, main.canvas);
        window.requestAnimationFrame(game.animate, main.canvas);
}
};