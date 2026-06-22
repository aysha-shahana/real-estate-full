//[custom Javascript]
//Project:	Oreo - Responsive Bootstrap 4 Template
//Primary use:	Oreo - Responsive Bootstrap 4 Template
//should be included in all pages. It controls some layout

$(function () {
    "use strict";

    // Customized line Index page
    $('#linecustom1').sparkline('html', {
        height: '35px',
        width: '100%',
        lineColor: '#e5d1e4',
        fillColor: '#f3e8f2',
        minSpotColor: true,
        maxSpotColor: true,
        spotColor: '#e2a8df',
        spotRadius: 1
    });
    $('#linecustom2').sparkline('html', {
        height: '35px',
        width: '100%',
        lineColor: '#c9e3f4',
        fillColor: '#dfeefa',
        minSpotColor: true,
        maxSpotColor: true,
        spotColor: '#8dbfe0',
        spotRadius: 1
    });
    $('#linecustom3').sparkline('html', {
        height: '35px',
        width: '100%',
        lineColor: '#efded3',
        fillColor: '#f8f0ea',
        minSpotColor: true,
        maxSpotColor: true,
        spotColor: '#e0b89d',
        spotRadius: 1
    });
    $('#linecustom4').sparkline('html', {
        height: '35px',
        width: '100%',
        lineColor: '#a0d6be',
        fillColor: '#cde6db',
        minSpotColor: true,
        maxSpotColor: true,
        spotColor: '#e0b89d',
        spotRadius: 1
    });

    // 
    $('.knob').knob({
        draw: function () {
        }
    });

    setTimeout(function () {
        // Total Properties
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#c3chart-properties', // id of chart wrapper
                data: {
                    columns: [
                        // each columns data
                        ['data1', 40],
                        ['data2', 10],
                        ['data3', 35],
                        ['data4', 15],
                    ],
                    type: 'donut', // default type of chart
                    labels: false,
                    colors: {
                        'data1': '#1E88E5',
                        'data2': '#F4A62A',
                        'data3': '#62bad9',
                        'data4': '#011824'
                    },
                    names: {
                        // name of each serie
                        'data1': 'Commercial',
                        'data2': 'Residential',
                        'data3': 'Purchased',
                        'data4': 'Rented',
                    }
                },
                axis: {
                },
                donut: {
                    label: {
                        show: false
                    }
                },
                legend: {
                    show: true, //hide legend
                    position: 'right'
                },
                padding: {
                    bottom: 0,
                    top: 0
                },
            });
        });
        // Graph this year
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#chart-bar-rotated', // id of chart wrapper
                data: {
                    columns: [
                        // each columns data
                        ['data1', 112, 58, 215, 180, 195, 173],
                        ['data2', 70, 78, 59, 76, 92, 128]
                    ],
                    type: 'bar', // default type of chart
                    colors: {
                        'data1': '#011824',
                        'data2': '#F4A62A'
                    },
                    names: {
                        // name of each serie
                        'data1': 'Buying',
                        'data2': 'Selling'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        // name of each category
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    y: {
                        tick: {
                            format: d3.format('$,')
                        }
                    },
                    rotated: true,
                },
                bar: {
                    width: 16
                },
                legend: {
                    show: true, //hide legend
                },
                padding: {
                    bottom: 0,
                    top: 0
                },
            });
        });
        // Browser Usage
        $(document).ready(function () {
            var chart = c3.generate({
                bindto: '#c3chart-Browser-Usage', // id of chart wrapper
                data: {
                    columns: [
                        // each columns data
                        ['Villa', villa_count],
                        ['Apartment', apartment_count],
                        ['House', house_count],
                        ['Plot', plot_count]
                    ],
                    type: 'donut', // default type of chart
                    colors: {
                        Villa: '#1E88E5',
                        Apartment: '#F4A62A',
                        House: '#62bad9',
                        Plot: '#011824'
                    }
                },

                donut: {
                    title: "Property Types"
                },

                axis: {
                },
                legend: {
                    show: true, //hide legend
                    position: 'bottom'
                },
                padding: {
                    bottom: 0,
                    top: 0
                },
            });
        });
    }, 100);

   
});


//======
$(window).on('scroll', function () {
    $('.card .sparkline').each(function () {
        var imagePos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 400) {
            $(this).addClass("pullUp");
        }
    });
});
