var contentNavigation = {
  firstPageEl: null,
  previousPageEl: null,
  nextPageEl: null,
  lastPageEl: null,
  imgEl: null,
  chapterSelectEl: null,
  comic: null,

  initialize: function(options) {
    this.firstPageEl = options.firstPageEl;
    this.previousPageEl = options.previousPageEl;
    this.nextPageEl = options.nextPageEl;
    this.lastPageEl = options.lastPageEl;
    this.imgEl = options.imgEl;
    this.chapterSelectEl = options.chapterSelectEl;
    this.songEl = options.songEl;
    this.comic = options.comic;
    this.chapter = 0;
    this.page = 0;
    this.song = 0;

    var self = this;

    this.firstPageEl.click(function(){self.goToFirstPage()});
    this.previousPageEl.click(function(){self.goToPreviousPage()});
    this.nextPageEl.click(function(){self.goToNextPage()});
    this.imgEl.click(function(){self.goToNextPage()});
    this.lastPageEl.click(function(){self.goToLastPage()});
    this.chapterSelectEl.change(function(){self.goToChapter($(this).val(), 0)});
    this.songEl.on('ended', function(){self.playNextSong()});

    $('body').keydown(function(e) {
       switch(e.which) {
        case 37: self.goToPreviousPage(); // left
        break;

        case 39: self.goToNextPage(); // right
        break;

        default: return; // exit this handler for other keys
      }

      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    // Initialize the chapter select
    $.each(this.comic.chapters, function(key, chapter) {
      self.chapterSelectEl.append($("<option></option>")
                          .attr("value", chapter.number)
                          .text(chapter.name));
    });

    this.processHash();
  },

  /**
   * #0-1
   */
  processHash: function() {
    // Get the chapter
    var hash = document.location.hash.replace('#', '');
    var hashValues = hash.split('-');

    var chapter = Number(hashValues[0]);
    var page = Number(hashValues[1]);

    if (!this.comic.chapters[chapter] || !this.comic.chapters[chapter].pages[page]) {
      // Default is the second page of the last chapter
      chapter = this.comic.chapters[this.comic.chapters.length - 1].number;
      page = (this.comic.chapters[chapter].pages[1]) ? 1 : 0;
    }

    this.showPage(chapter, page, false);
    this.playSong(this.comic.chapters[chapter].songs[0]);
  },

  setHash: function (chapterNumber, pageNumber) {
    document.location.hash = chapterNumber + '-' + pageNumber;
  },

  goToFirstPage: function () {
    this.goToChapter(0, 0);
  },

  goToPreviousPage: function() {
    var pageNumber = this.page - 1;
    var chapterNumber = this.chapter;

    if (pageNumber < 0) {
      chapterNumber--;
      var chapter = this.comic.chapters[chapterNumber];

      if (!chapter) {
        return;
      }

      pageNumber = chapter.pages.length - 1;
      this.goToChapter(chapterNumber, pageNumber);
    } else {
      this.showPage(chapterNumber, pageNumber);
    }
  },

  goToNextPage: function () {
    var pageNumber = this.page + 1;
    var chapterNumber = this.chapter;
    var chapter = this.comic.chapters[chapterNumber];

    if (pageNumber > chapter.pages.length - 1) {
      chapterNumber++;
      chapter = this.comic.chapters[chapterNumber];

      if (!chapter) {
        return;
      }

      this.goToChapter(chapterNumber, 0);
    } else {
      this.showPage(chapterNumber, pageNumber);
    }
  },

  goToLastPage: function () {
    var lastChapter = this.comic.chapters[this.comic.chapters.length - 1];
    var lastPage = lastChapter.pages.length - 1;

    this.goToChapter(lastChapter.number, lastPage);
  },

  goToChapter: function(chapter, page = 0) {
      // Keep the chapter selects in sync
      var originalChapter = this.chapter;

      this.chapter = chapter;
      this.chapterSelectEl.val(chapter);
      this.showPage(chapter, page);

      if (originalChapter !== chapter) {
        this.playSong(this.comic.chapters[chapter].songs[0]);
      }
  },

  showPage: function(chapterNumber, pageNumber, updateHash) {
    if (this.chapter != chapterNumber) {
      this.chapterSelectEl.val(chapterNumber);
    }

    this.page = pageNumber;
    this.chapter = chapterNumber;
    this.imgEl.attr('src', this.comic.chapters[chapterNumber].pages[pageNumber].file_path);

    // Update the hash
    var updateHash = (updateHash === undefined ? true : updateHash);
    if(updateHash) {
      this.setHash(this.chapter, this.page);
    }
  },

  playSong: function(song) {
    if(!song) {
      return;
    }

    this.songEl.attr('src', song.filename);
    this.songEl.get(0).load();
    this.songEl.get(0).play();
  },

  playNextSong: function() {
    this.song++;
    if (this.song > this.comic.chapters[this.chapter].songs.length) {
      this.song = 0;
    }

    this.playSong(this.comic.chapters[this.chapter].songs[this.song]);
  }
}

function isInt(n) {
   return n % 1 === 0;
}

window.onload = function () {
  var comic = null;

  $.ajax({
    url: '/api/',
    cache: false,
    success: function(response) {
      comic = JSON.parse(response);

      contentNavigation.initialize({
        firstPageEl: $('.content-navigation .first'),
        previousPageEl: $('.content-navigation .previous'),
        nextPageEl: $('.content-navigation .next'),
        lastPageEl: $('.content-navigation .last'),
        imgEl: $('.comic-page img'),
        chapterSelectEl: $('.content-navigation .chapter-select'),
        comic: comic,
        songEl: $('#soundtrack')
      });
    }
  });
}
