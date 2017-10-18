function analogClock(){
}
analogClock.prototype.run = function() {
    var date = new Date()
    var day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    var time = date.getMilliseconds() + 1000 * (date.getSeconds() + 60 * (date.getMinutes() + 60 * (date.getHours())));
    //var time2 = date.getTime() - day.getTime();
    if(document.getElementById('userinput').value != "00:00:00") {
        var userinput = document.getElementById('userinput').value.split(':');
        if(userinput.length != 3) { userinput[2] = '00'; }
        time = 1000 * (userinput[2] * 1 + 60 * (userinput[1] * 1 + 60 * (userinput[0] * 1)));  
    }
    
    var mono = (time / 1000 / 60 / 60 / 5) /* 4.8 für 24h */;
    var di = mono /* 0.96 für 4.8h */ % 0.96;
    var tri = di /* 0.192 für 57.6m */ % 0.192;
    var tetra = tri /* 0.0384 für 11.6m */ % 0.0384;
    var qui = tetra /* 0.00768 für 2.3m */ % 0.00768;
    jQuery('#mono').css("transform", "rotate(" + mono * 360 / 4.8 + "deg)");
    jQuery('#di').css("transform", "rotate(" + di  * 360 / 0.96 + "deg)");
    jQuery('#tri').css("transform", "rotate(" + tri  * 360 / 0.192 + "deg)");
    jQuery('#tetra').css("transform", "rotate(" + tetra * 360 / 0.0384 + "deg)");

    jQuery('#digit-mono').text(Math.floor(mono * 5 / 4.8));
    jQuery('#digit-di').text(Math.floor(di  * 5 / 0.96));
    jQuery('#digit-tri').text(Math.floor(tri  * 5 / 0.192));
    jQuery('#digit-tetra').text(Math.floor(tetra * 5 / 0.0384));
    jQuery('#digit-qui').text(Math.floor(qui * 5 / 0.00768));

    jQuery('.digits span').toggleClass('invisible');
    jQuery('.clock-face').css('visibility', 'visible');
    jQuery('.digits').css('visibility', 'visible');
};