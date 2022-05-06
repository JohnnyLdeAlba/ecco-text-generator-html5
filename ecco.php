<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 

define('IMAGE_WIDTH', 640);
define('IMAGE_HEIGHT', 448);  

define('LETTER_SPACING', 4);
define('LINE_SPACING', 16);

define('ALPHABIT_FILENAME', 'default_font.png');

define('ALPHABIT_LETTER', 0);
define('ALPHABIT_X', 1);
define('ALPHABIT_Y', 2);
define('ALPHABIT_WIDTH', 3);

define('LETTER_HEIGHT', 32);
define('ANIMATION_DELAY', 5);
define('FRAME_TOTAL', 56);
define('RESOURCES_DIR', './resources/');

$alphabit_offset = array(
    array('A',   0,  0, 28),
    array('B',  28,  0, 28),
    array('C',  56,  0, 28),
    array('D',  84,  0, 28),
    array('E', 112,  0, 28),
    array('F', 140,  0, 26),
    array('G', 166,  0, 28),
    array('H', 194,  0, 28),
    array('I', 222,  0, 12),
    array('J', 234,  0, 28),
    array('K', 262,  0, 28),
    array('L', 290,  0, 28),
    array('M', 318,  0, 44),

    array('N', 364,  0, 28),
    array('O',   0, 32, 28),
    array('P',  28, 32, 28),
    array('Q',  56, 32, 28),
    array('R',  84, 32, 28),
    array('S', 112, 32, 28),
    array('T', 140, 32, 28),
    array('U', 168, 32, 28),
    array('V', 196, 32, 28),
    array('W', 224, 32, 44),
    array('X', 268, 32, 32),
    array('Y', 300, 32, 28),
    array('Z', 328, 32, 28));

$string = "HELLO WORLD";

$animation = new Imagick();
$animation->setFormat('gif');

$index = 0;
$filename = '';

$alphabit = new Imagick();
$alphabit->readImage(RESOURCES_DIR.ALPHABIT_FILENAME);

$destination = new Imagick();
$destination->newImage(
    IMAGE_WIDTH, 
    IMAGE_HEIGHT, 
    new ImagickPixel('none'));

$destination->setImageFormat('gif'); 

$length = strlen($string);

$letter_resource = NULL;
$letter_index = 0;

$position_x = IMAGE_WIDTH/2;
$position_y = (IMAGE_HEIGHT/2)-(LETTER_HEIGHT/2);

function get_letter_index($letter) {

    global $alphabit_offset;

    $index = 0;

    if ($letter == ' ') return -2;

    // 26 = alphabit total.
    for ($index = 0; $index < 26; $index++)
        if ($letter == $alphabit_offset[$index][ALPHABIT_LETTER])
            return $index;

    return -1; }

/*
       $letter_resource = clone $alphabit;
        $letter_resource->cropImage(
            $alphabit_offset[0][ALPHABIT_WIDTH],
            LETTER_HEIGHT,
            $alphabit_offset[0][ALPHABIT_X],
            $alphabit_offset[0][ALPHABIT_Y]); 

        if ($index > 0) $position_x-= LETTER_SPACING;

        $position_x-= ($alphabit_offset[0][ALPHABIT_WIDTH]/2);

        $destination->compositeImage(
            $letter_resource, Imagick::COMPOSITE_OVER, 
            $position_x, 
            $position_y); 
 
        $letter_resource->clear();
*/



for ($index = 0; $index < $length; $index++) {

    $letter_index = get_letter_index(
        substr($string, $index, 1));

    if ($letter_index >= 0) {

        $letter_resource = clone $alphabit;
        $letter_resource->cropImage(
            $alphabit_offset[$letter_index][ALPHABIT_WIDTH],
            LETTER_HEIGHT,
            $alphabit_offset[$letter_index][ALPHABIT_X],
            $alphabit_offset[$letter_index][ALPHABIT_Y]); 

        if ($index > 0) $position_x-= LETTER_SPACING;

        $position_x-= ($alphabit_offset[$letter_index][ALPHABIT_WIDTH]/2);

        $destination->compositeImage(
            $letter_resource, Imagick::COMPOSITE_OVER, 
            $position_x, 
            $position_y); 
 
        $letter_resource->clear(); }

    if ($letter_index == -2)
        $position_x-= 28; // Letter width. 
    }

$frame = NULL;

for ($index = 0; $index < FRAME_TOTAL; $index++) { 

    $filename = str_pad(strval($index), 3, '0', STR_PAD_LEFT);
    $filename.= '.png';

    $frame = new Imagick();
    $frame->readImage(RESOURCES_DIR.$filename);

    $frame->compositeImage(
        $destination, Imagick::COMPOSITE_OVER, 
        0, 
        0); 
 

    $animation->addImage($frame);
    $animation->setImageDelay(ANIMATION_DELAY);
    $animation->nextImage();

    $frame->clear(); }

$destination->clear();

header("content-type: image/gif");
echo $animation->getImagesBlob();

?>
