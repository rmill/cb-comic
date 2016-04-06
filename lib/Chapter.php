<?php

include_once 'Page.php';
include_once 'database.php';

class Chapter {

    protected $id;

    protected $number;

    protected $name;

    protected $pages;

    /**
     * Factory
     */
    public function factory($values) {
        // Get the pages from the database
        $pages = Page::findAllByChapter($values['id']);
        $chapter = new self($values['number'], $values['name'], $pages);
        $chapter->setId($values['id']);

        return $chapter;
    }

    /**
     * Construct an instance of the object
     */
    public function __construct($number, $name, $pages = array()) {
        $this->number = $number;
        $this->name = $name;
        $this->pages = $pages;
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

    public function addPage(Page $page) {
        $pages[$page->getNumber()] = $page;
    }

    public function toArray() {
        $pages = array();
        foreach ($this->getPages() as $page) {
            $pages[] = $page->toArray();
        }

        $chapterArray = array(
            'id' => $this->getId(),
            'number' => $this->getNumber(),
            'name' => $this->getName(),
            'pages' => $pages
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