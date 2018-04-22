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

function textEnter(content, locX, locY, width, font, mode, ctx, fontColor1, fontColor2, fontColor3){
    ctx.font = font + "px Microsoft YaHei";
    ctx.textAlign = "center";
    var sum = 0, flag = true, dy = 50;
    var rgba = "rgba(60, 60, 60, "
    if (fontColor1)
        rgba = "rgba(" + fontColor1 + ',' + fontColor2 + ',' + fontColor3 + ',';

    //0：淡入，1：淡出，3：向上淡入，4：向上淡出
    if (mode === 1)
    {
        sum = 1;
        (function animate1(){
            ctx.clearRect(locX - width, locY - font, width * 2, 2 * font - 10);
            ctx.fillStyle = rgba + sum + ")";
            ctx.fillText(content, locX, locY);
            if (sum > 0)
            {
                sum -= 0.02;
                window.requestAnimationFrame(animate1, main.textCanvas);
            }
        }());
    }
    else if (mode === 0)
    {
        (function animate0(){
            ctx.clearRect(locX - width, locY - font, width * 2, 2 * font - 10);
            ctx.fillStyle = rgba + sum + ")";
            ctx.fillText(content, locX, locY);
            if (sum < 1)
            {
                sum += 0.02;
                window.requestAnimationFrame(animate0, main.textCanvas);
            }
        }());
    }
    else if (mode === 4)
    {
        sum = 1;
        dy = 0;
        (function animate4(){
            ctx.clearRect(locX - width, locY - font + dy, width * 2, 2 * font - 10);
            ctx.fillStyle = rgba + sum + ")";
            dy -= 1;
            ctx.fillText(content, locX, locY + dy);
            if (sum > 0)
            {
                sum -= 0.02;
                window.requestAnimationFrame(animate4, main.textCanvas);
            }
        }());
    }
    else if (mode === 3)
    {
        //alert(1);
        (function animate3(){
            ctx.clearRect(locX - width, locY - font + dy, width * 2, 2 * font - 10);
            ctx.fillStyle = rgba + sum + ")";
            dy -= 1;
            ctx.fillText(content, locX, locY + dy);
            if (sum < 1)
            {
                sum += 0.02;
                window.requestAnimationFrame(animate3, main.textCanvas);
            }
        }());
    }
};