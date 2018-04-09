class fifthclock {
    constructor() {
        let tick = () => {
            var date = new Date();
            var time = date.getMilliseconds() + 1000 * (date.getSeconds() + 60 * (date.getMinutes() + 60 * (date.getHours())));
            
            if($('#userinput')[0].value.length == 8) {
                var userinput = $('#userinput')[0].value.split(':');
                time = 1000 * (userinput[2] * 1 + 60 * (userinput[1] * 1 + 60 * (userinput[0] * 1)));  
            }
            
            time -= time % (1.10592 * 1000);
            
            this.calculate(time);
            this.run();
        }

        tick();
        setInterval(() => { 
            tick();
        }, 1.10592 * 1000);
    }

    calculate(_time) {
        this.mono =     (_time / 1000 / 60 / 60 / 5) /* 4.8 für 24h */;
        this.di =       this.mono /* 0.96 für 4.8h */ % 0.96;
        this.tri =      this.di /* 0.192 für 57.6m */ % 0.192;
        this.tetra =    this.tri /* 0.0384 für 11.52m */ % 0.0384;
        this.qui =      this.tetra /* 0.00768 für 2.304m */ % 0.00768;
        this.hex =      this.qui /* 0.001536 für 27.648s */ % 0.001536;
        this.hep =      this.hex /* 0.0003072 für 5.5296s */ % 0.0003072; // is 1.10592s

        this.mono =     this.mono   * 5 / 4.8;
        this.di =       this.di     * 5 / 0.96;
        this.tri =      this.tri    * 5 / 0.192;
        this.tetra =    this.tetra  * 5 / 0.0384;
        this.qui =      this.qui    * 5 / 0.00768;
        this.hex =      this.hex    * 5 / 0.001536;
        this.hep =      this.hep    * 5 / 0.0003072;
    }

    run() {
        $('#mono').css( "transform", "rotate(" + this.mono * 360 / 5 + "deg)");
        $('#di').css(   "transform", "rotate(" + this.di  * 360 / 5 + "deg)");
        $('#tri').css(  "transform", "rotate(" + this.tri  * 360 / 5 + "deg)");
        $('#tetra').css("transform", "rotate(" + this.tetra * 360 / 5 + "deg)");

        if(!$('#doublenotationcheckbox').prop('checked')) {
            $('#digit-mono' ).text(Math.floor(this.mono));
            $('#digit-di'   ).text(Math.floor(this.di));
            $('#digit-tri'  ).text(Math.floor(this.tri));
            $('#digit-tetra').text(Math.floor(this.tetra));
            $('#digit-qui'  ).text(Math.floor(this.qui));
            $('#digit-hex'  ).text(Math.floor(this.hex));
        } else {
            $('#digit-mono' ).text(Math.floor(this.mono) * 5 + Math.floor(this.di));
            $('#digit-di'   ).addClass('invisible');
            $('#digit-tri'  ).text(Math.floor(this.tri) * 5 + Math.floor(this.tetra));
            $('#digit-tetra').addClass('invisible');
            $('#digit-qui'  ).text(Math.floor(this.qui) * 5 + Math.floor(this.hex));
            $('#digit-hex'  ).addClass('invisible');
        }
        if($('#userinput')[0].value.length != 8) {
            $('.digits span').toggleClass('invisible');
        } else {
            $('.digits span').removeClass('invisible');
        }
        $('.clock-face').css('visibility', 'visible');
        $('.digits').css('visibility', 'visible');
    }
}