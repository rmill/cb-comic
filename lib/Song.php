<?php
include_once 'database.php';

class Song {
  protected $chapterId;
  protected $filename;

  /**
   * Construct an instance of the object
   */
  public function __construct($chapterId, $filename) {
    $this->chapterId = $chapterId;
    $this->filename = $filename;
  }

  public static function findAllByChapter($chapterId) {
      $database = Connection::getInstance();
      $values = array('chapter_id' => (int) $chapterId);
      $results = $database->run('SELECT * FROM songs WHERE chapter_id = :chapter_id', $values);
      $songs = array();

      // Hydrate the Songs
      if ($results) {
        foreach($results as $result) {
            $song = new self($result['chapter_id'], $result['filename']);
            $song->setId($result['id']);
            $songs[] = $song;
        }
      }

      return $songs;
  }

  private function setId($id) {
    $this->id = (int) $id;
  }

  public function toArray() {
    return array(
      'chapterId' => $this->chapterId,
      'filename' => $this->filename
    );
  }
}
?>
