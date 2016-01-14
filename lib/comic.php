<?php

include 'chapter.php';
include 'config.php';

class Comic () {

    /**
     * The comic chapters
     *
     * @var array of Chapter
     */
    protected $chapters;

    /**
     * Construct an instance of the object
     */
    public function __construct() {
        $chapterDirs = glob(COMIC_DIR . '/*' , GLOB_ONLYDIR);

        foreach($chapterDirs as $chapterDir) {
          $chapterNumber = (int) substr($chapterDir, strrpos($chapterDir, '/') + 1);
          $chapterName = ($chapterNumber == 0) ? 'Prologue' : "Chapter $chapterNumber";

          $chapter = new Chapter($chapterNumber, $chapterName);

          $pageFiles = scandir($chapterDir);
          foreach($pageFiles as $pageFile) {
            if (!in_array($pageFile, array('.', '..'))) {
                $image = $chapterDir . '/' . $pageFile;

                $page new Page($image);
                $chapter->addPage($page);
            }
          }
        }
    }

    public function getChapters() {
        return $this->chapters;
    }

    public function toArray() {
        $chapters = array();
        foreach($this->getChapters() as $chapter) {
            $chapters[] = $chapter->toArray();
        }

        $comicArray = array(
            'chapters' => $chapters;
        );

        return $comicArray;
    }
}