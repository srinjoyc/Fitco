/*****
* CONFIGURATION
*/
    // Active ajax page loader
    $.ajaxLoad = false;

        //required when $.ajaxLoad = true
        $.defaultPage = 'main.html';
        $.subPagesDirectory = 'views/';
        $.page404 = 'pages/404.html';
        $.mainContent = $('#ui-view');

    //Main navigation
    $.navigation = $('nav > ul.nav');

    //Dynamic Title only if $.ajaxLoad = true
    $.dynamicTitle = true;

    //Dynamic Breadcrumb only if $.ajaxLoad = true
    $.dynamicBreadcrumb = true;

    $.panelIconOpened = 'icon-arrow-up';
    $.panelIconClosed = 'icon-arrow-down';

    //Default colours
    $.brandPrimary =  '#20a8d8';
    $.brandSuccess =  '#4dbd74';
    $.brandInfo =     '#63c2de';
    $.brandWarning =  '#f8cb00';
    $.brandDanger =   '#f86c6b';

    $.grayDark =      '#2a2c36';
    $.gray =          '#55595c';
    $.grayLight =     '#818a91';
    $.grayLighter =   '#d1d4d7';
    $.grayLightest =  '#f8f9fa';

/*****
* ASYNC LOAD
* Load JS files and CSS files asynchronously in ajax mode
*/
    function loadJS(jsFiles, pageScript) {

        for(i=0;i<jsFiles.length;i++){

            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.src = jsFiles[i];
            body.appendChild(script);
        }

        if (pageScript) {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.src = pageScript;
            body.appendChild(script);
        }

        init();
    }

    var cssArray = {};

    function loadCSS(cssFile, end, callback) {

        if (!cssArray[cssFile]) {
            cssArray[cssFile] = true;

            if (end == 1) {

                var head = document.getElementsByTagName('head')[0];
                var s = document.createElement('link');
                s.setAttribute('rel', 'stylesheet');
                s.setAttribute('type', 'text/css');
                s.setAttribute('href', cssFile);

                s.onload = callback;
                head.appendChild(s);

            } else {

                var head = document.getElementsByTagName('head')[0];
                var style = document.getElementById('main-style');

                var s = document.createElement('link');
                s.setAttribute('rel', 'stylesheet');
                s.setAttribute('type', 'text/css');
                s.setAttribute('href', cssFile);

                s.onload = callback;
                head.insertBefore(s, style);

            }

        } else if (callback) {
            callback();
        }

    }

/****
* AJAX LOAD
* Load pages asynchronously in ajax mode
*/

if ($.ajaxLoad) {

    paceOptions = {
        elements: false,
        restartOnRequestAfter: false
    };

    url = location.hash.replace(/^#/, '');

    if (url != '') {
        setUpUrl(url);
    } else {
        setUpUrl($.defaultPage);
    }

    $(document).on('click', '.nav a[href!="#"]', function(e) {
        if ( $(this).parent().parent().hasClass('nav-tabs') || $(this).parent().parent().hasClass('nav-pills') ) {
            e.preventDefault();
        } else if ( $(this).attr('target') == '_top' ) {
            e.preventDefault();
            $this = $(e.currentTarget);
            window.location = ($this.attr('href'));
        } else if ( $(this).attr('target') == '_blank' ) {
            e.preventDefault();
            $this = $(e.currentTarget);
            window.open($this.attr('href'));
        } else {
            e.preventDefault();
            var target = $(e.currentTarget);
            setUpUrl(target.attr('href'));
        }
    });

    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });
}

function setUpUrl(url) {

    $('.nav li .nav-link').removeClass('active');
    $('.nav li.nav-dropdown').removeClass('open');
    $('.nav li:has(a[href="' + url + '"])').addClass('open');
    $('.nav a[href="' + url + '"]').addClass('active');

    loadPage(url);
}

function loadPage(url) {

    $.ajax({
        type : 'GET',
        url : $.subPagesDirectory + url,
        dataType : 'html',
        cache : false,
        async: false,
        beforeSend : function() {
            $.mainContent.css({ opacity : 0 });
        },
        success : function() {
            Pace.restart();
            $('html, body').animate({ scrollTop: 0 }, 0);
            $.mainContent.load($.subPagesDirectory + url, null, function (responseText) {
                window.location.hash = url;
                setUpTitle(url);
            }).delay(250).animate({ opacity : 1 }, 0);
        },
        error : function() {
            window.location.href = $.page404;
        }

    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setUpTitle(url) {

    if ($.dynamicTitle) {

        $.currentTitle = $('#current-title');
        $.currentDesc = $('#current-desc');

        var href = url;

        if ($.currentTitle.length) {
            $('.page-title').html($.currentTitle.html());
        } else {
            var title = href.substr(href.lastIndexOf('/') + 1)
            $('.page-title').html(capitalizeFirstLetter(title.replace('.html', '')));
        }
        $('.page-title').html($.currentTitle.html());
        $('.page-desc').html($.currentDesc.html());

    }
}

/****
* MAIN NAVIGATION
*/

$(document).ready(function($){

    navigationSmartResize();

    // Add class .active to current link - AJAX Mode off
    $.navigation.find('a').each(function(){

        var cUrl = String(window.location);

        if (cUrl.substr(cUrl.length - 1) == '#') {
            cUrl = cUrl.slice(0,-1);
        }

        if ($($(this))[0].href==cUrl) {
            $(this).addClass('active');

            $(this).parents('ul').add(this).each(function(){
                $(this).parent().addClass('open');
            });
        }
    });

    // Dropdown Menu
    $.navigation.on('click', 'a', function(e){

        if ($.ajaxLoad) {
            e.preventDefault();
        }

        if ($(this).hasClass('nav-dropdown-toggle')) {
            $(this).parent().toggleClass('open');
        }

    });

    function resizeBroadcast() {
        var timesRun = 0;
        var interval = setInterval(function(){
            timesRun += 1;
            if(timesRun === 5){
                clearInterval(interval);
            }
            window.dispatchEvent(new Event('resize'));
        }, 62.5);
    }

    /* ---------- Main Menu Open/Close, Min/Full ---------- */
    $('.navbar-toggler').click(function(){

        var bodyClass = localStorage.getItem('body-class');

        if ($(this).hasClass('layout-toggler') && $('body').hasClass('sidebar-off-canvas')) {
            $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
            //resize charts
            resizeBroadcast();

        } else if ($(this).hasClass('layout-toggler') && ($('body').hasClass('sidebar-nav') || bodyClass == 'sidebar-nav')) {
            $('body').toggleClass('sidebar-nav');
            localStorage.setItem('body-class', 'sidebar-nav');
            if (bodyClass == 'sidebar-nav') {
                localStorage.clear();
            }
            //resize charts
            resizeBroadcast();
        } else {
            $('body').toggleClass('mobile-open');
        }
    });

    $('.aside-toggle').click(function(){
        $('body').toggleClass('aside-menu-open');

        //resize charts
        resizeBroadcast();
    });

    $('.sidebar-close').click(function(){
        $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function(e){
        e.preventDefault();
    });

});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function(e){
    e.preventDefault();

    if ($(this).hasClass('btn-close')) {
        $(this).parent().parent().parent().fadeOut();
    } else if ($(this).hasClass('btn-minimize')) {
        var $target = $(this).parent().parent().next('.card-block');
        if (!$(this).hasClass('collapsed')) {
            $('i',$(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
        } else {
            $('i',$(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
        }

    } else if ($(this).hasClass('btn-setting')) {
        $('#myModal').modal('show');
    }

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

    /* ---------- Tooltip ---------- */
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

    /* ---------- Popover ---------- */
    $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}

/****
* SMART RESIZE
*/
$(window).bind('resize', navigationSmartResize);

function navigationSmartResize(e) {

    if ($('body').hasClass('sidebar-nav') && $('body').hasClass('fixed-nav')) {
        var bodyHeight = $(window).height();
        var headerHeight = $('header').outerHeight();
        var sidebarHeaderHeight = $('.sidebar-header').outerHeight();
        var sidebarFooterHeight = $('.sidebar-footer').outerHeight();

        if ($('body').hasClass('sidebar-off-canvas')) {
            $('nav.sidebar-nav').css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
        } else {
            $('nav.sidebar-nav').css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
        }
    }
}


$(function(){

    toastr.info('Bootstrap 4 on steroids', 'Welcome to ROOT Admin', {
        closeButton: true,
        progressBar: true,
    });

    $('input[name="daterange"]').daterangepicker({
        opens: 'left',
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });

    //convert Hex to RGBA
    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: [1, 18, 9, 17, 34, 22, 11]
            },
        ]
    };
    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }],
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: [78, 81, 80, 45, 34, 12, 40]
            },
        ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    //Random Numbers
    function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40,100));
    }


    var options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.7,
            }],
            yAxes: [{
                display: false,
            }]
        },

    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderColor: 'transparent',
                data: data
            },
        ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    //Main Chart
    var elements = 27;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
        data1.push(random(50,200));
        data2.push(random(80,100));
        data3.push(65);
    }

    var data = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: convertHex($.brandInfo,10),
                borderColor: $.brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data1
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data2
            },
            {
                label: 'My Third dataset',
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5],
                data: data3
            }
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };
    var ctx = $('#main-chart');
    var mainChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    //Social Box Charts
    var labels = ['January','February','March','April','May','June','July'];

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        }
    };

    var data1 = {
        labels: labels,
        datasets: [{
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [65, 59, 84, 84, 51, 55, 40]
        }]
    };
    var ctx = $('#social-box-chart-1');
    var socialBoxChart1 = new Chart(ctx, {
        type: 'line',
        data: data1,
        options: options
    });

    var data2 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [1, 13, 9, 17, 34, 41, 38]
            }
        ]
    };
    var ctx = $('#social-box-chart-2').get(0).getContext('2d');
    var socialBoxChart2 = new Chart(ctx, {
        type: 'line',
        data: data2,
        options: options
    });

    var data3 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#social-box-chart-3').get(0).getContext('2d');
    var socialBoxChart3 = new Chart(ctx, {
        type: 'line',
        data: data3,
        options: options
    });

    var data4 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#social-box-chart-4').get(0).getContext('2d');
    var socialBoxChart4 = new Chart(ctx, {
        type: 'line',
        data: data4,
        options: options
    });



    //Sparkline Charts
    var labels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    var options = {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };

    var data1 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandPrimary,
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-1');
    var sparklineChart1 = new Chart(ctx, {
        type: 'line',
        data: data1,
        options: options
    });

    var data2 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-2');
    var sparklineChart2 = new Chart(ctx, {
        type: 'line',
        data: data2,
        options: options
    });

    var data3 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandWarning,
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-3');
    var sparklineChart3 = new Chart(ctx, {
        type: 'line',
        data: data3,
        options: options
    });

    var data4 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-4');
    var sparklineChart4 = new Chart(ctx, {
        type: 'line',
        data: data4,
        options: options
    });

    var data5 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: '#d1d4d7',
                borderWidth: 2,
                data: [35, 23, 56, 22, 97, 23, 64]
            }
        ]
    };
    var ctx = $('#sparkline-chart-5');
    var sparklineChart5 = new Chart(ctx, {
        type: 'line',
        data: data5,
        options: options
    });

    var data6 = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandInfo,
                borderWidth: 2,
                data: [78, 81, 80, 45, 34, 12, 40]
            }
        ]
    };
    var ctx = $('#sparkline-chart-6');
    var sparklineChart6= new Chart(ctx, {
        type: 'line',
        data: data6,
        options: options
    });


    //Gauge JS
    var options = {
        lines: 12, // The number of lines to draw
        angle: 0.5, // The length of each line
        lineWidth: 0.08, // The line thickness
        pointer: {
            length: 0.9, // The radius of the inner circle
            strokeWidth: 0.035, // The rotation offset
            color: '#000000' // Fill color
        },
        limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
        colorStart: $.brandInfo,   // Colors
        colorStart: $.brandInfo,    // just experiment with them
        borderColor: '#d1d4d7',   // to see which ones work best for you
        generateGradient: true
    };
    var target1 = document.getElementById('gauge-1'); // your canvas element
    var gauge1 = new Donut(target1).setOptions(options); // create sexy gauge!
        gauge1.maxValue = 100; // set max gauge value
        gauge1.animationSpeed = 32; // set animation speed (32 is default value)
        gauge1.set(48); // set actual value

    var target2 = document.getElementById('gauge-2');
    var gauge2 = new Donut(target2).setOptions(options);
        gauge2.maxValue = 100;
        gauge2.animationSpeed = 32;
        gauge2.set(61);

    var target3 = document.getElementById('gauge-3');
    var gauge3 = new Donut(target3).setOptions(options);
        gauge3.maxValue = 100;
        gauge3.animationSpeed = 32;
        gauge3.set(33);

    var target4 = document.getElementById('gauge-4');
    var gauge4 = new Donut(target4).setOptions(options);
        gauge4.maxValue = 100;
        gauge4.animationSpeed = 32;
        gauge4.set(23);

    var target5 = document.getElementById('gauge-5');
    var gauge5 = new Donut(target5).setOptions(options);
        gauge5.maxValue = 100;
        gauge5.animationSpeed = 32;
        gauge5.set(78);

    var target6 = document.getElementById('gauge-6');
    var gauge6 = new Donut(target6).setOptions(options);
        gauge6.maxValue = 100;
        gauge6.animationSpeed = 32;
        gauge6.set(11);

});

$(function (){

    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
            {
                label: 'My First dataset',
                backgroundColor : 'rgba(220,220,220,0.2)',
                borderColor : 'rgba(220,220,220,1)',
                pointBackgroundColor : 'rgba(220,220,220,1)',
                pointBorderColor : '#fff',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                label: 'My Second dataset',
                backgroundColor : 'rgba(151,187,205,0.2)',
                borderColor : 'rgba(151,187,205,1)',
                pointBackgroundColor : 'rgba(151,187,205,1)',
                pointBorderColor : '#fff',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }

    var ctx = document.getElementById('canvas-1');
    var chart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true
        }
    });


    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var barChartData = {
        labels : ['January','February','March','April','May','June','July'],
        datasets : [
            {
                backgroundColor : 'rgba(220,220,220,0.5)',
                borderColor : 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                backgroundColor : 'rgba(151,187,205,0.5)',
                borderColor : 'rgba(151,187,205,0.8)',
                highlightFill : 'rgba(151,187,205,0.75)',
                highlightStroke : 'rgba(151,187,205,1)',
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }
    var ctx = document.getElementById('canvas-2');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true
        }
    });


    var doughnutData = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    var ctx = document.getElementById('canvas-3');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: doughnutData,
        options: {
            responsive: true
        }
    });


    var radarChartData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(220,220,220,0.2)',
                borderColor: 'rgba(220,220,220,1)',
                pointBackgroundColor: 'rgba(220,220,220,1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65,59,90,81,56,55,40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(151,187,205,0.2)',
                borderColor: 'rgba(151,187,205,1)',
                pointBackgroundColor: 'rgba(151,187,205,1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28,48,40,19,96,27,100]
            }
        ]
    };
    var ctx = document.getElementById('canvas-4');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: radarChartData,
        options: {
            responsive: true
        }
    });


    var pieData = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    var ctx = document.getElementById('canvas-5');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: {
            responsive: true
        }
    });


    var polarData = {
        datasets: [{
            data: [
                11,
                16,
                7,
                3,
                14
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB'
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            'Red',
            'Green',
            'Yellow',
            'Grey',
            'Blue'
        ]
    };
    var ctx = document.getElementById('canvas-6');
    var chart = new Chart(ctx, {
        type: 'polarArea',
        data: polarData,
        options: {
            responsive: true
        }
    });
});
$(function () {
    var i = -1;
    var toastCount = 0;
    var $toastlast;

    var getMessage = function () {
        var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
            '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
            'Are you the six fingered man?',
            'Inconceivable!',
            'I do not think that means what you think it means.',
            'Have fun storming the castle!'
        ];
        i++;
        if (i === msgs.length) {
            i = 0;
        }

        return msgs[i];
    };

    var getMessageWithClearButton = function (msg) {
        msg = msg ? msg : 'Clear itself?';
        msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
        return msg;
    };

    $('#showtoast').click(function () {
        var shortCutFunction = $("#toastTypeGroup input:radio:checked").val();
        var msg = $('#message').val();
        var title = $('#title').val() || '';
        var $showDuration = $('#showDuration');
        var $hideDuration = $('#hideDuration');
        var $timeOut = $('#timeOut');
        var $extendedTimeOut = $('#extendedTimeOut');
        var $showEasing = $('#showEasing');
        var $hideEasing = $('#hideEasing');
        var $showMethod = $('#showMethod');
        var $hideMethod = $('#hideMethod');
        var toastIndex = toastCount++;
        var addClear = $('#addClear').prop('checked');

        toastr.options = {
            closeButton: $('#closeButton').prop('checked'),
            debug: $('#debugInfo').prop('checked'),
            newestOnTop: $('#newestOnTop').prop('checked'),
            progressBar: $('#progressBar').prop('checked'),
            positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
            preventDuplicates: $('#preventDuplicates').prop('checked'),
            onclick: null
        };

        if ($('#addBehaviorOnToastClick').prop('checked')) {
            toastr.options.onclick = function () {
                alert('You can perform some custom action after a toast goes away');
            };
        }

        if ($showDuration.val().length) {
            toastr.options.showDuration = $showDuration.val();
        }

        if ($hideDuration.val().length) {
            toastr.options.hideDuration = $hideDuration.val();
        }

        if ($timeOut.val().length) {
            toastr.options.timeOut = addClear ? 0 : $timeOut.val();
        }

        if ($extendedTimeOut.val().length) {
            toastr.options.extendedTimeOut = addClear ? 0 : $extendedTimeOut.val();
        }

        if ($showEasing.val().length) {
            toastr.options.showEasing = $showEasing.val();
        }

        if ($hideEasing.val().length) {
            toastr.options.hideEasing = $hideEasing.val();
        }

        if ($showMethod.val().length) {
            toastr.options.showMethod = $showMethod.val();
        }

        if ($hideMethod.val().length) {
            toastr.options.hideMethod = $hideMethod.val();
        }

        if (addClear) {
            msg = getMessageWithClearButton(msg);
            toastr.options.tapToDismiss = false;
        }
        if (!msg) {
            msg = getMessage();
        }

        $('#toastrOptions').text('Command: toastr["'
                + shortCutFunction
                + '"]("'
                + msg
                + (title ? '", "' + title : '')
                + '")\n\ntoastr.options = '
                + JSON.stringify(toastr.options, null, 2)
        );

        var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
        $toastlast = $toast;

        if(typeof $toast === 'undefined'){
            return;
        }

        if ($toast.find('#okBtn').length) {
            $toast.delegate('#okBtn', 'click', function () {
                alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                $toast.remove();
            });
        }
        if ($toast.find('#surpriseBtn').length) {
            $toast.delegate('#surpriseBtn', 'click', function () {
                alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
            });
        }
        if ($toast.find('.clear').length) {
            $toast.delegate('.clear', 'click', function () {
                toastr.clear($toast, { force: true });
            });
        }
    });

    function getLastToast(){
        return $toastlast;
    }
    $('#clearlasttoast').click(function () {
        toastr.clear(getLastToast());
    });
    $('#cleartoasts').click(function () {
        toastr.clear();
    });
})
$(function(){

    function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data1.push(random(40,100));
        data2.push(random(20,100));
        data3.push(random(60,100));
    }

    var options = {
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
                points:false,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    max: 102
                }
            }],
        },
        elements: { point: { radius: 0 } }
    };

    var data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'transparent',
            borderColor: $.brandInfo,
            borderWidth: 2,
            data: data1
        }]
    }

    var ctx = $('#header-chart-1');
    var headerChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'transparent',
                borderColor : $.brandDanger,
                borderWidth: 2,
                data: data2
            },
        ]
    };
    var ctx = $('#header-chart-2');
    var headerChart2 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'transparent',
                borderColor : $.brandSuccess,
                borderWidth: 2,
                data: data3
            },
        ]
    };
    var ctx = $('#header-chart-3');
    var headerChart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

});
$(function (){

    $("#range_01").ionRangeSlider();

    $("#range_02").ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550
    });

    $("#range_03").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800,
        prefix: "$"
    });

    $("#range_04").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500
    });

    $("#range_05").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500,
        step: 250
    });

    $("#range_06").ionRangeSlider({
        type: "double",
        grid: true,
        min: -12.8,
        max: 12.8,
        from: -3.2,
        to: 3.2,
        step: 0.1
    });

    $("#range_07").ionRangeSlider({
        type: "double",
        grid: true,
        from: 1,
        to: 5,
        values: [0, 10, 100, 1000, 10000, 100000, 1000000]
    });

    $("#range_08").ionRangeSlider({
        grid: true,
        from: 5,
        values: [
            "zero", "one",
            "two", "three",
            "four", "five",
            "six", "seven",
            "eight", "nine",
            "ten"
        ]
    });


    $("#range_09").ionRangeSlider({
        grid: true,
        from: 3,
        values: [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ]
    });

    $("#range_10").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 100000,
        step: 1000,
        prettify_enabled: false
    });


    $("#range_11").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 200000,
        step: 1000,
        prettify_enabled: true
    });

    $("#range_12").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 300000,
        step: 1000,
        prettify_enabled: true,
        prettify_separator: "."
    });

    $("#range_13").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 400000,
        step: 1000,
        prettify_enabled: true,
        prettify: function (num) {
            return (Math.random() * num).toFixed(0);
        }
    });

    $("#range_14").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 10000,
        from: 1000,
        step: 9000,
        prefix: "$"
    });

    $("#range_15").ionRangeSlider({
        type: "single",
        grid: true,
        min: -90,
        max: 90,
        from: 0,
        postfix: "°"
    });

    $("#range_16").ionRangeSlider({
        grid: true,
        min: 18,
        max: 70,
        from: 30,
        prefix: "Age ",
        max_postfix: "+"
    });

    $("#range_17").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 145,
        to: 155,
        prefix: "Weight: ",
        postfix: " million pounds",
        decorate_both: true
    });

    $("#range_18").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 145,
        to: 155,
        prefix: "Weight: ",
        postfix: " million pounds",
        decorate_both: false
    });

    $("#range_19").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 148,
        to: 152,
        prefix: "Weight: ",
        postfix: " million pounds",
        values_separator: " → "
    });

    $("#range_20").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 148,
        to: 152,
        prefix: "Range: ",
        postfix: " light years",
        decorate_both: false,
        values_separator: " to "
    });

    $("#range_21").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: true,
        hide_from_to: true,
        grid: false
    });

    $("#range_22").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: true,
        hide_from_to: true,
        grid: false
    });

    $("#range_23").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: false,
        hide_from_to: true,
        grid: false
    });

    $("#range_24").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: true,
        hide_from_to: false,
        grid: false
    });

})
$(function(){

    //convert Hex to RGBA
    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    //Cards with Charts
    var labels = ['January','February','March','April','May','June','July'];
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart1');
    var cardChart1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: $.brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: [1, 18, 9, 17, 34, 22, 11]
            },
        ]
    };

    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, data.datasets[0].data) - 5,
                    max: Math.max.apply(Math, data.datasets[0].data) + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var ctx = $('#card-chart2');
    var cardChart2 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }],
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: [78, 81, 80, 45, 34, 12, 40]
            },
        ]
    };
    var ctx = $('#card-chart3');
    var cardChart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    //Random Numbers
    function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var elements = 16;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40,100));
    }


    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.7,
            }],
            yAxes: [{
                display: false,
            }]
        },

    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderColor: 'transparent',
                data: data
            },
        ]
    };
    var ctx = $('#card-chart4');
    var cardChart4 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandPrimary,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-1');
    var Chart1 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandWarning,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-2');
    var Chart2 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var elements = 15;
    var labels = [];
    var data = [];

    for (var i = 0; i <= elements; i++) {
        labels.push('1');
        data.push(random(40,100));
    }

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    var data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: $.brandSuccess,
                borderColor: 'transparent',
                borderWidth: 1,
                data: data
            },
        ]
    };
    var ctx = $('#chart-3');
    var Chart3 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandInfo,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-4');
    var Chart4 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandSuccess,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-5');
    var Chart5 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['January','February','March','April','May','June','July'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.brandDanger,
                borderWidth: 2,
                data: [65, 59, 84, 84, 51, 55, 40]
            },
        ]
    };
    var ctx = $('#chart-6');
    var Chart6 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
                points:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: { point: { radius: 0 } }
    };
    var data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                borderWidth: 2,
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9, 9, 17, 34, 22, 11]
            },
        ]
    };
    var ctx = $('.chart-7');
    var Chart7 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-2');
    var Chart72 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-3');
    var Chart73 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    var ctx = $('.chart-7-4');
    var Chart74 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
    };
    var data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
        datasets: [
            {
                backgroundColor: 'rgba(0,0,0,.2)',
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9, 9, 17, 34, 22, 11]
            },
        ]
    };
    var ctx = $('.chart-8');
    var Chart8 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-2');
    var Chart82 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-3');
    var Chart83 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-8-4');
    var Chart84 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var options = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 10,
                    maxRotation: 0,
                },
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };
    var data = {
        labels: ['M','T','W','T','F','S','S'],
        datasets: [
            {
                backgroundColor: $.grayLight,
                data: [17, 34, 22, 11, 3, 15, 12]
            },
        ]
    };
    var ctx = $('.chart-9');
    var Chart9 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-9-2');
    var Chart92 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-9-3');
    var Chart93 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    var ctx = $('.chart-9-4');
    var Chart94 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: {
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };
    var data = {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: $.grayLighter,
                pointBackgroundColor: '#fff',
                borderWidth: 3,
                data: [75, 59, 94, 104, 151, 155, 240]
            },
        ]
    };
    var ctx = $('#chart-10');
    var Chart10 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontColor: '#fff',
                    maxTicksLimit: 3,
                    maxRotation: 0,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(255,255,255,.2)',
                    zeroLineColor: 'rgba(255,255,255,.2)'
                },
                ticks: {
                    maxTicksLimit: 10,
                    stepSize: Math.ceil(45000 / 10),
                    max: 45000,
                    fontColor: '#fff',
                    callback: function(value) {
                        return '$' + value;
                    }
                }
            }]
        },
        elements: {
            point: {
                radius: 4,
                borderWidth: 2,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    };
    var data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: '#fff',
                borderWidth: 2,
                pointBackgroundColor: $.brandPrimary,
                data: [31000, 34000, 27000, 24000, 28000, 42500, 42000, 30000, 35500, 35500, 41500, 41600]
            },
        ]
    };
    var ctx = $('#chart-11').get(0).getContext('2d');
    var Chart11 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    maxRotation: 0,
                },
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };
    var data = {
        labels: ['US','PL','GB','DE','NL','CA','FI', 'RU', 'AU', 'N/A'],
        datasets: [
            {
                backgroundColor: $.brandSuccess,
                data: [35, 14, 10, 8, 6, 6, 5, 4, 3, 9]
            },
        ]
    };
    var ctx = $('#chart-12').get(0).getContext('2d');
    var Chart12 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });


    var opts1 = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: $.grayDark
        },
        limitMax: 'false',
        colorStart: $.brandInfo,
        colorStop: $.brandInfo,
        borderColor: $.grayLighter,
        generateGradient: true,
        responsive: true,
    };
    var target = document.getElementById('gauge1'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts1); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(random(0,3000)); // set actual value

    var opts2 = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: $.grayDark
        },
        limitMax: 'false',
        colorStart: $.brandSuccess,
        colorStop: $.brandSuccess,
        borderColor: $.grayLighter,
        generateGradient: true,
        responsive: true,
    };
    var target = document.getElementById('gauge2'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts2); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(random(0,3000)); // set actual value

    var opts3 = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: $.grayDark
        },
        limitMax: 'false',
        colorStart: $.brandWarning,
        colorStop: $.brandWarning,
        borderColor: $.grayLighter,
        generateGradient: true,
        responsive: true,
    };
    var target = document.getElementById('gauge3'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts3); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(random(0,3000)); // set actual value

    var opts4 = {
        lines: 12,
        angle: 0.15,
        lineWidth: 0.44,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: $.grayDark
        },
        limitMax: 'false',
        colorStart: $.brandDanger,
        colorStop: $.brandDanger,
        borderColor: $.grayLighter,
        generateGradient: true,
        responsive: true,
    };
    var target = document.getElementById('gauge4'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts4); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(random(0,3000)); // set actual value

})

