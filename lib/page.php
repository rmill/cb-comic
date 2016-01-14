<?php

class Page() {

    protected $image;

    /**
     * Construct an instance of the object
     */
    public function __construct($image) {
        $this->setImage($image);
    }

    public function toArray() {
        $imageArray = array(
            'image' => $this->getImage()
        );

        return $imageArray;
    }
}