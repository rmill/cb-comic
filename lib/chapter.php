<?php

include 'page.php';

class Chapter() {

    protected $number;

    protected $name;

    protected $pages;

    /**
     * Construct an instance of the object
     */
    public function __construct($number, $name) {
        $this->number = $number;
        $this->name = $name;
        $this->pages = array();
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
            'number' => $this->getNumber(),
            'pages' => $pages
        );

        return $chapterArray;
    }
}