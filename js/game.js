var game = {
start: function(){
    alert(1);
    game.offsetLeft = 0;
    game.ended = false;
    game.animationFrame = window.requestAnimationFrame(game.animate, main.canvas);
    
},
animate: function(){
    game.offsetLeft++;
    main.context.drawImage(cardImage[0], game.offsetLeft, 0, 77, 120);
    
    if (game.ended)
        game.animationFrame = window.requestAnimationFrame(game.animate, main.canvas);
}
};