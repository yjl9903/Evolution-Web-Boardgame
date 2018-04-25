var game = function(){
    var curText, topText;
    var playerNum = 2, foodNum = 0;
    var cnt = 0;
    game.now = 0;
    game.first = 0;
    game.deck;
    game.check = new Array(4);
    game.rest = playerNum;
    game.p;
    
    for (var i = 0; i < playerNum; i++)
        game.check[i] = false;

    game.step = new Array(function(){
        main.clear();
        //  button
        var button = $('.next-turn');
        button.click(function(){
            game.check[game.now] = true;
            game.rest--;
            if (!game.rest)
            {
                cnt++;
                textEnter(curText, 500, 530, 2000, 30, 4, main.textContext);
                
                button.attr('disabled', true);  //设置按钮无法点击
                button.off();
                game.step[cnt]();
            }
            else
            {
                game.switch();
            }
        });
        //  button
        game.p[game.now].showHand();
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3, main.textContext);
        handCardCmd(1);
        mapCmd(0);
    }, 
    function(){
        main.clear();
        topText = '食物阶段...';
        textEnter(topText, 600, 50, 2000, 30, 3, main.textContext);
        handCardCmd(0);
        initFoodAnimation(playerNum);//动画结束时，直接生成食物，食物生成后进入喂食阶段
        //console.log(foodNum);
        //food.init();
        
    }, 
    function(){

    });

    game.switch = function(){
        var p = game.now + 1;
        while (game.check[p % playerNum])
            p++;
        game.now = p % playerNum;
        game.p[game.now].showHand();
        textEnter(curText, 500, 530, 2000, 30, 4, main.textContext);
        curText = '玩家 ' + game.now + ' 正在进行回合...';
        textEnter(curText, 500, 530, 2000, 30, 3, main.textContext);
    };

    game.set = function(){
        //transparentImage();
        var color = new Array([255, 30, 30], [131, 111, 255], [0, 238, 0], [238, 238, 238]);
        game.deck = CardDeck.shuffle();
        game.p = new Array(playerNum);
        for (var i = 0; i < playerNum; i++)
        {
            game.p[i] = new Player();
            game.p[i].hand.size = 0;
            game.p[i].ownAnimal.size = 0;
            game.p[i].color = color[i];
        }
        for (var i = 0; i < playerNum * 6; i++)
        {
            game.p[i % playerNum].hand.push(game.deck.pop());
            game.p[i % playerNum].hand.size++;
            game.p[i % playerNum].handState[Math.floor(i / playerNum)] = 1;
            //console.log(Math.floor(i / playerNum));
        }
        
        game.step[0]();
    };

    game.isOver = function(x, y){
        for (var i = 0; i < playerNum; i++)
        {
            for (var j = 0; j < game.p[i].ownAnimal.size; j++)
            {
                if (Math.abs(x - game.p[i].ownAnimal[j].locX) < game.p[i].ownAnimal[j].width && Math.abs(y - game.p[i].ownAnimal[j].locY) < game.p[i].ownAnimal[j].height)
                {
                    return false;
                }
            }
        }
        return true; //无重叠
    };
    game.isOver2 = function(x, y, width, height){
        for (var i = 0; i < playerNum; i++)
        {
            for (var j = 0; j < game.p[i].ownAnimal.size; j++)
            {
                var xx = game.p[i].ownAnimal[j].locX;
                var yy = game.p[i].ownAnimal[j].locY;
                var ww = game.p[i].ownAnimal[j].width;
                var hh = game.p[i].ownAnimal[j].height;
                if (x - xx < ww && xx - x < width && y - yy < hh && yy - y < height)
                    return false;
            }
        }
        return true;//无重叠
    };
    game.isClickAnimal = function(x, y){
        var tmp = -1;
        for (var i = 0; i < playerNum; i++)
        {
            tmp = game.p[i].inAnimal(x, y);
            if (tmp != -1)
                return [i, tmp];
        }
        return [-1, -1];
    };
};

function Player(){
    this.hand = new Array(0);
    this.handState = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    this.score = 0;
    this.ownAnimal = new Array(0);
    this.color = new Array(3);

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
        this.hand.size--;
        this.handState[this.hand.size] = -1;
    };

    this.initAnimal = function(x, y){
        //动物绘制在图层1,x,y为绘制时的坐标
        var newAnimal = new Animal(game.now, x, y);
        newAnimal.ability.size = 0;
        this.score += 2;
        this.ownAnimal.size++;
        DrawAnimal(x, y);
        //main.context.putImageData(AnimalList.imageData[0], 90, 90);
        //main.context.drawImage(AnimalList.image[newAnimal.type], x, y);
        
        //var path = new Path2D();
        //path.addPath();
        //path.moveTo(x, y);
        //path.lineTo(x + 90, y);
        //path.lineTo(x + 90, y + 90 + 20);
        //path.lineTo(x, y + 90 + 20);
        //path.closePath();
        //newAnimal.path = path;
        //main.context.fillStyle = "rgba(0,0,0,0.3)";
        //main.context.fill(path);
        //main.infoContext.fill();
        //chrome:\\flags，调整canvas experiment
        //main.context.fillStyle = "rgba(0,0,0,0.3)";
        //main.context.fillRect(newAnimal.locX, newAnimal.locY, newAnimal.width, newAnimal.height + 20);
        this.ownAnimal[this.ownAnimal.size - 1] = newAnimal;
        console.log('玩家 ' + game.now + ' 繁殖出了一个新的生命...')
    };

    this.inAnimal = function(x, y){
        for (var i = 0; i < this.ownAnimal.size; i++)
        {
            //console.log(2);
            //if (main.infoContext.isPointInPath(this.ownAnimal[i].path, x, y))
            //{
            //    console.log('OK');
            //}
            if (x - this.ownAnimal[i].locX <= this.ownAnimal[i].width && y - this.ownAnimal[i].locY <= this.ownAnimal[i].width + 20 && x >= this.ownAnimal[i].locX && y >= this.ownAnimal[i].locY)
            {
                return i;
            }
        }
        return -1;
    };

    this.evovleAbility = function(n, ability){
        //console.log(this.ownAnimal[n].state[ ability ]);
        if (this.ownAnimal[n].state[ ability ])
            return false;
        this.ownAnimal[n].ability.size++;
        this.ownAnimal[n].ability.push(ability);
        this.ownAnimal[n].state[ ability ] = true;
        mapCmd.mode1(game.now, n);
        console.log('玩家 ' + game.now + ' 成功为他的动物 ' + n + ' 进化了一个能力...');
        //console.log(this.ownAnimal[n].ability[0]);
        //console.log(ability + ' ' + this.ownAnimal[n].state[ ability ]);
        return true;
    };
};

function food(){
    food.num = 0;
    food.init = function(n){
        food.num = n;
        food.rest = new Array(n);
        food.locX = new Array(n), food.locY = new Array(n), food.width = new Array(n), food.height = new Array(n);
        for (var i = 0; i < n; i++)
        {
            //console.log(i);
            food.width[i] = 75;
            food.height[i] = 75;
            var flag = 1;
            while (flag)
            {
                flag = 0;
                food.locX[i] = random(0, 1100);
                food.locY[i] = random(0, 450);
                for (var j = 0; j < n; j++)
                    if (i !== j && Math.abs(food.locX[i] - food.locX[j]) <= food.width[i] && Math.abs(food.locY[i] - food.locY[j]) <= food.height[i])
                    {
                        flag = 1;
                        break;
                    }
                if (!game.isOver2(food.locX[i], food.locY[i], food.width[i], food.height[i]))
                    flag = 1;
            }
            DrawFood(food.locX[i], food.locY[i], main.foodContext);
            //main.foodContext.putImageData(FoodList.imageData[0], 75, 75);
        }
        foodCmd(0);
    };
    food.isInFood = function(x, y){
        for (var i = 0; i < food.num; i++)
        {
            if (x > food.locX[i] && y > food.locY[i] && x - food.locX[i] < food.width[i] && y - food.locY[i] < food.height[i])
                return i;
        }
        return -1;
    };

    food.deleteFood = function(n){
        food.num--;
        food.rest.splice(n, 1);
        food.locX.splice(n, 1);
        food.locY.splice(n, 1);
        food.width.splice(n, 1);
        food.height.splice(n, 1);
        var content1 = '这个月，大地上剩余了 ', content2 = ' 份食物...';
        main.textContext.clearRect(380, 70, 430, 90);
        main.textContext.fillText(content1 + food.num + content2, 600, 100);
    };
};