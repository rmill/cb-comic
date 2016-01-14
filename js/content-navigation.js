var contentNavigation = {
  firstPageEl: null,
  previousPageEl: null,
  nextPageEl: null,
  lastPageEl: null,
  imgEl: null,
  chapterSelectEl: null,

  chapters: [0, 20],

  initialize: function(options) {
    this.firstPageEl = options.firstPageEl;
    this.previousPageEl = options.previousPageEl;
    this.nextPageEl = options.nextPageEl;
    this.lastPageEl = options.lastPageEl;
    this.imgEl = options.imgEl;
    this.chapterSelectEl = options.chapterSelectEl;

    this.page = 0;
    this.lastPage = 45;
    this.startingPage = 20;

    var self = this;

    this.firstPageEl.click(function()  {
      self.showPage(0);
    });

    this.previousPageEl.click(function()  {
      self.showPage(self.page - 1);
    });

    this.nextPageEl.click(function()  {
      self.showPage(self.page + 1);
    });

    this.lastPageEl.click(function()  {
      self.showPage(self.lastPage);
    });

    this.chapterSelectEl.change(function()  {
      // Keep the chapter selects in sync
      self.chapterSelectEl.val($(this).val());
      self.showPage($(this).val());
    });

    $('body').keydown(function(e) {
       switch(e.which) {
        case 37: self.showPage(self.page - 1); // left
        break;

        case 39: self.showPage(self.page + 1); // right
        break;

        default: return; // exit this handler for other keys
      }
      
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    this.imgEl.click(function () {
       self.showPage(self.page + 1);
    });

    var page = document.location.hash;
    page = page.replace('#page-', '');

    if (page == '' || !isInt(page)) {
      page = this.startingPage;
    }

    this.showPage(page, false);
  },

  showPage: function(pageNumber, updateHash) {
    // Convert from string
    pageNumber = Number(pageNumber);

    if (pageNumber < 0) {
      this.page = 0;
      return;
    }

    if (pageNumber > this.lastPage) {
      this.page = this.lastPage;
      return;
    }

    this.page = pageNumber;
    this.imgEl.attr('src', 'http://cb-comic.com/wp-content/uploads/2015/12/' + pageNumber + '.png');

    // Update the hash
    var updateHash = (updateHash === undefined ? true : updateHash);
    if(updateHash) {
      document.location.hash = 'page-' + this.page;
    }

    // Update the chapter selects
    for(var i = 0; i <= this.chapters.length; i++) {
      if (this.chapters[i] == undefined || this.chapters[i] > pageNumber) {
        this.chapterSelectEl.val(this.chapters[i - 1]);
        break;
      }
    }
  }
}

function isInt(n) {
   return n % 1 === 0;
}

window.onload = function () {  
  contentNavigation.initialize({
    firstPageEl: $('.content-navigation .first'),
    previousPageEl: $('.content-navigation .previous'),
    nextPageEl: $('.content-navigation .next'),
    lastPageEl: $('.content-navigation .last'),
    imgEl: $('.comic-page img'),
    chapterSelectEl: $('.content-navigation .chapter-select')
  });
}
