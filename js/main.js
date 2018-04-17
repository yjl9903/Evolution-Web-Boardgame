var cardImage = new Array(10);

var main = function(){
    main.canvas = $('.game-canvas')[0];
    main.context = main.canvas.getContext('2d');
    var canvas = $('.game-canvas')[0];
    var context = canvas.getContext('2d');
    
    cardImage[0] = Loader.loadImage('image/paibei2.jpg');
    cardImage[0].onload = function(){
        //alert(5);
        Loader.itemLoaded();
    };

    
    //alert(Loader.loadedCount + ' ' + Loader.totalCount);
    
    //context.clearRect(0, 0, 1200, 1200);
    //context.fillStyle = '#dddddd';
    //context.fillRect(0, 0, 100, 100);
    //cardImage[0].onload = function(){context.drawImage(cardImage[0], 0, 0, 77, 120);}

    

    if (Loader.loaded){
        //alert(1);
        context.drawImage(cardImage[0], 0, 0, 77, 120);
        handCard(canvas);
        game.start();
    }
    else{
        //alert(2);
        Loader.onload = function(){
            context.drawImage(cardImage[0], 0, 0, 77, 120);
            handCard(canvas);
            game.start();
        };
    }
};

//资源加载器
var Loader = {
    loaded: true,
    loadedCount: 0,
    totalCount: 0,
    loadImage: function(url){
        //alert(Loader.loadedCount + ' ' + Loader.totalCount);

        $('.game-canvas').hide();

        Loader.totalCount++;
        Loader.loaded = false;
        var image = new Image();
        image.src = url;

        //cardImage[0] = new Image();
        //cardImage[0].src = url;
        //image.onload = Loader.itemLoaded;
    
        return image;
    },
    itemLoaded: function(){
        Loader.loadedCount++;

        $('.game-canvas').show();
        //alert(Loader.loadedCount + ' ' + Loader.totalCount);
        
        if (Loader.loadedCount === Loader.totalCount)
        {
            //alert(3);
            Loader.loaded = true;
            if (Loader.onload)
            {
                //alert(4);
                Loader.onload();
                Loader.onload = undefined;
            }
        }
    }
};

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
