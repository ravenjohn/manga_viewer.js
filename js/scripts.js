/*jslint browser:true */
(function () {
    'use strict';

    /*jslint nomen: true*/
    var R = Function.prototype,
        $ = window.$,
        u = window._;
    /*jslint nomen: false*/

    R.opts = {
        live : false,
        manga_id : null,
        manga_name : null,
        chapter : null
    };

    R.chapters = [];

    R.empty = function (a) {
        return undefined === a || a === null || a === "" || a === "0" || a === 0 || (("object" === typeof a || "array" === typeof a) && a.length === 0);
    };

    R.setOptions = function () {
        var options = window.location.hash.split("/");
        if (options.length > 1) {
            R.opts.manga_name = options[1];
            if (options.length > 2) {
                if (!R.empty(options[2]) || options[2] === "0") {
                    R.opts.chapter = options[2];
                }
            }
        }
    };

    R.loadTemplates = function () {
        if (R.empty($('#templates'))) {
            $.get("templates/templates.html", function (data) {
                $('body').append('<div id="#templates">' + data + "</div>");
            });
        }
    };


    R.request = function (url, callback, add) {
        $.getJSON("proxy.php?url=" + encodeURIComponent(url),
            function (data) {
                if (undefined === add) {
                    callback(data);
                } else {
                    callback(data, add);
                }
            }
            );
    };

    R.loadMangaList = function (callback) {
        function save(data) {
            data = data.manga;
            R.mangaList = data;
            callback();
        }
        if (R.empty(R.mangaList)) {
            if (R.opts.live) {
                R.request("http://www.mangaeden.com/api/list/0/", save);
            } else {
                $.getJSON("temp/manga.json", save);
            }
        } else {
            callback();
        }
    };


    R.bindMangaListLinks = function () {
        $('#manga-thumbnails a.flag').click(function (event) {
            window.location.hash = event.currentTarget.hash;
            R.opts.manga_id = $(event.currentTarget).attr('id');
            R.setOptions();
            R.showMangaChapters();
            event.preventDefault();
        }).removeClass('flag');
    };


    R.showMangaList = function () {
        var i, j = R.mangaList.length, post;
        $('#manga-images, #manga-chapters').fadeOut();
        for (i = 0; i < j; i += 1) {
            post = u.template($('#thumbnails-template').html(), R.mangaList[i]);
            $('#manga-thumbnails').append(post);
        }
        $('#manga-thumbnails').fadeIn();
        R.bindMangaListLinks();
    };


    R.showMangaChapters = function () {
        function showChapters(data) {
            var post;
            R.chapters = data.chapters;
            $('#manga-images, #manga-thumbnails').fadeOut();
            if (R.empty(R.opts.chapter) && R.opts.chapter !== "0") {
                post = u.template($('#chapters-template').html(), data);
                $('#manga-chapters').html(post).fadeIn();
                $('#manga-chapters a').click(function (event) {
                    window.location.hash = event.currentTarget.hash;
                    R.setOptions();
                    R.showMangaImages();
                    event.preventDefault();
                });
            } else {
                R.showMangaImages();
            }
        }
        R.request("http://www.mangaeden.com/api/manga/" + R.opts.manga_id, showChapters);
    };


    R.showMangaImages = function () {
        var i, j, synchronizedImageLoading = Function.prototype;

        function showImages(data, i) {
            function sortImages(images) {
                var i, j = images.length, buff = [];
                for (i = 0; i < j; i += 1) {
                    buff.push([images[i][1], images[i][0]]);
                }
                buff.sort(function (a, b) {return a[1] - b[1]; });
                return buff;
            }
            data.images = sortImages(data.images);
            var post;
            post = u.template($('#images-template').html(), data);
            $('#manga-images').append(post);
            setTimeout(function () {
                synchronizedImageLoading(i - 1);
            }, data.images.length * 500);  //[number of images on chapter]*5 seconds before loading the next chapter
        }

        synchronizedImageLoading = function (i) {
            if (i === -1) {
                return;
            }
            $('#manga-images').append("<div class='clearfix'></div><h3>Chapter " +  R.chapters[i][0] + ' - ' +  R.chapters[i][2] + "</h3>");
            R.request("http://www.mangaeden.com/api/chapter/" + R.chapters[i][3], showImages, i);
        };

        $('#manga-chapters, #manga-thumbnails').fadeOut();
        $('#manga-images').html('').fadeIn();
        for (i = 0, j = R.chapters.length; i < j; i += 1) {
            if (parseFloat(R.chapters[i][0], 10) === parseFloat(R.opts.chapter, 10)) {
                synchronizedImageLoading(i);
                break;
            }
        }
    };


    R.findManga = function (key) {
        var i, j = R.mangaList.length, post;
        for (i = 0; i < j; i += 1) {
            if (R.mangaList[i].a === key && !R.empty(R.opts.manga_name)) {
                R.opts.manga_id = R.mangaList[i].i;
                R.showMangaChapters();
                i = j;
            } else if (R.mangaList[i].t.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                window.location.hash = "";
                R.opts.manga_id = R.opts.manga_name = R.opts.chapter = null;
                R.opts.chapters = [];
                post = u.template($('#thumbnails-template').html(), R.mangaList[i]);
                $('#manga-thumbnails').append(post);
            }
        }
    };


    R.bindSearch = function () {
        $('#search-input').keyup(function () {
            var key = $('#search-input').val();
            if (!R.empty(key) && key.length > 1) {
                $('#manga-images, #manga-chapters').fadeOut();
                $('#manga-thumbnails').html('').fadeIn();
                R.findManga(key);
                R.bindMangaListLinks();
            }
        });
    };

    R.start = function () {
        R.setOptions();
        if (!R.empty(R.opts.manga_name)) {
            R.findManga(R.opts.manga_name);
        }
    };


    R.loadTemplates();
    R.bindSearch();
    R.loadMangaList(function () {
        R.start();
    });

}());
