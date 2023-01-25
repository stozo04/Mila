

	// Is to disable the preloader when the page finish load!
    $(window).load(function () {
        setTimeout(function () {
            $('#loader').css('display', 'none');
        }, 300);
    });

// Mobile Menu Toggle
    $(".m-menu .toggle, .m-close").on("click",function(){
      $(".m-menu").toggleClass("open");
    });

// Mobile Search Toggle
    $(".m-search .toggle, .s-close").on("click",function(){
      $("#mobile-header").toggleClass("open");
    });

// Mobile Menu List
$(document).ready(function(){
    $(".m-navigation ul > li > a").click(function(){
        $(".m-navigation ul ul").slideUp();
        if(!$(this).next().is(":visible"))
        {
            $(this).next().slideDown();
        }
    })
})
$(document).ready(function(){
    $(".m-navigation ul > li > ul > li > a").click(function(){
        $(".m-navigation ul ul ul").slideUp();
        if(!$(this).next().is(":visible"))
        {
            $(this).next().slideDown();
        }
    })
})

// Search Toggle
    $(".search .toggle").on("click",function(){
      $(".search").toggleClass("open");
    });

// Activate tooltip by bootstrap
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });

// Add parent class to navigation parents
    $(".m-navigation ul > li > ul, .m-navigation ul > li > ul ul,.topmenu ul > li > ul").parent().addClass('parent');

// This is function to activate the Sticky Sidebar Plugin
    jQuery(document).ready(function() {
        jQuery('#sidebar').theiaStickySidebar({
          // Settings
          additionalMarginTop: 80
        });
    });

// Fitvids Activated
    $(document).ready(function(){
        // Target your .container, .wrapper, .post, etc.
        $("#content").fitVids();
    });

// Scroll To Top
$(document).ready(function () {
    $('.totop').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

// This is function to activate the Sticky Header
(function($) {
    "use strict";
    $.fn.stickMe = function(options) {
        // Assigning variables
        var $window = $(window),
            $document = $(document),
            $elemTopOffset,
            $body = $('body'),
            position = 0,
            $elem = this,
            $elemHeight = $elem.innerHeight(),
            $win_center = $window.height() / 2,
            $pos,
            settings = $.extend({
                transitionDuration: 300,
                shadow: false,
                shadowOpacity: 0.3,
                animate: true,
                triggerAtCenter: true,
                topOffset: $elemHeight,
                transitionStyle: 'fade',
                stickyAlready: false
            }, options);
        // Initial state
        $elem
            .addClass('stick-me')
            .addClass('not-sticking');
        switch (settings.triggerAtCenter) {
            case (settings.triggerAtCenter && settings.topOffset < $elemHeight) || (settings.triggerAtCenter && settings.topOffset > $elemHeight):
                settings.triggerAtCenter = false;
                break;
        }
        if (settings.stickyAlready) {
            settings.triggerAtCenter = false;
            settings.topOffset = 0;
            stick();
        }

        $elemTopOffset = $elem.offset().top;

        function $elem_slide() {
            if (settings.animate === true && settings.transitionStyle === 'slide' && settings.stickyAlready !== true) {
                $elem.slideDown(settings.transitionDuration);
            }
            if (settings.animate === true && settings.transitionStyle === 'fade' && settings.stickyAlready !== true) {
                $elem.fadeIn(settings.transitionDuration);
            } else {
                $elem.show();
            }
            $elem.removeClass('not-sticking');
        }

        function stick() {
            if ($elem.hasClass('sticking')) {
                $elem.trigger('sticking');
            }
            if (position === 0) {
                position = 1;
                if(settings.stickyAlready === false) {
                    $elem.trigger('sticky-begin');
                }
            }
            if ($elem.hasClass('not-sticking')) {
                $elem.hide();
                $elem_slide();
            }
            if (settings.shadow === true) {
                $elem.css('box-shadow', '0px 1px 2px rgba(0,0,0,' + settings.shadowOpacity + ')');
            }
            $elem
                .addClass('sticking')
                .css('position', 'fixed')
                .css('top', '0');
            $body.css('padding-top', $elemHeight);
        }

        function unstick() {
            if (settings.shadow === true) {
                $elem.css('box-shadow', 'none');
            }
            $elem.addClass('not-sticking')
                .removeClass('sticking')
                .show()
                .css('position', 'relative');
            $body.css('padding-top', '0');
        }
        $window.scroll(function() {
            $pos = $window.scrollTop();
            if ($pos === 0) {
                position = 0;
                $elem.trigger('top-reached');
            }
            if (settings.triggerAtCenter === true) {
                if ($pos > $win_center + $elemHeight) {
                    stick();
                }
            }
            if (settings.triggerAtCenter === false) {
                if ($pos > settings.topOffset) {
                    stick();
                }
            }
            if ($pos + $window.height() > $document.height() - 1) {
                $elem.trigger('bottom-reached');
            }
            if (settings.triggerAtCenter === true) {
                if ($pos < (1 + $elemTopOffset)) {
                    unstick();
                }
            }
            if (settings.triggerAtCenter === false) {
                if ($pos < 1) {
                    if (settings.stickyAlready !== true) {
                        unstick();
                    }
                }
            }
        });
        return this;
    };
}(jQuery));

// Activate Sticky Header
$(document).ready(function(){
  $('.topbar').stickMe();
})

// Post Snippet Excrept
$('.post-snippet').each(function() {
    var txt = $(this).text();
    var j = txt.lastIndexOf(' ');
    if (j > 250) $(this).text(txt.substr(0, 550).replace(/[?,!\.-:;]*$/,
        '...'));
});
$('.item-snippet').each(function() {
    var txt = $(this).text();
    var j = txt.lastIndexOf(' ');
    if (j > 50) $(this).text(txt.substr(0, 80).replace(/[?,!\.-:;]*$/,
        '...'));
});

// Top Menu Navigation
var s = -1,
    a = "",
    t = "";
$(".topmenu").find("ul").find("li").each(function() {
    for (var e = $(this).text(), r = $(this).find("a").attr("href"), i =
        0, l = 0; l < e.length && (i = e.indexOf("_", i), -1 != i); l++)
        i++;
    if (level = l, level > s && (a += "<ul>", t += "<ul>"), level < s) {
        offset = s - level;
        for (var l = 0; l < offset; l++) a += "</ul></li>",
            t += "</ul></li>"
    }
    e = e.replace(/_/gi, ""), a += "<li><a href='" + r + "'>" + e +
        "</a>", t += "<li><a href='" + r + "'>";
    for (var l = 0; l < level; l++) t += "";
    t += e + "</a>", s = level
});
for (var i = 0; s >= i; i++) a += "</ul>", t += "</ul>", 0 != i && (a +=
    "</li>", t += "</li>");
$(".topmenu .LinkList").html(t), $(".topmenu ul li ul").parent("li").addClass(
    "parent"), $(".topmenu .widget").css("display", "block"), $(
    ".open-menu").click(function() {
    return $(".topmenu").slideToggle(), !1
});

// Optimize Images
$(".post.hentry .post-image a img").attr('src', function(i, src) {
    return src.replace('s1600', 'w770-h505');
});
$(".widget.Image a img,.widget.FeaturedPost img").attr('src', function(i, src) {
    return src.replace('s1600', 'w345-h245-c');
});
$(".avatar-image-container img").attr('src', function(i, src) {
    return src.replace('s35', 's50');
});
$(".PopularPosts img").attr('src', function(i, src) {
    return src.replace('w72-h72', 'w345-h180');
});
$(".instagram-widget img").attr('src', function(i, src) {
    return src.replace('s320', 'w227-h227');
});
$(".post-avatar img").attr('src', function(i, src) {
    return src.replace('s113', 'w24-h24');
});
$(".avatar-image-container img").attr('src', function(i, src) {
    return src.replace('//img1.blogblog.com/img/blank.gif',
        '//3.bp.blogspot.com/-fgwrcZWeRrU/V26tvNcGtsI/AAAAAAAAAG4/lGwGnQDZsNY7bAPr8hVorZruD-jHHxxOgCLcB/s50/anonyme.png'
    );
});

// Add Date to Popular Posts Sidebar Widget
$('.PopularPosts .widget-content ul li').each(function() {
    var $this = $(this);
    var postlink = $this.find('.item-title a');
    var postURL = postlink.attr('href');
    var postimgURL = $this.find('.item-thumbnail a img').attr('src');
    $.get(postlink.attr('href'), function(data) {
        postlink.parent().after('<div class="item-meta">' + $(
            data).find('.post-meta').html() + '</div>');
    }, "html");
});

// Wrap Elements for Popular Posts Sidebar Widget
$('.popular-posts li').each(function() {
    $(this).find(".item-title, .item-snippet").wrapAll(
        '<div class="item-caption" />');
});

// Advanced Post feeds Script
function opImages(img, size, w, h) {
    return img.replace(size, 'w' + w + '-h' + h + '-c')
}
var noThumb =
    "http://3.bp.blogspot.com/-qnLm52EsvBE/VDkrZ46TWXI/AAAAAAAAAsM/tiJ36WiboU4/s1600/90.jpg",
    text_month = [, "January", "February", "Mars", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
function feedPost(parent, type, label, num) {
    var startIndex = Math.floor((Math.random() * num) + 1),
        furl = "";
    if (label !== undefined) {
        if (label.match('recent posts')) {
            furl = '/feeds/posts/default?alt=json-in-script&max-results=' +
                num;
        }
        if (label.match("random posts")) {
            furl =
                '/feeds/posts/default?alt=json-in-script&orderby=updated&start-index=' +
                startIndex + '&max-results=' + num;
        }
        if (!(label.match('random posts') || label.match('recent posts'))) {
            furl = '/feeds/posts/default/-/' + label +
                '?alt=json-in-script&max-results=' + num;
        }
    }
    if (furl.length) {
        parent.html(
            "<span class='ajax-loader'><div class='uil-squares-css' style='transform:scale(0.2);'><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></span>"
        );
        $.ajax({
            url: furl,
            type: 'get',
            dataType: "jsonp",
            success: function(data) {
                var posturl = "";
                if (type == 'featured-posts') {
                    var htmlcode =
                        '<div class="swiper-wrapper">';
                }
                if (type == 'grid-posts') {
                    var htmlcode =
                        '<div class="swiper-wrapper">';
                }
                if (type == 'trending-posts') {
                    var htmlcode = '<ul class="row">';
                }
                if (type == 'recent-feeds') {
                    var htmlcode = '<ul class="recent-feeds">';
                }
                if (type == 'related-posts') {
                    var htmlcode = '<ul class="row">';
                }
                for (var i = 0; i < data.feed.entry.length; i++) {
                    for (var j = 0; j < data.feed.entry[i].link
                        .length; j++) {
                        if (data.feed.entry[i].link[j].rel ==
                            "alternate") {
                            posturl = data.feed.entry[i].link[j]
                                .href;
                            break;
                        }
                    }
                    var posttitle = data.feed.entry[i].title.$t;
                    if (data.feed.entry[i].category[0].term !==
                        undefined) {
                        var tag = data.feed.entry[i].category[0]
                            .term;
                    }
                    var author = data.feed.entry[i].author[0].name
                        .$t;
                    var get_date = data.feed.entry[i].published
                        .$t,
                        year = get_date.substring(0, 4),
                        month = get_date.substring(5, 7),
                        day = get_date.substring(8, 10),
                        date = text_month[parseInt(month, 10)] +
                        ' ' + day + ', ' + year;
                    var content = data.feed.entry[i].content.$t;
                    var $content = $('<div>').html(content);
                    var sum = $content.text().substr(0, 100);
                    if (content.indexOf("<img") !== -1 ||
                        content.indexOf("youtube.com/embed") !==
                        -1) {

                        if(data.feed.entry[i].media$thumbnail != undefined) {
                            var src = data.feed.entry[i].media$thumbnail.url;
                        }

                    }
                    if (src !== undefined) {
                        if (src.match("default.jpg")) {
                            var $src = src.replace(
                                "/default.jpg",
                                "/hqdefault.jpg");
                        }
                        if (type == 'featured-posts') {
                            if (src.match("s72-c")) {
                                var $src = opImages(src,
                                    "s72-c", 1170, 540);
                            }
                        }
                        if (type == 'grid-posts') {
                            if (src.match("s72-c")) {
                                var $src = opImages(src,
                                    "s72-c", 350, 400);
                            }
                        }
                        if (type == 'trending-posts') {
                            if (src.match("s72")) {
                                var $src = opImages(src, "s72",
                                    270, 180);
                            }
                        }
                        if (type == 'recent-feeds') {
                            if (src.match("s72")) {
                                var $src = opImages(src, "s72",
                                    90, 80);
                            }
                        }
                        if (type == 'related-posts') {
                            if (src.match("s72")) {
                                var $src = opImages(src, "s72",
                                    240, 160);
                            }
                        }
                    }
                    if (content.indexOf("<img") === -1 &&
                        content.indexOf("youtube.com/embed") ===
                        -1) {
                        var $src = noThumb;
                    }
                    var thumb = '<div class="thumb"><a href="' +
                        posturl + '"><img src="' + $src +
                        '" /></a></div>';
                    var blockcode = '';
                    if (type == 'featured-posts') {
                        blockcode +=
                            "<div class='swiper-slide' style='background-image:url(" +
                            $src +
                            ");'><figure class='featured-overlay'><figcaption class='featured-overlay-inner'><aside class='featured-cat'><span class='cat'><a href=" +
                            posturl + ">" + tag +
                            "</a></span></aside><h1 class='featured-title'><a href=" +
                            posturl + ">" + posttitle +
                            "</a></h1><div class='featured-post-meta overlay-meta'><span class='post-author'>By <a href=" +
                            posturl + ">" + author +
                            "</a></span><span class='post-date'>" +
                            date +
                            "</span></div></figcaption></figure></div>";
                    }
                    if (type == 'grid-posts') {
                        blockcode +=
                            "<div class='swiper-slide'><div class='item' style='background-image:url(" +
                            $src +
                            ");'><figure class='item-overlay'><figcaption class='item-overlay-inner'><aside class='item-cat'><span class='cat'><a href=" +
                            posturl + ">" + tag +
                            "</a></span></aside><h4 class='item-title'><a href=" +
                            posturl + ">" + posttitle +
                            "</a></h4><div class='item-post-meta'><span class='post-author'>By <a href=" +
                            posturl + ">" + author +
                            "</a></span><span class='post-date'>" +
                            date +
                            "</span></div></figcaption></figure></div></div>";
                    }
                    if (type == 'trending-posts') {
                        blockcode += "<li class='item col-lg-3 col-md-3 col-sm-3'>" + thumb +
                            "<h5 class='item-title'><a href=" + posturl + ">" + posttitle +
                            "</a></h5><span class='item-date'>" + date + "</span></li>";
                    }
                    if (type == 'recent-feeds') {
                        blockcode +=
                            "<li><div class='feeds-item'>" +
                            thumb +
                            "<div class='feeds-entry'><h4><a href=" +
                            posturl + ">" + posttitle +
                            "</a></h4><span class='feeds-date'>" +
                            date + "</span></div></div></li>";
                    }
                    if (type == 'related-posts') {
                        blockcode +=
                            "<li class='item col-lg-4 col-md-4 col-sm-4'>" +
                            thumb +
                            "<h5 class='item-title'><a href=" +
                            posturl + ">" + posttitle +
                            "</a></h5><span class='item-date'>" +
                            date + "</span></li>";
                    }
                    htmlcode += blockcode;
                }
                if(type == "featured-posts"){
                    htmlcode += '</div><div class="nav-arrows featured-prev"><i class="ify-icon-left-small"/></div><div class="nav-arrows featured-next"><i class="ify-icon-right-small"/></div>';
                } if (type == "grid-posts"){
                    htmlcode += '</div><div class="nav-arrows grid-prev"><i class="ify-icon-left-small"/></div><div class="nav-arrows grid-next"><i class="ify-icon-right-small"/></div>';
                } else {
                    htmlcode += '</ul>';
                }
                parent.html(htmlcode);
                // Main  Featured Posts & Grid Posts Slider
                var swiper = new Swiper(
                    '.featured-posts .featured-slider', {
                        slidesPerView: 1,
                        centeredSlides: false,
                        loop: true,
                        speed: 500,
                        autoplay: 5000,
                        slideActiveClass: 'animated',
                        paginationClickable: false,
                        spaceBetween: 5,
                        effect: 'slide',
                        nextButton: '.featured-next',
                        prevButton: '.featured-prev'
                    }),
                    swiper = new Swiper(
                    '.grid-posts .swiper-container', {
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        loop: true,
                        speed: 500,
                        autoplay: 5000,
                        paginationClickable: false,
                        nextButton: '.grid-next',
                        prevButton: '.grid-prev',
                        spaceBetween: 5,
                        breakpoints: {
                            // when window width is resized
                            480: {
                              slidesPerView: 1
                            },
                            992: {
                              slidesPerView: 2
                            }
                        }
                    }),
                    swiper = new Swiper(
                    '.grid-posts.centred .swiper-container', {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        loop: true,
                        speed: 500,
                        autoplay: 5000,
                        paginationClickable: false,
                        nextButton: '.grid-next',
                        prevButton: '.grid-prev',
                        spaceBetween: 5,
                        breakpoints: {
                            // when window width is resized
                            480: {
                              slidesPerView: 1
                            },
                            992: {
                              slidesPerView: 2
                            }
                        }
                    }),
                    swiper = new Swiper(
                    '.grid-posts.centred-full .swiper-container', {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        loop: true,
                        speed: 500,
                        autoplay: 5000,
                        paginationClickable: false,
                        nextButton: '.grid-next',
                        prevButton: '.grid-prev',
                        spaceBetween: 5,
                        breakpoints: {
                            // when window width is resized
                            480: {
                              slidesPerView: 1
                            },
                            992: {
                              slidesPerView: 2
                            }
                        }
                    });
            }
        });
    }
}

// Sidebar Widgets
$(".sidebar .widget, .footer .widget").each(function(){
  var $this = $(this),
      title = $this.find("h2"),
      wContent = $this.find(".widget-content"),
      wText = wContent.text(),
      sp = wText.split("/");


      // Twitter Widget
        if (wText.match(/\/twitter/g)) {
          var id = sp[1],
              num = sp[0];
          wContent.html('<div id="twidget" class="twitter-widget"></div>');
          var o = {id:id,domId:"twidget",maxTweets:num,enableLinks:!0,showPermalinks:!1,showUser:!1,showInteraction:!1,lang:"en"};
          twitterFetcher.fetch(o)
      }


      // Search Box
        if (wText.match(/searchbox\//g)) {
          var stext = sp[1];
          $this.addClass("search-widget");
          wContent.html('<form class="wsearch" action="/search" method="get"><input type="text" name="s" placeholder="'+ stext +'" class="search-box"/></form>');
        }

      // Dribbble Widget
        if (wText.match(/\/dribbble/g)){
          var f = sp[1],
              h = sp[0];
          $this.addClass("dribbble-widget");
          wContent.html('<div class="dribbble-items"></div>'), $.jribbble.setToken("235cd829e1b5eb5569f8c59df98966aa5c3572e0fff9bab1595e6fbd132fa41f"), $.jribbble.users(f).shots({
              per_page: h
          }).then(function (e) {
              var t = [];
              e.forEach(function (e) {
                  t.push("<li>"), t.push('<a href="' + e.html_url + '" target="_blank">'), t.push('<img src="' + e.images.normal + '"/>'), t.push("</li>");
              }), $(".dribbble-items").html(t.join(""))
          })
        }

      // Flickr Widget
        if (wText.match(/\/flickr/g)) {
          $this.addClass("flickr-widget");
          wContent.html('<div class="flickr-items"></div>');
          wContent.find(".flickr-items").jflickrfeed({
             limit: sp[0],
             qstrings: {
                id: sp[1]
              },
              itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}"/></a></li>'
          });
        }


});

// Activate Ajax Feeds for : Featured Slider
$(".featured-posts .featured-slider").each(function() {
    var $this = $(this),
        sp = $this.text().split("/"),
        num = sp[0],
        label = sp[1];
    feedPost($this, 'featured-posts', label, num);
});

// Activate Ajax Feeds for : Grid Slider
$(".grid-posts .swiper-container").each(function() {
    var $this = $(this),
        sp = $this.text().split("/"),
        num = sp[0],
        label = sp[1];
    feedPost($this, 'grid-posts', label, num);
});

// Activate Ajax Feeds for : Featured Slider
$(".trending-posts .widget-content").each(function() {
    var $this = $(this),
        sp = $this.text().split("/"),
        num = sp[0],
        label = sp[1];
    feedPost($this, 'trending-posts', label, num);
});

// Activate Ajax Feeds for : Sidebar Widgets
$(".sidebar .widget-content").each(function() {
    var $this = $(this),
        sp = $this.text().split("/"),
        num = sp[0],
        label = sp[1];
    feedPost($this, 'recent-feeds', label, num);
});

// Activate Ajax Feeds for : Related Posts
$(".related").each(function() {
    var $this = $(this),
        label = $this.text();
    feedPost($this, 'related-posts', label, 3);
});

// Featured Posts Display Options
if ($("#FeaturedSliderDisplay .widget-content").text().length == 1) {
    $(".featured-area").addClass("");
}
if ($("#FeaturedSliderDisplay .widget-content").text().length > 1) {
    if ($("#FeaturedSliderDisplay .widget-content").text().match("No")) {
        $(".featured-area").addClass("hidden");
    }
}

// Featured Posts Style Options
if ($("#FeaturedSliderStyle .widget-content").text().length == 1) {
    $(".featured-slider").addClass("container");
}
if ($("#FeaturedSliderStyle .widget-content").text().length > 1) {
    if ($("#FeaturedSliderStyle .widget-content").text().match("Boxedwidth")) {
        $(".featured-slider").addClass("container");
    }
    if ($("#FeaturedSliderStyle .widget-content").text().match("Fullwidth")) {
        $(".featured-slider").addClass("container-fluid");
    }
    if ($("#FeaturedSliderStyle .widget-content").text().match("Centred")) {
        $(".featured-slider").addClass("container");
        $(".featured-posts").addClass("centred");
    }
    if ($("#FeaturedSliderStyle .widget-content").text().match("caption2")) {
        $(".featured-posts").addClass("caption2");
    }
}

// Grid Slider Display Options
if ($("#GridSliderDisplay .widget-content").text().length == 1) {
    $(".grid-area").addClass("");
}
if ($("#GridSliderDisplay .widget-content").text().length > 1) {
    if ($("#GridSliderDisplay .widget-content").text().match("No")) {
        $(".grid-area").addClass("hidden");
    }
}

// Grid Slider Style Options
if ($("#GridSliderStyle .widget-content").text().length == 1) {
    $(".grid-posts").addClass("centred");
}
if ($("#GridSliderStyle .widget-content").text().length > 1) {
    if ($("#GridSliderStyle .widget-content").text().match("style1")) {
        $(".grid-posts").addClass("centred");
    }
    if ($("#GridSliderStyle .widget-content").text().match("style2")) {
        $(".grid-posts").addClass("centred-full");
    }
    if ($("#GridSliderStyle .widget-content").text().match("style3")) {
        $(".grid-posts").addClass("col-2");
    }
    if ($("#GridSliderStyle .widget-content").text().match("style4")) {
        $(".grid-posts").addClass("col-3");
    }
    if ($("#GridSliderStyle .widget-content").text().match("style5")) {
        $(".grid-posts").addClass("col-4");
    }
    if ($("#GridSliderStyle .widget-content").text().match("caption2")) {
        $(".grid-posts").addClass("style2");
    }
}


// Trending Posts Options
if ($("#TrendingPostsDisplay .widget-content").text().length == 1) {
    $(".trending-posts").addClass("");
}
if ($("#TrendingPostsDisplay .widget-content").text().length > 1) {
    if ($("#TrendingPostsDisplay .widget-content").text().match("No")) {
        $(".trending-posts").addClass("hidden");
    }
}

// Theme Layout Options
if ($("#ThemeLayout .widget-content").text().length == 1) {
    $(".main-wrap").addClass("has-right-sidebar");
}
if ($("#ThemeLayout .widget-content").text().length > 1) {
    if ($("#ThemeLayout .widget-content").text().match("Rightsidebar")) {
        $(".main-wrap").addClass("has-right-sidebar");
    }
    if ($("#ThemeLayout .widget-content").text().match("Leftsidebar")) {
        $(".main-wrap").addClass("has-left-sidebar");
    }
    if ($("#ThemeLayout .widget-content").text().match("Fullwidth")) {
        $(".main-wrap").addClass("has-no-sidebar");
    }
}

// Boxed or Wide or Framed Style Options
if ($("#BoxedWideFramed .widget-content").text().length == 1) {
    $("body").addClass("");
}
if ($("#BoxedWideFramed .widget-content").text().length > 1) {
    if ($("#BoxedWideFramed .widget-content").text().match("Boxed")) {
        $("body").addClass("boxed");
    }
    if ($("#BoxedWideFramed .widget-content").text().match("Framed")) {
        $("body").addClass("framed");
    }
}

// Display Instagram Footer
if ($("#InstagramFooterDisplay .widget-content").text().length == 1) {
    $(".instagram-widget").addClass("");
}
if ($("#InstagramFooterDisplay .widget-content").text().length > 1) {
    if ($("#InstagramFooterDisplay .widget-content").text().match("No")) {
        $(".instagram-widget").addClass("");
    }
    if ($("#InstagramFooterDisplay .widget-content").text().match("Yes")) {
        $(".instagram-widget").addClass("hidden");
    }
}

// Dark or Light Version Options
if ($("#DarkLightStyle .widget-content").text().length == 1) {
    $("body").addClass("");
}
if ($("#DarkLightStyle .widget-content").text().length > 1) {
    if ($("#DarkLightStyle .widget-content").text().match("Light")) {
        $("body").addClass("");
    }
    if ($("#DarkLightStyle .widget-content").text().match("Dark")) {
        $("body").addClass("dark");
    }
}

// Display Related Posts on Homepage
if ($("#RelatedPosts .widget-content").text().length == 1) {
    $(".post-related.home").addClass("");
}
if ($("#RelatedPosts .widget-content").text().length > 1) {
    if ($("#RelatedPosts .widget-content").text().match("Yes")) {
        $(".post-related.home").addClass("");
    }
    if ($("#RelatedPosts .widget-content").text().match("No")) {
        $(".post-related.home").addClass("hidden");
    }
}

// Display Author Bio on Posts
if ($("#AuthorBioDisplay .widget-content").text().length == 1) {
    $(".single .post-author").addClass("");
}
if ($("#AuthorBioDisplay .widget-content").text().length > 1) {
    if ($("#AuthorBioDisplay .widget-content").text().match("Yes")) {
        $(".single .post-author").addClass("");
    }
    if ($("#AuthorBioDisplay .widget-content").text().match("No")) {
        $(".single .post-author").addClass("hidden");
    }
}

// Mins to Read /
$('.post').each(function() {

        $(this).readingTime({
            readingTimeTarget: $(this).find('.eta'),
            wordCountTarget: $(this).find('.words'),
            remotePath: $(this).attr('data-file'),
            remoteTarget: $(this).attr('data-target')
        });

    });


// Advanced Post Pagination
(function(e) {
    var t = e("a.newer-link");
    var n = e("a.older-link");
    e.get(t.attr("href"), function(n) {
        t.html(
            '<span class="psub">Next Article</span> <span class="title">' +
            e(n).find(".post .post-title").text() + "</span>");
    }, "html");
    e.get(n.attr("href"), function(t) {
        n.html(
            '<span class="psub">Previous Article</span> <span class="title">' +
            e(t).find(".post .post-title").text() + "</span>");
    }, "html");
})(jQuery);

// Post Layouts
$(".post .single").each(function() {
    var $this = $(this),
        content = $this.find("*"),
        noSidebar = "[no-sidebar]",
        rightSidebar = "[right-sidebar]",
        leftSidebar = "[left-sidebar]";
    content.replaceText(noSidebar,
        "<style>#main {width: 100%;padding-right: 0;}#sidebar {display:none;}</style>"
    );
    content.replaceText(rightSidebar,
        "<style>#main {float: left !important;}#sidebar {float:right;padding-left: 30px !important;padding-right:15px !important;}</style>"
    );
    content.replaceText(leftSidebar,
        "<style>#main {float: right !important;}#sidebar {float:left;padding-right: 30px !important;padding-left:15px !important;}</style>"
    );
});

// Contact Page
$(".post .single").each(function() {
    var $this = $(this),
        content = $this.find("*"),
        contactForm = "[contact-form]";
        content.replaceText(contactForm,
            '<div class="contact-form"><form name="contact-form"><p class="contact-form-name"><label for="name">Your Name <span class="required">(required*)</span></label><input class="contact-form-name" id="ContactForm1_contact-form-name" name="name" size="30" value="" type="text" /></p><p class="contact-form-email"><label for="email">Your Adresse Email <span class="required">(required*)</span></label><input class="contact-form-email" id="ContactForm1_contact-form-email" name="email" size="30" value="" type="text" /></p><p class="contact-form-message"><label for="message">Your Message <span class="required">(required*)</span></label><textarea class="contact-form-email-message"  id="ContactForm1_contact-form-email-message" name="email-message" cols="25" rows="5"></textarea></p><p class="contact-form-submit"><input class="contact-form-button contact-form-button-submit" id="ContactForm1_contact-form-submit" value="Send Message" type="button" /></p><div class="contact-notifications"><p class="contact-form-error-message" id="ContactForm1_contact-form-error-message"></p><p class="contact-form-success-message" id="ContactForm1_contact-form-success-message"></p></div></form></div>'
        );
});

// Advanced About Author
if ($("#about-author").text().length != 0) {
    $("#about-author .widget").each(function() {
        var $this = $(this),
            content = $this.find(".widget-content").text(),
            user = $this.find("h2").text().toLowerCase(),
            name = content.split(/\[name=(.*)\]/gi)[1],
            description = content.split(/\[description=(.*)\]/gi)[1],
            img = content.split(/\[img=(.*)\]/gi)[1],
            social = content.split(/\((.*)\)/gi);
        social.shift();
        var social = social.join(),
            social = social.replace(/\r?\n|\r/g, ""),
            social = social.split(","),
            social = social.filter(Boolean);
        if ($(".post .single .data-author").attr("data-author") != undefined) {
            $(".post-author").html("<div class='author-img'><img with='100' src='" + img + "' alt='" + name + "' title='" + name + "' /></div><div class='author-content'><span rel='author' title='Posts by " + name + "'>" + name + "</span><p>" + description + "</p><div class='author-social'></div></div>");
            for (var i = 0; i < social.length; i++) {
                var scl = social[i].split("=")[0],
                    scn = social[i].split("=")[1],
                    socialLink = "<a class='" + scl + "' href='" + scn + "'></a>";
                $(".author-social").append(socialLink);
            }
        }
    });
}

// Do Translation
$(".FollowByEmail input.follow-by-email-address").attr("placeholder", newsletterEmail);
$(".FollowByEmail input.follow-by-email-submit").attr("value", newsletterSubmit);
$(".search .search-box").attr("placeholder", search);
$(".contact-form-name label").text(contactNameText);
$(".contact-form-email label").text(contactEmailText);
$(".contact-form-message label").text(contactMessageText);
$(".footer .item-left p span").text(copyrights);
$(".post-share > span").text(share);
$(".post-comments span").text(comments);
$(".post .post-related span").text(related);
$(".post-pagination .next .psub").text(navNext);
$(".post-pagination .next .stitle").text(navNextMsg);
$(".post-pagination .prev .psub").text(navPrev);
$(".post-pagination .prev .stitle").text(navPrevMsg);
$(".page-404 p .msg1").text(errorMsg1);
$(".page-404 p .msg2").text(errorMsg2);
$(".page-404 .orgo span").text(errorText);
$(".page-404 .gohome").text(errorLink);