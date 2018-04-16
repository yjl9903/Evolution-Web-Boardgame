var cardImage = new Array(10);

var main = function(){
    var canvas = $('.game-canvas')[0];
    var context = canvas.getContext('2d');
    cardImage[0] = Loader.loadImage('image/paibei2.jpg');

    handCard(canvas);
    //alert(Loader.loadedCount + ' ' + Loader.totalCount);
    
    //context.clearRect(0, 0, 1200, 1200);
    //context.fillStyle = '#dddddd';
    //context.fillRect(0, 0, 100, 100);
    //cardImage[0].onload = function(){context.drawImage(cardImage[0], 0, 0, 77, 120);};
    
};

var Loader = {
    loaded: true,
    loadedCount: 0,
    totalCount: 0,
    loadImage: function(url){
        //alert(Loader.loadedCount + ' ' + Loader.totalCount);
        Loader.totalCount++;
        Loader.loaded = false;
        var image = new Image();
        image.src = url;
        image.onload = Loader.itemLoaded;
        return image;
    },
    itemLoaded: function(){
        Loader.loadedCount++;
        //alert(Loader.loadedCount + ' ' + Loader.totalCount);
        if (Loader.loadedCount === Loader.totalCount)
        {
            Loader.loaded = true;
            if (Loader.onload)
            {
                Loader.onload();
                Loader.onload = undefined;
            }
        }
    }
};

