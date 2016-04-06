<?php

include_once 'Chapter.php';

class Comic {

    /**
     * The comic chapters
     *
     * @var array of Chapter
     */
    protected $chapters;

    /**
     * Factory
     */
    public function factory() {
        // Get all of the information from the database
        $chapters = Chapter::findAll();
        return new self($chapters);
    }

    /**
     * Construct an instance of the object
     */
    public function __construct($chapters) {
        $this->setChapters($chapters);
    }

    public function getChapters() {
        return $this->chapters;
    }

    public function setChapters($chapters) {
        $this->chapters = $chapters;
    }

    public function toArray() {
        $chapters = array();
        foreach($this->getChapters() as $chapter) {
            $chapters[] = $chapter->toArray();
        }

        $comicArray = array(
            'chapters' => $chapters
        );

        return $comicArray;
    }
}