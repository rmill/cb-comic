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
    this.chapterSelectEl.change(function(){self.goToChapter(jQuery(this).val(), 0)});
    this.songEl.on('ended', function(){self.playNextSong()});

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
    this.playSong(this.comic.chapters[chapter].songs[0].filename);
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
        this.playSong(this.comic.chapters[chapter].songs[0].filename);
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

  playSong(filePath) {
    this.songEl.attr('src', filePath);
    this.songEl.get(0).load();
    this.songEl.get(0).play();
  },

  playNextSong() {
    this.song++;
    if (this.song > this.comic.chapters[chapter].songs.length) {
      this.song = 0;
    }

    this.playSong(this.comic[chapter].songs[this.song.filepath]);
  }
}

function isInt(n) {
   return n % 1 === 0;
}

window.onload = function () {
  var comic = null;

  comic = {
  "chapters": [
    {
      "id": "0",
      "number": "0",
      "name": "Prologue",
      "pages": [
        {
          "id": "1",
          "name": "Prologue Page 0",
          "number": "0",
          "chapter_id": "0",
          "file_name": "CH0P0.png",
          "file_path": "/wp-content/uploads/live/CH0P0.png"
        },
        {
          "id": "2",
          "name": "Prologue Page 1",
          "number": "1",
          "chapter_id": "0",
          "file_name": "CH0P1.png",
          "file_path": "/wp-content/uploads/live/CH0P1.png"
        },
        {
          "id": "3",
          "name": "Prologue Page 2",
          "number": "2",
          "chapter_id": "0",
          "file_name": "CH0P2.png",
          "file_path": "/wp-content/uploads/live/CH0P2.png"
        },
        {
          "id": "4",
          "name": "Prologue Page 3",
          "number": "3",
          "chapter_id": "0",
          "file_name": "CH0P3.png",
          "file_path": "/wp-content/uploads/live/CH0P3.png"
        },
        {
          "id": "5",
          "name": "Prologue Page 4",
          "number": "4",
          "chapter_id": "0",
          "file_name": "CH0P4.png",
          "file_path": "/wp-content/uploads/live/CH0P4.png"
        },
        {
          "id": "6",
          "name": "Prologue Page 5",
          "number": "5",
          "chapter_id": "0",
          "file_name": "CH0P5.png",
          "file_path": "/wp-content/uploads/live/CH0P5.png"
        },
        {
          "id": "7",
          "name": "Prologue Page 6",
          "number": "6",
          "chapter_id": "0",
          "file_name": "CH0P6.png",
          "file_path": "/wp-content/uploads/live/CH0P6.png"
        },
        {
          "id": "8",
          "name": "Prologue Page 7",
          "number": "7",
          "chapter_id": "0",
          "file_name": "CH0P7.png",
          "file_path": "/wp-content/uploads/live/CH0P7.png"
        },
        {
          "id": "9",
          "name": "Prologue Page 8",
          "number": "8",
          "chapter_id": "0",
          "file_name": "CH0P8.png",
          "file_path": "/wp-content/uploads/live/CH0P8.png"
        },
        {
          "id": "10",
          "name": "Prologue Page 9",
          "number": "9",
          "chapter_id": "0",
          "file_name": "CH0P9.png",
          "file_path": "/wp-content/uploads/live/CH0P9.png"
        },
        {
          "id": "11",
          "name": "Prologue Page 10",
          "number": "10",
          "chapter_id": "0",
          "file_name": "CH0P10.png",
          "file_path": "/wp-content/uploads/live/CH0P10.png"
        },
        {
          "id": "12",
          "name": "Prologue Page 11",
          "number": "11",
          "chapter_id": "0",
          "file_name": "CH0P11.png",
          "file_path": "/wp-content/uploads/live/CH0P11.png"
        },
        {
          "id": "13",
          "name": "Prologue Page 12",
          "number": "12",
          "chapter_id": "0",
          "file_name": "CH0P12.png",
          "file_path": "/wp-content/uploads/live/CH0P12.png"
        },
        {
          "id": "14",
          "name": "Prologue Page 13",
          "number": "13",
          "chapter_id": "0",
          "file_name": "CH0P13.png",
          "file_path": "/wp-content/uploads/live/CH0P13.png"
        },
        {
          "id": "15",
          "name": "Prologue Page 14",
          "number": "14",
          "chapter_id": "0",
          "file_name": "CH0P14.png",
          "file_path": "/wp-content/uploads/live/CH0P14.png"
        },
        {
          "id": "16",
          "name": "Prologue Page 15",
          "number": "15",
          "chapter_id": "0",
          "file_name": "CH0P15.png",
          "file_path": "/wp-content/uploads/live/CH0P15.png"
        },
        {
          "id": "17",
          "name": "Prologue Page 16",
          "number": "16",
          "chapter_id": "0",
          "file_name": "CH0P16.png",
          "file_path": "/wp-content/uploads/live/CH0P16.png"
        },
        {
          "id": "18",
          "name": "Prologue Page 17",
          "number": "17",
          "chapter_id": "0",
          "file_name": "CH0P17.png",
          "file_path": "/wp-content/uploads/live/CH0P17.png"
        },
        {
          "id": "19",
          "name": "Prologue Page 18",
          "number": "18",
          "chapter_id": "0",
          "file_name": "CH0P18.png",
          "file_path": "/wp-content/uploads/live/CH0P18.png"
        },
        {
          "id": "20",
          "name": "Prologue Page 19",
          "number": "19",
          "chapter_id": "0",
          "file_name": "CH0P19.png",
          "file_path": "/wp-content/uploads/live/CH0P19.png"
        }
      ]
    },
    {
      "id": "1",
      "number": "1",
      "name": "Chapter 1",
      "pages": [
        {
          "id": "62",
          "name": "Chapter 1 Page 0",
          "number": "0",
          "chapter_id": "1",
          "file_name": "CH1P0.png",
          "file_path": "/wp-content/uploads/live/CH1P0.png"
        },
        {
          "id": "63",
          "name": "Chapter 1 Page 1",
          "number": "1",
          "chapter_id": "1",
          "file_name": "CH1P1.png",
          "file_path": "/wp-content/uploads/live/CH1P1.png"
        },
        {
          "id": "64",
          "name": "Chapter 1 Page 2",
          "number": "2",
          "chapter_id": "1",
          "file_name": "CH1P2.png",
          "file_path": "/wp-content/uploads/live/CH1P2.png"
        },
        {
          "id": "65",
          "name": "Chapter 1 Page 3",
          "number": "3",
          "chapter_id": "1",
          "file_name": "CH1P3.png",
          "file_path": "/wp-content/uploads/live/CH1P3.png"
        },
        {
          "id": "66",
          "name": "Chapter 1 Page 4",
          "number": "4",
          "chapter_id": "1",
          "file_name": "CH1P4.png",
          "file_path": "/wp-content/uploads/live/CH1P4.png"
        },
        {
          "id": "67",
          "name": "Chapter 1 Page 5",
          "number": "5",
          "chapter_id": "1",
          "file_name": "CH1P5.png",
          "file_path": "/wp-content/uploads/live/CH1P5.png"
        },
        {
          "id": "68",
          "name": "Chapter 1 Page 6",
          "number": "6",
          "chapter_id": "1",
          "file_name": "CH1P6.png",
          "file_path": "/wp-content/uploads/live/CH1P6.png"
        },
        {
          "id": "69",
          "name": "Chapter 1 Page 7",
          "number": "7",
          "chapter_id": "1",
          "file_name": "CH1P7.png",
          "file_path": "/wp-content/uploads/live/CH1P7.png"
        },
        {
          "id": "70",
          "name": "Chapter 1 Page 8",
          "number": "8",
          "chapter_id": "1",
          "file_name": "CH1P8.png",
          "file_path": "/wp-content/uploads/live/CH1P8.png"
        },
        {
          "id": "71",
          "name": "Chapter 1 Page 9",
          "number": "9",
          "chapter_id": "1",
          "file_name": "CH1P9.png",
          "file_path": "/wp-content/uploads/live/CH1P9.png"
        },
        {
          "id": "72",
          "name": "Chapter 1 Page 10",
          "number": "10",
          "chapter_id": "1",
          "file_name": "CH1P10.png",
          "file_path": "/wp-content/uploads/live/CH1P10.png"
        },
        {
          "id": "73",
          "name": "Chapter 1 Page 11",
          "number": "11",
          "chapter_id": "1",
          "file_name": "CH1P11.png",
          "file_path": "/wp-content/uploads/live/CH1P11.png"
        },
        {
          "id": "74",
          "name": "Chapter 1 Page 12",
          "number": "12",
          "chapter_id": "1",
          "file_name": "CH1P12.png",
          "file_path": "/wp-content/uploads/live/CH1P12.png"
        },
        {
          "id": "75",
          "name": "Chapter 1 Page 13",
          "number": "13",
          "chapter_id": "1",
          "file_name": "CH1P13.png",
          "file_path": "/wp-content/uploads/live/CH1P13.png"
        },
        {
          "id": "76",
          "name": "Chapter 1 Page 14",
          "number": "14",
          "chapter_id": "1",
          "file_name": "CH1P14.png",
          "file_path": "/wp-content/uploads/live/CH1P14.png"
        },
        {
          "id": "77",
          "name": "Chapter 1 Page 15",
          "number": "15",
          "chapter_id": "1",
          "file_name": "CH1P15.png",
          "file_path": "/wp-content/uploads/live/CH1P15.png"
        },
        {
          "id": "78",
          "name": "Chapter 1 Page 16",
          "number": "16",
          "chapter_id": "1",
          "file_name": "CH1P16.png",
          "file_path": "/wp-content/uploads/live/CH1P16.png"
        },
        {
          "id": "79",
          "name": "Chapter 1 Page 17",
          "number": "17",
          "chapter_id": "1",
          "file_name": "CH1P17.png",
          "file_path": "/wp-content/uploads/live/CH1P17.png"
        },
        {
          "id": "80",
          "name": "Chapter 1 Page 18",
          "number": "18",
          "chapter_id": "1",
          "file_name": "CH1P18.png",
          "file_path": "/wp-content/uploads/live/CH1P18.png"
        },
        {
          "id": "81",
          "name": "Chapter 1 Page 19",
          "number": "19",
          "chapter_id": "1",
          "file_name": "CH1P19.png",
          "file_path": "/wp-content/uploads/live/CH1P19.png"
        },
        {
          "id": "82",
          "name": "Chapter 1 Page 20",
          "number": "20",
          "chapter_id": "1",
          "file_name": "CH1P20.png",
          "file_path": "/wp-content/uploads/live/CH1P20.png"
        },
        {
          "id": "83",
          "name": "Chapter 1 Page 21",
          "number": "21",
          "chapter_id": "1",
          "file_name": "CH1P21.png",
          "file_path": "/wp-content/uploads/live/CH1P21.png"
        },
        {
          "id": "84",
          "name": "Chapter 1 Page 22",
          "number": "22",
          "chapter_id": "1",
          "file_name": "CH1P22.png",
          "file_path": "/wp-content/uploads/live/CH1P22.png"
        },
        {
          "id": "85",
          "name": "Chapter 1 Page 23",
          "number": "23",
          "chapter_id": "1",
          "file_name": "CH1P23.png",
          "file_path": "/wp-content/uploads/live/CH1P23.png"
        },
        {
          "id": "86",
          "name": "Chapter 1 Page 24",
          "number": "24",
          "chapter_id": "1",
          "file_name": "CH1P24.png",
          "file_path": "/wp-content/uploads/live/CH1P24.png"
        },
        {
          "id": "87",
          "name": "Chapter 1 Page 25",
          "number": "25",
          "chapter_id": "1",
          "file_name": "CH1P25.png",
          "file_path": "/wp-content/uploads/live/CH1P25.png"
        },
        {
          "id": "88",
          "name": "Chapter 1 Page 26",
          "number": "26",
          "chapter_id": "1",
          "file_name": "CH1P26.png",
          "file_path": "/wp-content/uploads/live/CH1P26.png"
        },
        {
          "id": "89",
          "name": "Chapter 1 Page 27",
          "number": "27",
          "chapter_id": "1",
          "file_name": "CH1P27.png",
          "file_path": "/wp-content/uploads/live/CH1P27.png"
        },
        {
          "id": "90",
          "name": "Chapter 1 Page 28",
          "number": "28",
          "chapter_id": "1",
          "file_name": "CH1P28.png",
          "file_path": "/wp-content/uploads/live/CH1P28.png"
        },
        {
          "id": "96",
          "name": "Chapter 1 Page 29",
          "number": "29",
          "chapter_id": "1",
          "file_name": "CH1P29.png",
          "file_path": "/wp-content/uploads/live/CH1P29.png"
        },
        {
          "id": "101",
          "name": "Chapter 1 Page 30",
          "number": "30",
          "chapter_id": "1",
          "file_name": "CH1P30.png",
          "file_path": "/wp-content/uploads/live/CH1P30.png"
        },
        {
          "id": "102",
          "name": "Chapter 1 Page 31",
          "number": "31",
          "chapter_id": "1",
          "file_name": "CH1P31.png",
          "file_path": "/wp-content/uploads/live/CH1P31.png"
        },
        {
          "id": "103",
          "name": "Chapter 1 Page 32",
          "number": "32",
          "chapter_id": "1",
          "file_name": "CH1P32.png",
          "file_path": "/wp-content/uploads/live/CH1P32.png"
        },
        {
          "id": "104",
          "name": "Chapter 1 Page 33",
          "number": "33",
          "chapter_id": "1",
          "file_name": "CH1P33.png",
          "file_path": "/wp-content/uploads/live/CH1P33.png"
        }
      ]
    },
    {
      "id": "6",
      "number": "2",
      "name": "Chapter 2",
      "pages": [
        {
          "id": "105",
          "name": "Chapter 2 Page 0",
          "number": "0",
          "chapter_id": "6",
          "file_name": "ch02p00.png",
          "file_path": "/wp-content/uploads/live/ch02p00.png"
        },
        {
          "id": "106",
          "name": "Chapter 2 Page 1",
          "number": "1",
          "chapter_id": "6",
          "file_name": "ch02p01.png",
          "file_path": "/wp-content/uploads/live/ch02p01.png"
        },
        {
          "id": "107",
          "name": "Chapter 2 Page 2",
          "number": "2",
          "chapter_id": "6",
          "file_name": "ch02p02.png",
          "file_path": "/wp-content/uploads/live/ch02p02.png"
        },
        {
          "id": "108",
          "name": "Chapter 2 Page 3",
          "number": "3",
          "chapter_id": "6",
          "file_name": "ch02p03.png",
          "file_path": "/wp-content/uploads/live/ch02p03.png"
        },
        {
          "id": "109",
          "name": "Chapter 2 Page 4",
          "number": "4",
          "chapter_id": "6",
          "file_name": "ch02p04.png",
          "file_path": "/wp-content/uploads/live/ch02p04.png"
        },
        {
          "id": "110",
          "name": "Chapter 2 Page 5",
          "number": "5",
          "chapter_id": "6",
          "file_name": "ch02p05.png",
          "file_path": "/wp-content/uploads/live/ch02p05.png"
        },
        {
          "id": "111",
          "name": "Chapter 2 Page 6",
          "number": "6",
          "chapter_id": "6",
          "file_name": "ch02p06.png",
          "file_path": "/wp-content/uploads/live/ch02p06.png"
        },
        {
          "id": "112",
          "name": "Chapter 2 Page 7",
          "number": "7",
          "chapter_id": "6",
          "file_name": "ch02p07.png",
          "file_path": "/wp-content/uploads/live/ch02p07.png"
        },
        {
          "id": "113",
          "name": "Chapter 2 Page 8",
          "number": "8",
          "chapter_id": "6",
          "file_name": "ch02p08.png",
          "file_path": "/wp-content/uploads/live/ch02p08.png"
        },
        {
          "id": "114",
          "name": "Chapter 2 Page 9",
          "number": "9",
          "chapter_id": "6",
          "file_name": "ch02p09.png",
          "file_path": "/wp-content/uploads/live/ch02p09.png"
        },
        {
          "id": "115",
          "name": "Chapter 2 Page 10",
          "number": "10",
          "chapter_id": "6",
          "file_name": "ch02p10.png",
          "file_path": "/wp-content/uploads/live/ch02p10.png"
        },
        {
          "id": "116",
          "name": "Chapter 2 Page 11",
          "number": "11",
          "chapter_id": "6",
          "file_name": "ch02p11.png",
          "file_path": "/wp-content/uploads/live/ch02p11.png"
        },
        {
          "id": "117",
          "name": "Chapter 2 Page 12",
          "number": "12",
          "chapter_id": "6",
          "file_name": "ch02p12.png",
          "file_path": "/wp-content/uploads/live/ch02p12.png"
        },
        {
          "id": "118",
          "name": "Chapter 2 Page 13",
          "number": "13",
          "chapter_id": "6",
          "file_name": "ch02p13.png",
          "file_path": "/wp-content/uploads/live/ch02p13.png"
        },
        {
          "id": "119",
          "name": "Chapter 2 Page 14",
          "number": "14",
          "chapter_id": "6",
          "file_name": "ch02p14.png",
          "file_path": "/wp-content/uploads/live/ch02p14.png"
        },
        {
          "id": "120",
          "name": "Chapter 2 Page 15",
          "number": "15",
          "chapter_id": "6",
          "file_name": "ch02p15.png",
          "file_path": "/wp-content/uploads/live/ch02p15.png"
        },
        {
          "id": "121",
          "name": "Chapter 2 Page 16",
          "number": "16",
          "chapter_id": "6",
          "file_name": "ch02p16.png",
          "file_path": "/wp-content/uploads/live/ch02p16.png"
        },
        {
          "id": "122",
          "name": "Chapter 2 Page 17",
          "number": "17",
          "chapter_id": "6",
          "file_name": "ch02p17.png",
          "file_path": "/wp-content/uploads/live/ch02p17.png"
        },
        {
          "id": "123",
          "name": "Chapter 2 Page 18",
          "number": "18",
          "chapter_id": "6",
          "file_name": "ch02p18.png",
          "file_path": "/wp-content/uploads/live/ch02p18.png"
        },
        {
          "id": "125",
          "name": "Chapter 2 Page 19",
          "number": "19",
          "chapter_id": "6",
          "file_name": "ch02p19.png",
          "file_path": "/wp-content/uploads/live/ch02p19.png"
        },
        {
          "id": "126",
          "name": "Chapter 2 Page 20",
          "number": "20",
          "chapter_id": "6",
          "file_name": "ch02p20.png",
          "file_path": "/wp-content/uploads/live/ch02p20.png"
        },
        {
          "id": "127",
          "name": "Chapter 2 Page 21",
          "number": "21",
          "chapter_id": "6",
          "file_name": "ch02p21.png",
          "file_path": "/wp-content/uploads/live/ch02p21.png"
        },
        {
          "id": "128",
          "name": "Chapter 2 Page 22",
          "number": "22",
          "chapter_id": "6",
          "file_name": "patreon ad.png",
          "file_path": "/wp-content/uploads/live/patreon ad.png"
        }
      ]
    },
    {

        "songs": [
          {
            "chapter_id": 4,
            "filename": "test3"
          },
          {
            "chapter_id": 4,
            "filename": "test4"
          },
          {
            "chapter_id": 4,
            "filename": "test5"
          }
        ],
      "id": "7",
      "number": "3",
      "name": "Chapter 3",
      "pages": [
        {
          "id": "129",
          "name": "Chapter 3 Page 0",
          "number": "0",
          "chapter_id": "7",
          "file_name": "CH03P00.png",
          "file_path": "/wp-content/uploads/live/CH03P00.png"
        },
        {
          "id": "131",
          "name": "Chapter 3 Page 1",
          "number": "1",
          "chapter_id": "7",
          "file_name": "ch03p01.png",
          "file_path": "/wp-content/uploads/live/ch03p01.png"
        },
        {
          "id": "132",
          "name": "Chapter 3 Page 2",
          "number": "2",
          "chapter_id": "7",
          "file_name": "ch03p02.png",
          "file_path": "/wp-content/uploads/live/ch03p02.png"
        },
        {
          "id": "133",
          "name": "Chapter 3 Page 3",
          "number": "3",
          "chapter_id": "7",
          "file_name": "ch03p03.png",
          "file_path": "/wp-content/uploads/live/ch03p03.png"
        },
        {
          "id": "134",
          "name": "Chapter 3 Page 4",
          "number": "4",
          "chapter_id": "7",
          "file_name": "ch03p04.png",
          "file_path": "/wp-content/uploads/live/ch03p04.png"
        },
        {
          "id": "135",
          "name": "Chapter 3 Page 5",
          "number": "5",
          "chapter_id": "7",
          "file_name": "ch03p05.png",
          "file_path": "/wp-content/uploads/live/ch03p05.png"
        },
        {
          "id": "136",
          "name": "Chapter 3 Page 6",
          "number": "6",
          "chapter_id": "7",
          "file_name": "ch03p06.png",
          "file_path": "/wp-content/uploads/live/ch03p06.png"
        },
        {
          "id": "137",
          "name": "Chapter 3 Page 7",
          "number": "7",
          "chapter_id": "7",
          "file_name": "ch03p07.png",
          "file_path": "/wp-content/uploads/live/ch03p07.png"
        },
        {
          "id": "138",
          "name": "Chapter 3 Page 8",
          "number": "8",
          "chapter_id": "7",
          "file_name": "ch03p08.png",
          "file_path": "/wp-content/uploads/live/ch03p08.png"
        },
        {
          "id": "139",
          "name": "Chapter 3 Page 9",
          "number": "9",
          "chapter_id": "7",
          "file_name": "ch03p09.png",
          "file_path": "/wp-content/uploads/live/ch03p09.png"
        },
        {
          "id": "140",
          "name": "Chapter 3 Page 10",
          "number": "10",
          "chapter_id": "7",
          "file_name": "ch03p10.png",
          "file_path": "/wp-content/uploads/live/ch03p10.png"
        },
        {
          "id": "141",
          "name": "Chapter 3 Page 11",
          "number": "11",
          "chapter_id": "7",
          "file_name": "ch03p11.png",
          "file_path": "/wp-content/uploads/live/ch03p11.png"
        },
        {
          "id": "142",
          "name": "Chapter 3 Page 12",
          "number": "12",
          "chapter_id": "7",
          "file_name": "ch03p12.png",
          "file_path": "/wp-content/uploads/live/ch03p12.png"
        },
        {
          "id": "143",
          "name": "Chapter 3 Page 13",
          "number": "13",
          "chapter_id": "7",
          "file_name": "ch03p13.png",
          "file_path": "/wp-content/uploads/live/ch03p13.png"
        },
        {
          "id": "144",
          "name": "Chapter 3 Page 14",
          "number": "14",
          "chapter_id": "7",
          "file_name": "ch03p14.png",
          "file_path": "/wp-content/uploads/live/ch03p14.png"
        },
        {
          "id": "145",
          "name": "Chapter 3 Page 15",
          "number": "15",
          "chapter_id": "7",
          "file_name": "ch03p15.png",
          "file_path": "/wp-content/uploads/live/ch03p15.png"
        },
        {
          "id": "146",
          "name": "Chapter 3 Expo Notice",
          "number": "16",
          "chapter_id": "7",
          "file_name": "Untitled-1.png",
          "file_path": "/wp-content/uploads/live/Untitled-1.png"
        }
      ]
    },
    {
      "songs": [
        {
          "chapter_id": 4,
          "filename": "test0"
        },
        {
          "chapter_id": 4,
          "filename": "test1"
        },
        {
          "chapter_id": 4,
          "filename": "test2"
        }
      ],
      "id": "8",
      "number": "4",
      "name": "Chapter 4",
      "pages": [
        {
          "id": "147",
          "name": "Chapter 4 Page 00",
          "number": "0",
          "chapter_id": "8",
          "file_name": "ch04p00.png",
          "file_path": "/wp-content/uploads/live/ch04p00.png"
        },
        {
          "id": "148",
          "name": "Chapter 4 Page 01",
          "number": "1",
          "chapter_id": "8",
          "file_name": "ch04p01.png",
          "file_path": "/wp-content/uploads/live/ch04p01.png"
        },
        {
          "id": "149",
          "name": "Chapter 4 Page 02",
          "number": "2",
          "chapter_id": "8",
          "file_name": "ch04p02.png",
          "file_path": "/wp-content/uploads/live/ch04p02.png"
        },
        {
          "id": "150",
          "name": "Chapter 4 Page 03",
          "number": "3",
          "chapter_id": "8",
          "file_name": "ch04p03.png",
          "file_path": "/wp-content/uploads/live/ch04p03.png"
        },
        {
          "id": "151",
          "name": "Chapter 4 Page 04",
          "number": "4",
          "chapter_id": "8",
          "file_name": "ch04p04.png",
          "file_path": "/wp-content/uploads/live/ch04p04.png"
        },
        {
          "id": "152",
          "name": "Chapter 4 Page 05",
          "number": "5",
          "chapter_id": "8",
          "file_name": "ch04p05.png",
          "file_path": "/wp-content/uploads/live/ch04p05.png"
        },
        {
          "id": "153",
          "name": "Chapter 4 Page 06",
          "number": "6",
          "chapter_id": "8",
          "file_name": "ch04p06-7.png",
          "file_path": "/wp-content/uploads/live/ch04p06-7.png"
        },
        {
          "id": "154",
          "name": "Chapter 4 Page 08",
          "number": "8",
          "chapter_id": "8",
          "file_name": "ch04p08.png",
          "file_path": "/wp-content/uploads/live/ch04p08.png"
        },
        {
          "id": "155",
          "name": "Chapter 4 Page 09",
          "number": "9",
          "chapter_id": "8",
          "file_name": "ch04p09.png",
          "file_path": "/wp-content/uploads/live/ch04p09.png"
        },
        {
          "id": "156",
          "name": "Chapter 4 Page 10",
          "number": "10",
          "chapter_id": "8",
          "file_name": "ch04p10.png",
          "file_path": "/wp-content/uploads/live/ch04p10.png"
        },
        {
          "id": "157",
          "name": "Chapter 4 Page 11",
          "number": "11",
          "chapter_id": "8",
          "file_name": "ch04p11.png",
          "file_path": "/wp-content/uploads/live/ch04p11.png"
        },
        {
          "id": "158",
          "name": "Chapter 4 Page 12",
          "number": "12",
          "chapter_id": "8",
          "file_name": "ch04p12.png",
          "file_path": "/wp-content/uploads/live/ch04p12.png"
        },
        {
          "id": "159",
          "name": "Chapter 4 Page 13",
          "number": "13",
          "chapter_id": "8",
          "file_name": "ch04p13.png",
          "file_path": "/wp-content/uploads/live/ch04p13.png"
        },
        {
          "id": "160",
          "name": "Chapter 4 Page 14",
          "number": "14",
          "chapter_id": "8",
          "file_name": "ch04p14.png",
          "file_path": "/wp-content/uploads/live/ch04p14.png"
        },
        {
          "id": "161",
          "name": "Chapter 4 Page 15",
          "number": "15",
          "chapter_id": "8",
          "file_name": "ch04p15.png",
          "file_path": "/wp-content/uploads/live/ch04p15.png"
        },
        {
          "id": "162",
          "name": "Patreon",
          "number": "16",
          "chapter_id": "8",
          "file_name": "patreon in between.png",
          "file_path": "/wp-content/uploads/live/patreon in between.png"
        }
      ]
    }
  ]
};
  contentNavigation.initialize({
     firstPageEl: jQuery('.content-navigation .first'),
     previousPageEl: jQuery('.content-navigation .previous'),
     nextPageEl: jQuery('.content-navigation .next'),
     lastPageEl: jQuery('.content-navigation .last'),
     imgEl: jQuery('.comic-page img'),
     chapterSelectEl: jQuery('.content-navigation .chapter-select'),
     comic: comic,
     songEl: jQuery('#audio')
   });

  // jQuery.ajax({
  //   url: '/wp-content/themes/cb-comics/upload.php',
  //   success: function(response) {
  //     comic = JSON.parse(response);
  //
  //     contentNavigation.initialize({
  //       firstPageEl: jQuery('.content-navigation .first'),
  //       previousPageEl: jQuery('.content-navigation .previous'),
  //       nextPageEl: jQuery('.content-navigation .next'),
  //       lastPageEl: jQuery('.content-navigation .last'),
  //       imgEl: jQuery('.comic-page img'),
  //       chapterSelectEl: jQuery('.content-navigation .chapter-select'),
  //       comic: comic,
  //       songEl: Jquery('.audio')
  //     });
  //   }
  // });
}
