// https://www.apptrino.com/assets/plugins/cube-portfolio/documentation/#options
(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#js-grid-blog-posts').cubeportfolio({
        filters: '#js-filters-blog-posts',
        search: '#js-search-blog-posts',
        layoutMode: 'grid',
        defaultFilter: '.new',
        animationType: '3dflip', // Options: fadeOut, quicksand, boxShadow, bounceLeft, bounceTop, bounceBottom, moveLeft, slideLeft, fadeOutTop, sequentially, skew slideDelay 3d Flip, rotateSides flipOutDelay, flipOut unfold foldLeft, scaleDown scaleSides, frontRow flipBottom, rotateRoom
        gapHorizontal: 35,
        gapVertical: 30,
        gridAdjustment: 'responsive', // Options: defualt, alignCenter, responsive
        mediaQueries: [{
            width: 1500,
            cols: 4,
        }, {
            width: 1100,
            cols: 3,
        }, {
            width: 800,
            cols: 3,
        }, {
            width: 480,
            cols: 2,
            options: {
                caption: '',
                gapHorizontal: 50,
                gapVertical: 20,
            }
        },
        {
            width: 320,
            cols: 1,
            options: {
                caption: '',
                gapHorizontal: 50
            }
        }],
        caption: 'overlayBottomPush', // Options: revealBottom, pushTop, pushDown, revealTop, moveRight, moveLeft, overlayBottomPush, overlayBottom, overlayBottomReveal, overlayBottomAlong, overlayRightAlong, minimal, fadeIn, zoom
        displayType: 'sequentially', // Options: default, fadeIn, lazyLoading, fadeInToTop, sequentially, bottomToTop, 
        displayTypeSpeed: 80,
        // plugins: {
        //     loadMore: {
        //         element: '#js-loadMore-blogs',
        //         action: 'click',
        //         loadItems: 3,
        //     }
        // },
    });
})(jQuery, window, document);

