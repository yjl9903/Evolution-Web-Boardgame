var handCardCmd = function(mode){
    //1：带卡牌拖动，0：不带卡牌拖动
    //在图层2显示
    var f = [307, 391, 476, 561, 646, 731, 815, 900, 985];
    var td = $('.handcard td');
    var rect = main.canvas2.getBoundingClientRect(); 
    td.off();
    /*td.mouseenter(function(){
        var tot = $(this);
        var i = tot.index();
        //tot.css('width','77px');
        //tot.css('height','120px');
        main.context.drawImage(CardDeck.image2[game.p[game.now].hand[i]], f[i] - rect.left - 36, 585 - 120 - rect.top - 120);
        //main.context.drawImage(CardDeck.image2[1], 600, 0);
    });
    td.mouseleave(function(){
        var tot = $(this);
        var i = tot.index();
        //tot.css('width','77px');
        //tot.css('height','120px');
        main.context.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
        //tot.html('<img src="image/paibei.jpg" width="77px" height="120px"/>')
    });*/
    var mEnter = function(){
        var tot = $(this);
        var totRect = tot[0].getBoundingClientRect();
        var i = tot.index();
        var img;
        //console.log(game.now);
        if (game.p[game.now].handState[i] !== -1)
            tot.css('cursor', 'pointer');
        else
            tot.css('cursor', '');
        if (game.p[game.now].handState[i] === 0)
            img = CardDeck.image2[0];
        else if (game.p[game.now].handState[i] === 1)
            img = CardDeck.image2[game.p[game.now].hand[i]];
        else
            return;
        //读取该位置的卡片图片
        main.context2.drawImage(img, totRect.left - rect.left - 36, 585 - 100 - rect.top - 120);
        //main.context.drawImage(CardDeck.image2[1], 600, 0);
    };
    var mLeave = function(){
        var tot = $(this);
        var totRect = tot[0].getBoundingClientRect();
        var i = tot.index();
        tot.css('cursor', '');
        main.context2.clearRect(totRect.left - rect.left - 36, 585 - 120 - rect.top - 100, 155, 240);
    };
    td.mouseenter(mEnter);
    td.mouseleave(mLeave);
    
    if (mode === 1)
    {
        td.mousedown(function(e){
            var sx = e.clientX - rect.left -36, sy = e.clientY - rect.top - 60, flag = false;
            var mx = sx, my = sy;
            var tot = $(this), html;
            var totRect = tot[0].getBoundingClientRect();
            var i = tot.index();
            var img;
            if (game.p[game.now].handState[i] === 0)
                img = CardDeck.image2[0];
            else if (game.p[game.now].handState[i] === 1)
                img = CardDeck.image2[game.p[game.now].hand[i]];
            else
                return;

            var mMove = function(e){
                if (!flag)
                {
                    var x = e.clientX - rect.left - 36;
                    var y = e.clientY - rect.top - 60;
                    if (Math.abs(x - sx) >= 4 || Math.abs(y - sy) >= 4)
                    {
                        flag = true;
                        main.context2.clearRect(totRect.left - rect.left - 36, 585 - 120 - rect.top - 100, 155, 240);
                        html = tot.html();
                        tot.html('');
                        td.off('mouseleave');
                        td.off('mouseenter');
                    }
                }
                else
                {
                    main.context2.clearRect(mx - 1, my - 1, 79, 122);
                    mx = e.clientX - rect.left - 36;
                    my = e.clientY - rect.top - 60;
                    //console.log(mx + ' ' + my);
                    main.context2.drawImage(img, mx, my, 77, 120);
                }
            };    
            var mUp = function(e){
                if (!flag)
                {
                    //console.log(game.p[game.now].handState[i]);
                    if (game.p[game.now].handState[i] === 1)
                    {
                        //console.log('Error 1');
                        game.p[game.now].handState[i] = 0;
                        tot.html('<img src="image/paibei2.png" width="77px" height="120px" ondragstart="return false;"/>');
                    }
                    else if (game.p[game.now].handState[i] === 0)
                    {
                        //console.log('Error 1');
                        game.p[game.now].handState[i] = 1;
                        tot.html('<img src="image/'+ CardDeck.nameList[game.p[game.now].hand[i]] +'2.png" width="77px" height="120px" ondragstart="return false;"/>');
                    }
                }
                else
                {
                    //console.log('Error 2');
                    main.context2.clearRect(mx - 1, my - 1, 79, 122);
                    if (Math.abs(e.clientY - rect.top) <= 600 && Math.abs(e.clientX - rect.left))
                    {
                        //console.log('OK');
                        if (game.p[game.now].handState[i] === 0  && game.isOver(e.clientX - rect.left - 45, e.clientY - rect.top - 45))
                        {
                            //生成动物
                            game.p[game.now].initAnimal(e.clientX - rect.left - 45, e.clientY - rect.top - 45);
                            //使用了默认大小
                            game.p[game.now].useCard(i);
                            game.switch();
                        }
                        else if (game.p[game.now].handState[i] === 1)
                        {
                            //进化能力
                            //console.log(1);
                            var x = game.p[game.now].inAnimal(e.clientX - rect.left, e.clientY - rect.top);
                            main.cx = e.clientX - rect.left;
                            main.cy = e.clientY - rect.top;
                            if (x > -1 && game.p[game.now].evovleAbility(x, CardDeck.nameList[game.p[game.now].hand[i]]))
                            {
                                game.p[game.now].useCard(i);
                                game.switch();
                            }
                            else
                            {
                                tot.html(html);
                            }
                        }
                        else
                        {
                            tot.html(html);
                        }
                        //game.p[game.now].useCard(i);
                        //game.switch();
                    }
                    else
                    {
                        tot.html(html);
                    }
                    td.mouseenter(mEnter);
                    td.mouseleave(mLeave);
                }
                main.gameDiv.off('mousemove');
                main.handDiv.off('mousemove');
                //main.gameDiv.off('mouseup');
                //main.handDiv.off('mouseup');
                $('body').off('mouseup');
                //td.off('mousedown');
            };
            main.gameDiv.mousemove(mMove);
            main.handDiv.mousemove(mMove);
            //main.gameDiv.mouseup(mUp);
            //main.handDiv.mouseup(mUp);
            $('body').mouseup(mUp);
        });
    }
};

var mapCmd = function(mode, xn, xm){
    var rect = main.canvas2.getBoundingClientRect(); 
    var checked = new Array(6);
    var location = new Array(6);
    for (var i = 0; i < 6; i++)
    {
        checked[i] = new Array(20);
        location[i] = new Array(20);
        for (var j = 0; j < 20; j++)
        {
            checked[i][j] = 1;
            location[i][j] = {x: 0, y: 0, width: 0, height: 0};
        }
    }

    mapCmd.mode1 = function(xn, xm){
        //if (!checked[xn][xm])
        //{
            main.infoContext.clearRect(location[xn][xm].x, location[xn][xm].y, location[xn][xm].width, location[xn][xm].height);
            var tmp = drawInfo(main.cx, main.cy, xn, xm);
            location[xn][xm] = {x: tmp[0], y: tmp[1], width: tmp[2], height: tmp[3]};
            checked[xn][xm] = 0;
        //}
        return;
    };

    mapCmd.mClick = function(e){
        //console.log(e.clientX - rect.left);
        //console.log(e.clientY - rect.top);
        var mx = e.clientX - rect.left, my = e.clientY - rect.top;
        //var flag = game.p[game.now].inAnimal(mx, my);
        var flag = game.isClickAnimal(mx, my);
        //console.log(flag[0]);
        //if (food.isInFood(mx, my) !== -1)
        //    return;
        var mark = food.isInFood(mx, my);
        if (flag[0] > -1 && mark === -1)
        {
            var len = game.p[flag[0]].ownAnimal[flag[1]].ability.size;
            //console.log(len);
            if (checked[flag[0]][flag[1]] && len)
            {     
                var tmp = drawInfo(mx, my, flag[0], flag[1]);
                location[flag[0]][flag[1]] = {x: tmp[0], y: tmp[1], width: tmp[2], height: tmp[3]};
                //main.infoContext.fillRect(tmp[0], tmp[1], tmp[2], tmp[3]);
                checked[flag[0]][flag[1]] = 0;
            } 
        }
        else if (mark === -1)
        {
            main.infoContext.clearRect(0, 0, 1200, 600);
            for (var i = 0; i < 6; i++)
                for (var j = 0; j < 20; j++)
                {
                    checked[i][j] = 1;
                    location[i][j] = {x: 0, y: 0, width: 0, height: 0};
                }
        }
    };
    main.gameDiv2.off();
    main.gameDiv2.click(mapCmd.mClick);
    //main.gameDiv2.click(function(e){});

    mapCmd.set = function(){
        main.infoContext.clearRect(0, 0, 1200, 600);
            for (var i = 0; i < 6; i++)
                for (var j = 0; j < 20; j++)
                {
                    checked[i][j] = 1;
                    location[i][j] = {x: 0, y: 0, width: 0, height: 0};
                }
    };
};

var foodCmd = function(mode){
    var mx = 0, my = 0, rect = main.canvas.getBoundingClientRect();
    main.foodDiv.off();
    main.foodDiv.mousedown(function(e){
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
        var n = food.isInFood(mx, my);
        //console.log(n);
        if (n != -1)
        {
            var sx = food.locX[n], sy = food.locY[n];
            //main.gameDiv2.off();
            DrawFood(food.locX[n], food.locY[n], main.tempContext);
            main.foodContext.clearRect(food.locX[n], food.locY[n], food.width[n], food.height[n]);
            main.foodDiv.mousemove(function(e){
                main.tempContext.clearRect(food.locX[n], food.locY[n], food.width[n], food.height[n]);
                mx = e.clientX - rect.left - food.width[n] / 2;
                my = e.clientY - rect.top - food.height[n] / 2;
                food.locX[n] = mx;
                food.locY[n] = my;
                DrawFood(mx, my, main.tempContext);
                //main.foodContext.drawImage(FoodList.image[0], mx, my, food.width[n], food.height[n]);
            });
            //拖拽动画
            main.foodDiv.mouseup(function(e){
                main.tempContext.clearRect(food.locX[n], food.locY[n], food.width[n], food.height[n]);
                mx = e.clientX - rect.left;
                my = e.clientY - rect.top;
                var flag = game.isClickAnimal(mx, my);
                var tn = flag[0], tm = flag[1]; //tn玩家，tm动物
                if (tn === game.now)
                {
                    main.markContext.font = "20px arial";
                    main.markContext.fillStyle = "rgba(" + game.p[tn].color[0] + ',' + game.p[tn].color[1] + ',' + game.p[tn].color[2] + ',0.9)';
                    //main.markContext.fillRect(0,0,100,100);
                    if (game.p[tn].ownAnimal[tm].totFood < game.p[tn].ownAnimal[tm].foodNeed && game.pFlag[game.now] === 0)
                    {
                        //此处为成功喂食,动物尚未饱食，且玩家尚未行动
                        //main.tempContext.clearRect(food.locX[n], food.locY[n], food.width[n], food.height[n]);
                        //main.markContext.fillRect(0, 0, 40,40);
                        food.deleteFood(n);
                        var markX = game.p[tn].ownAnimal[tm].locX;
                        var markY = game.p[tn].ownAnimal[tm].locY + 30;
                        //console.log(markX, markY);
                        game.p[tn].ownAnimal[tm].totFood++;
                        main.markContext.clearRect(markX, markY - 20, 20 ,20);
                        main.markContext.fillText(game.p[tn].ownAnimal[tm].totFood, markX, markY);
                        game.pFlag[game.now] = 1;
                        Board.addText('玩家 ' + game.now + ' 的动物吃掉了食物...', game.now);
                        game.switch(1);
                    }
                    else
                    {
                        food.locX[n] = sx;
                        food.locY[n] = sy;
                        DrawFood(sx, sy, main.foodContext);
                    }
                }
                else if (tn === -1)
                {
                    mx = mx - food.width[n] / 2;
                    my = my - food.height[n] / 2;
                    var flag = 0;
                    for (var i = 0; i < food.num; i++)
                    {
                        if (n !== i && Math.abs(mx - food.locX[i]) <= food.width[n] && Math.abs(my - food.locY[i]) <= food.height[n])
                        {
                            flag = 1;
                        }
                    }
                    if (flag)
                    {
                        food.locX[n] = sx;
                        food.locY[n] = sy;
                        DrawFood(sx, sy, main.foodContext);
                    }
                    else
                    {
                        food.locX[n] = mx;
                        food.locY[n] = my;
                        DrawFood(mx, my, main.foodContext);
                    }
                }
                else
                {
                    food.locX[n] = sx;
                    food.locY[n] = sy;
                    DrawFood(sx, sy, main.foodContext);
                }
                //main.gameDiv2.click(mapCmd.mClick);
                main.foodDiv.off('mousemove');
                main.foodDiv.off('mouseup');
            });
        }
    });
};

var attackCmd = function(mode){
    var rect = main.canvas.getBoundingClientRect(); 
    var div = $('.attack-div');
    div.off();

    div.mousedown(function(e){
        var sx = e.clientX - rect.left;
        var sy = e.clientY - rect.top;
        var flag = game.isClickAnimal(sx, sy);
        //console.log(flag[0] + ' ' + flag[1]);
        if (flag[0] === game.now)
        { 
            mapCmd.set();
            var n = flag[0], m = flag[1];
            var fx = game.p[n].ownAnimal[m].locX;
            var fy = game.p[n].ownAnimal[m].locY;
            //main.context.clearRect(fx, fy, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
            if (game.p[n].ownAnimal[m].haveEat)
                return;

            div.mousemove(function(ev){
                var mx = ev.clientX - rect.left;
                var my = ev.clientY - rect.top;
                //console.log(n + ' ' + m);
                var nx = game.p[n].ownAnimal[m].locX;
                var ny = game.p[n].ownAnimal[m].locY;
                //console.log(mx + ' ' + my);
                if (Math.abs(mx - sx) >= 5 && Math.abs(my - sy) >= 5)
                {
                    mx = mx - game.p[n].ownAnimal[m].width / 2;
                    my = my - game.p[n].ownAnimal[m].height / 2;
                    
                    var markX = game.p[n].ownAnimal[m].locX;
                    var markY = game.p[n].ownAnimal[m].locY + 30;
                    main.markContext.clearRect(markX, markY - 20, 20 ,20);
                    main.context.clearRect(nx, ny, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    //main.context.clearRect(fx, fy, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    //console.log(mx + ' ' + my);
                    //console.log(2);
                
                    div.off('mousemove');
                    div.mousemove(function(e){
                        main.tempContext.clearRect(mx, my, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                        mx = e.clientX - rect.left - game.p[n].ownAnimal[m].width / 2;
                        my = e.clientY - rect.top - game.p[n].ownAnimal[m].height / 2;
                        main.tempContext.drawImage(AnimalList.image[0], mx, my, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height);
                        game.p[n].ownAnimal[m].locX = mx;
                        game.p[n].ownAnimal[m].locY = my;
                    });
                }
            });

            div.mouseup(function(e){
                var mx = e.clientX - rect.left - game.p[n].ownAnimal[m].width / 2;
                var my = e.clientY - rect.top - game.p[n].ownAnimal[m].height / 2;
                var flag2 = game.isClickAnimal2(mx + game.p[n].ownAnimal[m].width / 2, my + game.p[n].ownAnimal[m].height / 2, n);
                //console.log(game.isOver3(mx, my, 90, 90, n, m));
                //console.log(flag2[0]);
                
                if (flag2[0] !== game.now && flag2[0] !== -1 && game.pFlag[n] === 0)
                {
                    //console.log(1);
                    //点击到了其他动物
                    game.p[n].ownAnimal[m].haveEat = 1;
                    game.pFlag[n] = 1;//本轮已经行动
                    var tagN = flag2[0], tagM = flag2[1];
                    var own = game.p[n].ownAnimal[m], tag = game.p[tagN].ownAnimal[tagM];
                    if (game.isEat(own, tag))
                    {
                        Board.addText('玩家 ' + n + ' 的动物成功捕猎...', n);
                        Board.addText('玩家 ' + tagN + ' 的动物被吃掉了...', tagN);
                        //目标动物死亡-----------
                        //main.context2.fillRect(game.p[tagN].ownAnimal[tagM].locX, game.p[tagN].ownAnimal[tagM].locY, game.p[tagN].ownAnimal[tagM].width, game.p[tagN].ownAnimal[tagM].height + 13);
                        animalDie(tagN, tagM);
                        game.p[tagN].ownAnimal.splice(tagM, 1);
                        game.p[tagN].ownAnimal.size--;
                        //绘制动物------------
                        main.context.drawImage(AnimalList.image[0], mx, my, 90, 90);
                        textEnter("玩家" + n, mx + 45, my + 90 + 11, 50, 20, 2, main.context, game.p[n].color[0], game.p[n].color[1], game.p[n].color[2]);
                        game.p[n].ownAnimal[m].locX = mx;
                        game.p[n].ownAnimal[m].locY = my;
                        //main.context.fillRect(mx, my, 90, 90);

                        //喂食-----------------
                        main.markContext.font = "20px arial";
                        main.markContext.fillStyle = "rgba(" + game.p[n].color[0] + ',' + game.p[n].color[1] + ',' + game.p[n].color[2] + ',0.9)';
                        var markX = game.p[n].ownAnimal[m].locX;
                        var markY = game.p[n].ownAnimal[m].locY + 30;
                        game.p[n].ownAnimal[m].totFood += 2;
                        if (game.p[n].ownAnimal[m].totFood > game.p[n].ownAnimal[m].foodNeed)
                            game.p[n].ownAnimal[m].totFood = game.p[n].ownAnimal[m].foodNeed;
                        main.markContext.clearRect(markX, markY - 20, 20 ,20);
                        main.markContext.fillText(game.p[n].ownAnimal[m].totFood, markX, markY);
                        //切换玩家
                        game.switch(1);
                    }
                    else
                    {
                        console.log(2);
                        Board.addText('玩家 ' + n + ' 的动物捕猎失败...', n);
                        Board.addText('玩家 ' + tagN + ' 的动物躲避了攻击...', tagN);
                        main.tempContext.clearRect(game.p[n].ownAnimal[m].locX, game.p[n].ownAnimal[m].locY, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                        main.context.drawImage(AnimalList.image[0], fx, fy, 90, 90);
                        textEnter("玩家" + n, fx + 45, fy + 90 + 11, 50, 20, 2, main.context, game.p[n].color[0], game.p[n].color[1], game.p[n].color[2]);
                        game.p[n].ownAnimal[m].locX = fx;
                        game.p[n].ownAnimal[m].locY = fy;
                        
                        //喂食-----------------
                        main.markContext.font = "20px arial";
                        main.markContext.fillStyle = "rgba(" + game.p[n].color[0] + ',' + game.p[n].color[1] + ',' + game.p[n].color[2] + ',0.9)';
                        var markX = game.p[n].ownAnimal[m].locX;
                        var markY = game.p[n].ownAnimal[m].locY + 30;
                        main.markContext.clearRect(markX, markY - 20, 20 ,20);
                        if (game.p[n].ownAnimal[m].totFood)
                            main.markContext.fillText(game.p[n].ownAnimal[m].totFood, markX, markY);
                        //切换玩家
                        game.switch(1);
                    }
                }
                else if (game.isOver3(mx, my, 90, 90, n, m) && food.isOver(mx, my, 90, 90))
                {
                    //console.log(3);
                    //未点击无重叠
                    //console.log(2);
                    main.context.clearRect(game.p[n].ownAnimal[m].locX, game.p[n].ownAnimal[m].locY, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    main.tempContext.clearRect(game.p[n].ownAnimal[m].locX, game.p[n].ownAnimal[m].locY, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    //DrawAnimal(mx, my);
                    main.context.drawImage(AnimalList.image[0], mx, my, 90, 90);
                    textEnter("玩家" + n, mx + 45, my + 90 + 11, 50, 20, 2, main.context, game.p[n].color[0], game.p[n].color[1], game.p[n].color[2]);
                    game.p[n].ownAnimal[m].locX = mx;
                    game.p[n].ownAnimal[m].locY = my;

                    //喂食-----------------
                    main.markContext.font = "20px arial";
                    main.markContext.fillStyle = "rgba(" + game.p[n].color[0] + ',' + game.p[n].color[1] + ',' + game.p[n].color[2] + ',0.9)';
                    var markX = game.p[n].ownAnimal[m].locX;
                    var markY = game.p[n].ownAnimal[m].locY + 30;
                    main.markContext.clearRect(markX, markY - 20, 20 ,20);
                    if (game.p[n].ownAnimal[m].totFood)
                        main.markContext.fillText(game.p[n].ownAnimal[m].totFood, markX, markY);
                }
                else
                {
                    console.log(4);
                    //未点击，有重叠
                    //console.log(3);
                    //main.context.clearRect(game.p[n].ownAnimal[m].locX, game.p[n].ownAnimal[m].locY, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    main.tempContext.clearRect(game.p[n].ownAnimal[m].locX, game.p[n].ownAnimal[m].locY, game.p[n].ownAnimal[m].width, game.p[n].ownAnimal[m].height + 13);
                    main.context.drawImage(AnimalList.image[0], fx, fy, 90, 90);
                    textEnter("玩家" + n, fx + 45, fy + 90 + 11, 50, 20, 2, main.context, game.p[n].color[0], game.p[n].color[1], game.p[n].color[2]);
                    game.p[n].ownAnimal[m].locX = fx;
                    game.p[n].ownAnimal[m].locY = fy;

                    //喂食-----------------
                    main.markContext.font = "20px arial";
                    main.markContext.fillStyle = "rgba(" + game.p[n].color[0] + ',' + game.p[n].color[1] + ',' + game.p[n].color[2] + ',0.9)';
                    var markX = game.p[n].ownAnimal[m].locX;
                    var markY = game.p[n].ownAnimal[m].locY + 30;
                    main.markContext.clearRect(markX, markY - 20, 20 ,20);
                    if (game.p[n].ownAnimal[m].totFood)
                        main.markContext.fillText(game.p[n].ownAnimal[m].totFood, markX, markY);
                }
                
                div.off('mousemove');
                div.off('mouseup')
            });
        }
    });
};

var drag = {
    mx: 0, my: 0,
    width: 77, height: 120,
    draw: function(){
        main.context2.beginPath();
        main.context2.drawImage(cardImage[0], drag.mx, drag.my, drag.width, drag.height);
        main.context2.closePath();
    },
    animate: function(){
        var rect = main.canvas.getBoundingClientRect(); 
        //console.log(drag.mx + ' ' + drag.my);

        $('.game-div').mousedown(function(e){
            drag.mx = e.clientX - rect.left -36;
            drag.my = e.clientY - rect.top - 60;
            //console.log(drag.mx + ' ' + drag.my);
            main.context2.beginPath();
            main.context2.drawImage(cardImage[0], drag.mx, drag.my, drag.width, drag.height);
            main.context2.closePath();

            $('.game-div').mousemove(function(e){
                main.context2.clearRect(drag.mx, drag.my, drag.width, drag.height);
                drag.mx = e.clientX - rect.left -36;
                drag.my = e.clientY - rect.top - 60;
                //console.log(drag.mx + ' ' + drag.my);
                drag.draw();
            });

            $('.game-div').mouseup(function(){
                main.context2.clearRect(drag.mx, drag.my, drag.width, drag.height);
                $('.game-div').off('mousemove');
                $('.game-div').off('mouseup');
            });  
        });
    }
};