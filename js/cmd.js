var handCard = function(canvas){
    var context = canvas.getContext('2d');
    var f = [281, 380, 479, 579, 679, 779, 879];
    var td = $('.handcard td');
    
    cardImage[0].onload = function(){
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
};