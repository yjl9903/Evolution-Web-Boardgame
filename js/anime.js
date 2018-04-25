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
        (function animate1(){//500,530,2000,30,0,500,1200,50
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

function drawInfo(x, y, n, m){
    var unit = 20, arrowX = 20, arrowY1 = 20 * Math.sqrt(3), arrowY2 = 20 / Math.sqrt(3), width = 50, arcLen = 20;
    var len = game.p[n].ownAnimal[m].ability.size - 1;
    var name = {
        'water': '水生',
        'hide': '伪装',
        'eye': '锐目',
        'run': '擅跑'
    };

    //console.log(len);
    main.infoContext.fillStyle = "rgba(255,255,255,0.7)";
    main.infoContext.beginPath();
    main.infoContext.moveTo(x, y);
    main.infoContext.lineTo(x + arrowX, y - arrowY1);
    main.infoContext.lineTo(x + arrowX, y - arrowY1 - len * unit);
    main.infoContext.quadraticCurveTo(x + arrowX, y - arrowY1 - len * unit - arcLen, x + arrowX + arcLen, y - arrowY1 - len * unit - arcLen);
    main.infoContext.lineTo(x + arrowX + width, y - arrowY1 - len * unit - arcLen);
    main.infoContext.quadraticCurveTo(x + arrowX + width + arcLen, y - arrowY1 - len * unit - arcLen, x + arrowX + width + arcLen, y - arrowY1 - len * unit);
    main.infoContext.lineTo(x + arrowX + width + arcLen, y - arrowY2);
    main.infoContext.quadraticCurveTo(x + arrowX + width + arcLen, y - arrowY2 + arcLen, x + arrowX + width, y - arrowY2 + arcLen);
    main.infoContext.lineTo(x + arrowX + arcLen, y - arrowY2 + arcLen);
    main.infoContext.quadraticCurveTo(x + arrowX, y - arrowY2 + arcLen, x + arrowX, y - arrowY2);
    main.infoContext.closePath();
    main.infoContext.fill();
    
    main.infoContext.font = "20px Microsoft YaHei";
    //main.infoContext.textAlign = "center";
    main.infoContext.fillStyle = "rgba(0, 0, 0, 0.7)";
    
    if (!len)
    {
        //console.log(game.p[n].ownAnimal[m].ability[0]);
        var content = name[game.p[n].ownAnimal[m].ability[0]];
        main.infoContext.fillText(content, x + arrowX / 2 + arcLen + 5, y - arrowY1 / 2);
    }
    else
    {
        for (var i = 0; i < len + 1; i++)
        {
            var content = name[game.p[n].ownAnimal[m].ability[i]];
            main.infoContext.fillText(content, x + arrowX / 2 + arcLen + 5, y -  2 * arrowY1 / 3 - i * (unit + 5) + arcLen / 2);
        }
    }
    return [x, y - arrowY1 - len * unit - arcLen, arrowX + width + arcLen * 2, arrowY1 - arrowY2 + 2 * arcLen + len * unit];
};

function initFoodAnimation(n){
    //main.textContext.clearRect(0, 500, 1200, 50);
    var cnt, rand, t = 0;
    if (n === 2)
        rand = function(){
            return 2 + random(1, 7);
        };
    else if (n === 3)
        rand = function(){
            return random(1, 7) + random(1, 7);
        };
    else
        rand = function(){
            return 2 + random(1, 7) + random(1, 7);
        };
    
    var content1 = '这个月，大地上新生了 ', content2 = ' 份食物...';
    (function animate1(){
        //main.textContext.clearRect(0, 400, 1200, 200);
        cnt = rand();
        main.textContext.clearRect(380, 70, 430, 90);
        main.textContext.fillText(content1 + cnt + content2, 600, 100);
        t++;
        if (t < 125)
            window.requestAnimationFrame(animate1, main.textCanvas);
        else
            food.init(cnt);//动画结束，生成食物
    }());
    return cnt;
};