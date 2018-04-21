var game = function(){
    var curText;
    var playerNum = 2;
    game.now = 0;
    game.first = 0;
    game.deck;
    game.check = new Array(4);
    game.rest = playerNum;
    game.p;
    
    for (var i = 0; i < playerNum; i++)
        game.check[i] = 0;

    game.step = new Array(function(){
        game.p[game.now].showHand();
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3);
        handCardCmd(1);
        
        
    }, 
    function(){

    }, 
    function(){

    });

    game.switch = function(){
        var p = game.now + 1;
        while (game.check[p % playerNum])
            p++;
        game.now = p % playerNum;
        game.p[game.now].showHand();
        textEnter(curText, 500, 530, 2000, 30, 4);
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3);
    };

    game.set = function(){
        game.deck = CardDeck.shuffle();
        game.p = new Array(playerNum);
        for (var i = 0; i < playerNum; i++)
        {
            game.p[i] = new Player();
            game.p[i].hand.size = 0;
            game.p[i].ownAnimal.size = 0;
        }
        for (var i = 0; i < playerNum * 6; i++)
        {
            game.p[i % playerNum].hand.push(game.deck.pop());
            game.p[i % playerNum].hand.size++;
            game.p[i % playerNum].handState[Math.floor(i / playerNum)] = 1;
            //console.log(Math.floor(i / playerNum));
        }
        $('.next-turn').click(function(){
            game.switch();
        });
        game.step[0]();
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
            if (this.handState[i] === 0)
                this.handState[i] = 1;
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

    this.useCard = function(n){
        for (var i = n + 1; i < this.hand.size; i++)
        {
            this.hand[i - 1] = this.hand[i];
            this.handState[i - 1] = this.handState[i];
        }
    };

    this.initAnimal = function(x, y){
        //动物绘制在图层1,x,y为绘制时的坐标
        var newAnimal = new Animal(game.now, x, y);
        newAnimal.ability.size = 0;
        this.score += 2;
        this.ownAnimal.size++;
        this.ownAnimal[size - 1] = newAnimal;
        main.context.drawImage(AnimalList.image[newAnimal.type], x, y);
        console.log('玩家 ' + game.now + ' 繁殖出了一个新的生命...')
    };
};

