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
      $results = $database->run('SELECT * FROM sogns WHERE chapter_id = :chapter_id ORDER BY number ASC', $values);

      // Hydrate the Pages
      $songs = array();
      foreach($results as $result) {
          $song = new self(
              $result['chapter_id'],
              $result['filename'],
          );

          $song->setId($result['id']);

          $songs[] = $song;
      }

      return $songss;
  }
}
?>
