var game = function(){
    game.now = 0;
    game.first = 0;
    game.deck;
    game.p;
    game.step = new Array(function(){

    }, 
    function(){

    }, 
    function(){

    });

    game.set = function(){
        game.deck = CardDeck.shuffle();
        var playerNum = 2;
        game.p = new Array(playerNum);
        for (var i = 0; i < playerNum; i++)
        {
            game.p[i] = new Player();
            game.p[i].hand.size = 0;
        }
        for (var i = 0; i < playerNum * 6; i++)
        {
            game.p[i % playerNum].hand.push(game.deck.pop());
            game.p[i % playerNum].hand.size++;
            game.p[i % playerNum].handState[Math.floor(i / playerNum)] = 1;
            //console.log(Math.floor(i / playerNum));
        }
        game.p[0].showHand();
        
        handCardCmd();
        game.step[0];
    };
};

function Player(){
    this.hand = new Array(0);
    this.handState = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.score = 0;
    this.ownAnimal = new Array(0);

    this.showHand = function(){
        var td = $('.handcard td');
        td.html('');
        td = td.first();
        for (var i = 0; i < this.hand.size; i++)
        {
            td.html('<img src="image/'+ CardDeck.nameList[this.hand[i]] +'2.png" width="77px" height="120px" ondragstart="return false;"/>');
            td = td.next();
        }

        /*for (var i = 0; i < this.hand.size; i++)
        {
            //console.log(this.hand[i]);
            //console.log(this.handState[i]);
            //alert(p[0].hand[i]);
        }*/
    };
};

function Animal(tot){
    this.father = tot;
    this.ability = new Array(0);
    
    this.meat = false;  //食肉
    this.rob = false;  //劫掠
    //this.grass = false;  //食草
    this.big = false;  //大体型
    this.water = false;  //水生
    this.hide = false;  //伪装
    this.eye = false;  //锐利眼神
    this.poisonous = false;  //有毒
    this.home = false;  //穴居
    this.run = false;  //擅跑
    this.fat = false;  //脂肪
    
};