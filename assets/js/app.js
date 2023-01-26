'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'assets/views/home.html', true),            
            new Route('about', 'assets/views/about.html'),
            new Route('sonogram', 'assets/views/sonogram.html')
        ]);
    }
    init();
}());