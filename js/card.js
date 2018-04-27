var CardDeck = function(){
    CardDeck.nameList = new Array('paibei', 'meat', 'hide', 'eye', 'water', 'run', 'home', 'poison', 'fat');
    //CardDeck.nameList2 = new Array('paibei2', 'shuisheng2');
    CardDeck.image = new Array(20);  //原图
    CardDeck.image2 = new Array(20);  //缩略图，154 * 240
    CardDeck.srcDeck = new Array(
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 
        3, 3, 3, 3, 3, 
        4, 4, 4, 4, 4, 4, 
        5, 5, 5, 5, 
        6, 6, 6, 6,
        7, 7, 7, 7,
        8, 8, 8, 8
    );
    //CardDeck.abilityList = new Array('');
    //0: posionous
    //for (var i = 0; i < CardDeck.srcDeck.length; i++)
    //    console.log(CardDeck.srcDeck[i]);

    CardDeck.shuffle = function(){
        var size = CardDeck.srcDeck.length;
        var shuffled = new Array(size);
        for (var i = 0, rand; i < size; i++)
        {
            rand = random(0, i);
            if (rand !== i)
                shuffled[i] = shuffled[rand];
            shuffled[rand] = CardDeck.srcDeck[i];
        }

        //for (var i  = 0; i < shuffled.length; i++)
        //    console.log(shuffled[i]);

        return shuffled;
    };
};

var card = function(){

};

var AnimalList = function(){
    AnimalList.nameList = new Array('rabbit', 'rabbit');
    AnimalList.image = new Array(10);
    AnimalList.imageData = new Array(10);
    AnimalList.name = {
        'meat': '食肉',
        'hide': '伪装',
        'eye': '锐目',
        'water': '水生',
        'run': '擅跑',
        'home': '穴居',
        'poison': '有毒',
        'fat': '脂肪'
    };
};

function Animal(tot, x, y){
    this.locX = x;
    this.locY = y;;
    //this.path;
    this.width = 90;
    this.height = 90;
    this.type = 0;
    this.father = tot;
    this.ability = new Array(0);
    this.foodNeed = 1;
    this.totFood = 0;
    
    this.inPoison = 0;
    this.haveEat = 0;
    
    this.state = {
        meat: false,
        rob: false,
        big: false,
        water: false,
        hide: false,
        eye: false,
        posionous: false,
        home: false,
        run: false
    };
    /*this.meat = false;  //食肉
    this.rob = false;  //劫掠
    //this.grass = false;  //食草
    this.big = false;  //大体型
    this.water = false;  //水生
    this.hide = false;  //伪装
    this.eye = false;  //锐利眼神
    this.poisonous = false;  //有毒
    this.home = false;  //穴居
    this.run = false;  //擅跑
    this.fat = false;  //脂肪*/
};

var FoodList = function(){
    FoodList.nameList = new Array('yumi');
    FoodList.image = new Array(10);
    FoodList.imageData = new Array(10);
};