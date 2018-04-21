//动画效果模块浏览器适配
(function(){
    var lastTIme = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element){
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - currTime + lastTIme);
            var id = window.setTimeout(function(){
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTIme = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        };
}());

/*var Anime = {
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
};*/

function textEnter(){
    
};