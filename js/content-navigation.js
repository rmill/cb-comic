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
    this.comic = options.comic;
    this.chapter = 0;
    this.page = 0;

    var self = this;

    this.firstPageEl.click(function(){self.goToFirstPage()});
    this.previousPageEl.click(function(){self.goToPreviousPage()});
    this.nextPageEl.click(function(){self.goToNextPage()});
    this.imgEl.click(function(){self.goToNextPage()});
    this.lastPageEl.click(function(){self.goToLastPage()});
    this.chapterSelectEl.change(function(){self.goToChapter(jQuery(this).val())});

    jQuery('body').keydown(function(e) {
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
    jQuery.each(this.comic.chapters, function(key, chapter) {
      self.chapterSelectEl.append(jQuery("<option></option>")
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
  },

  setHash: function (chapterNumber, pageNumber) {
    document.location.hash = chapterNumber + '-' + pageNumber;
  },

  goToFirstPage: function () {
    var firstChapter = 0;
    var firstPage = 0;

    this.showPage(firstChapter, firstPage);
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
    }

    this.showPage(chapterNumber, pageNumber);
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

      pageNumber = 0;
    }

    this.showPage(chapterNumber, pageNumber);
  },

  goToLastPage: function () {
    var lastChapter = this.comic.chapters[this.comic.chapters.length - 1];
    var lastPage = lastChapter.pages.length - 1;

    this.showPage(lastChapter.number, lastPage);
  },

  goToChapter: function(chapter) {
      // Keep the chapter selects in sync
      this.chapterSelectEl.val(chapter);
      this.showPage(chapter, 0);
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
  }
}

function isInt(n) {
   return n % 1 === 0;
}

window.onload = function () {
  var comic = null;

  jQuery.ajax({
    url: '/wp-content/themes/cb-comics/upload.php',
    success: function(response) {
      comic = JSON.parse(response);

      contentNavigation.initialize({
        firstPageEl: jQuery('.content-navigation .first'),
        previousPageEl: jQuery('.content-navigation .previous'),
        nextPageEl: jQuery('.content-navigation .next'),
        lastPageEl: jQuery('.content-navigation .last'),
        imgEl: jQuery('.comic-page img'),
        chapterSelectEl: jQuery('.content-navigation .chapter-select'),
        comic: comic
      });
    }
  });
}
