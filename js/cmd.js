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
        main.context2.drawImage(img, f[i] - rect.left - 36, 585 - 120 - rect.top - 120);
        //main.context.drawImage(CardDeck.image2[1], 600, 0);
    };
    var mLeave = function(){
        var tot = $(this);
        var i = tot.index();
        tot.css('cursor', '');
        main.context2.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
    };
    td.mouseenter(mEnter);
    td.mouseleave(mLeave);
    
    if (mode === 1)
    {
        td.mousedown(function(e){
            var sx = e.clientX - rect.left -36, sy = e.clientY - rect.top - 60, flag = false;
            var mx = sx, my = sy;
            var tot = $(this), html;
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
                        main.context2.clearRect(f[i] - rect.left - 36, 585 - 120 - rect.top - 120, 155, 240);
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
        console.log(222222);
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