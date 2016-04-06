<?php

include_once 'database.php';
include_once 'config.php';

class Page {

    protected $id;

    protected $name;

    protected $chapterId;

    protected $number;

    protected $fileName;

    /**
     * Construct an instance of the object
     */
    public function __construct($name, $number, $chapterId, $fileName) {
        $this->name = $name;
	    $this->number = $number;
        $this->chapterId = $chapterId;
        $this->fileName = $fileName;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
         $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getNumber() {
        return $this->number;
    }

    public function getChapterId() {
        return $this->chapterId;
    }

    public function getFilePath() {
        return UPLOAD_DIR . '/' . $this->getFileName();
    }

    public function toArray() {
        $pageArray = array(
            'id' => $this->getId(),
            'name' => $this->getName(),
	        'number' => $this->getNumber(),
            'chapter_id' => $this->getChapterId(),
            'file_name' => $this->getFileName(),
            'file_path' => $this->getFilePath()
        );

        return $pageArray;
    }

    public function save() {
        $database = Connection::getInstance();
        $database->run("INSERT INTO pages (name, number, chapter_id, file_name) VALUES (':name', :number, :chapter_id, ':file_name')", $this->toArray());
    }

    public function delete() {
        $database = Connection::getInstance();
        $database->run("DELETE FROM pages WHERE id = :id", $this->toArray());
    }

    public static function findById($id) {
        $database = Connection::getInstance();
        $result = $database->run("SELECT * FROM pages WHERE id = :id ORDER BY number ASC", array('id' => $id));

        if (!$result) {
            return null;
        }

        $page = new self(
            $result[0]['name'],
            $result[0]['number'],
            $result[0]['chapter_id'],
            $result[0]['file_name']
        );

        $page->setId($result[0]['id']);

        return $page;
    }

    public static function findAllByChapter($chapterId) {
        $database = Connection::getInstance();
        $values = array('chapter_id' => (int) $chapterId);
        $results = $database->run('SELECT * FROM pages WHERE chapter_id = :chapter_id ORDER BY number ASC', $values);

        // Hydrate the Pages
        $pages = array();
        foreach($results as $result) {
            $page = new self(
                $result['name'],
                $result['number'],
                $result['chapter_id'],
                $result['file_name']
            );

            $page->setId($result['id']);

            $pages[] = $page;
        }

        return $pages;
    }
}
