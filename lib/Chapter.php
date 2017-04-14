<?php

include_once 'Page.php';
include_once 'Song.php';
include_once 'database.php';

class Chapter {
    protected $id;
    protected $number;
    protected $name;
    protected $pages;
    protected $songs;

    /**
     * Factory
     */
    public static function factory($values) {
        // Get the pages from the database
        $pages = Page::findAllByChapter($values['id']);
        $songs = Song::findAllByChapter($values['id']);
        $chapter = new self($values['number'], $values['name'], $pages, $songs);
        $chapter->setId($values['id']);

        return $chapter;
    }

    /**
     * Construct an instance of the object
     */
    public function __construct($number, $name, $pages = array(), $songs = array()) {
        $this->number = $number;
        $this->name = $name;
        $this->pages = $pages;
        $this->songs = $songs;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function getNumber() {
        return $this->number;
    }

    public function getName() {
        return $this->name;
    }

    public function getPages() {
        return $this->pages;
    }

    public function getSongs() {
        return $this->songs;
    }

    public function addPage(Page $page) {
        $pages[$page->getNumber()] = $page;
    }

    public function toArray() {
        $pages = array();
        foreach ($this->getPages() as $page) {
            $pages[] = $page->toArray();
        }

        $songs = array();
        foreach ($this->getSongs() as $song) {
            $songs[] = $song->toArray();
        }

        $chapterArray = array(
            'id' => $this->getId(),
            'number' => $this->getNumber(),
            'name' => $this->getName(),
            'pages' => $pages,
            'songs' => $songs
        );

        return $chapterArray;
    }

    public function save() {
        $database = Connection::getInstance();
        $database->run('INSERT INTO chapters (name, number) VALUES (":name", :number)', $this->toArray());
    }

    public static function findAll() {
        $database = Connection::getInstance();
        $results = $database->run('SELECT * FROM chapters');

        // Hydrate the objects
        $chapters = array();
        foreach($results as $result) {
            $chapters[] = self::factory($result);
        }

        return $chapters;
    }
}
