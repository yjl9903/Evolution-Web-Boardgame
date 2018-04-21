var cardImage = new Array(10);

var main = function(){
    main.gameDiv = $('.game-div');
    main.handDiv = $('.handcard-div');
    main.canvas = $('.game-canvas')[0];
    main.context = main.canvas.getContext('2d');
    main.canvas2 = $('.game-canvas2')[0];
    main.context2 = main.canvas2.getContext('2d');
    main.textCanvas = $('.text-canvas')[0];
    main.textContext = main.textCanvas.getContext('2d');
    var canvas = $('.game-canvas')[0];
    var context = canvas.getContext('2d');
    
    cardImage[0] = Loader.loadImage('image/paibei.jpg');
    cardImage[0].onload = function(){
        //alert(5);
        Loader.itemLoaded();
    };

    CardDeck();
    AnimalList();
    game();
    for (var i = 0; i < CardDeck.nameList.length; i++)
    {
        CardDeck.image[i] = Loader.loadImage('image/' + CardDeck.nameList[i] + '.jpg');
        CardDeck.image[i].onload = function(){
            Loader.itemLoaded();
        };
        CardDeck.image2[i] = Loader.loadImage('image/' + CardDeck.nameList[i] + '2.png');
        CardDeck.image2[i].onload = function(){
            Loader.itemLoaded();
        };
    }
    for (var i = 0; i < AnimalList.nameList.length; i++)
    {
        AnimalList.image[i] = Loader.loadImage('image/' + AnimalList.nameList[i] + '.png');
        AnimalList.image[i].onload = function(){
            Loader.itemLoaded();
        };
    }
    
    //alert(Loader.loadedCount + ' ' + Loader.totalCount);
    
    //main.textContext.clearRect(0, 0, 1200, 1200);
    //main.textContext.font = "100px Arial";
    //main.textContext.fillStyle = 'rgba(0, 0, 0, 0.3)';
    //main.textContext.fillText('1234', 300, 300);
    //main.textContext.fillRect(0, 0, 100, 100);
    //cardImage[0].onload = function(){context.drawImage(cardImage[0], 0, 0, 77, 120);}
    //textEnter("1111111", 300, 300, 100, 50, 3);


    if (Loader.loaded){
        //$('.handcard td').html('<img src="image/paibei.jpg" width="77px" height="120px" ondragstart="return false;"/>');
        context.drawImage(cardImage[0], 0, 0, 77, 120);
        //handCard(canvas);
        //drag.animate();

        game.set();
    }
    else{
        //alert(2);
        Loader.onload = function(){
            //$('.handcard td').html('<img src="image/paibei.jpg" width="77px" height="120px" ondragstart="return false;" />');
            //context.drawImage(cardImage[0], 0, 0, 77, 120);
            context.drawImage(CardDeck.image[0], 0, 0, 77, 120);
            context.drawImage(CardDeck.image2[1], 400, 0);
            //handCard(canvas);

            //drag.animate();

            game.set();
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

function random(min, max){
    if (max == null) 
    {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

/*
游戏界面右下角，信息滚动面板，记录出牌数据，beta阶段使用console
起始玩家标记 -> 玩家信息面板
动物饱食状态标志， 归属标志
*UI实现难点：鼠标停留在动物上可以动态显示动物的能力状态

游戏实现（单机，默认双人）
A. 游戏阶段
    阶段数标志
    1.出牌发展循环
        此时对handcard绑定按键和拖动的事件，单击为卡牌翻面，拖动为出牌
        注： 动物拖动会在鼠标位置绘制动物图片，能力拖动会在鼠标停留位置的动物上附加能力
    2. 产生食物阶段： 界面中上处做一个滚动的数字，之后在地图随机位置生成食物
    3. 喂食阶段
        拖动食物到鼠标位置处的动物，为其喂食。
        *单击动物后可选择使用能力，再次单击选择目标
        手牌上方回显当前状态

B. Card类
    1. 卡牌名称
    //2. 卡牌图片
    3. 卡牌正反面状态
    4. *卡牌行为函数
    5. 编号

C. Animal类
    1. 动物归属玩家
    2. 动物编号
    3. 动物能力数组， 存编号
    4. 卡牌能力状态标志
    5. 动物动作状态标志

D. Player类
    1. handcard数组
    2. 动物数组
    3. 动物坐标数组
    2. 分数
    3. 玩家行为状态标志

E. loader类
    保存卡牌，动物，食物等图片
*/