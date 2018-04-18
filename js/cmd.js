var handCard = function(canvas){
    var context = canvas.getContext('2d');
    var f = [281, 380, 479, 579, 679, 779, 879];
    var td = $('.handcard td');
    var rect = canvas.getBoundingClientRect(); 

    td.mouseenter(function(){
        var tot = $(this);
        var i = tot.index();
        tot.css('width','77px');
        tot.css('height','120px');
        context.drawImage(cardImage[0], f[i] - rect.left, 585 - 120 - rect.top - 120, 154, 240);
    });
    td.mouseleave(function(){
        var tot = $(this);
        var i = tot.index();
        tot.css('width','77px');
        tot.css('height','120px');
        context.clearRect(f[i] - rect.left, 585 - 120 - rect.top - 120, 154, 240);
        tot.html('<img src="image/paibei.jpg" />')
    });
    td.click(function(){
        
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
        console.log(drag.mx + ' ' + drag.my);

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