let index = 1000;

let THEME_DEFAULT = index++;
let THEME_VAPORWAVE = index++;
let THEME_THANOS = index++;
let THEME_NIGHT = index++;
let THEME_FIRE = index++;
let THEME_JURASSIC_BEACH = index++;
let THEME_THE_LAST_FIGHT = index++;

index = 2000;

let EFFECT_NONE = index++;
let EFFECT_TRANSPARENT = index++;
let EFFECT_RIPPLE = index++;
let EFFECT_REVERSE_RIPPLE = index++;
let EFFECT_DOUBLE_RIPPLE = index++;
let EFFECT_DOUBLE_WAVE = index++;
let EFFECT_WAVE = index++;
let EFFECT_WAVEX2 = index++;
let EFFECT_WAVEX4 = index++;
let EFFECT_WAVEX8 = index++;
let EFFECT_HALLUCINATION = index++;
let EFFECT_FLAMES = index++;
let EFFECT_REALITY_DISTORTION = index++;

index = 3000;

let RESOLUTION_ULTRA = index++;
let RESOLUTION_HIGH = index++;
let RESOLUTION_MEDIUM_HIGH = index++;
let RESOLUTION_MEDIUM = index++;
let RESOLUTION_LOW = index++;

index = 4000;

let OPTIONS_THEME = index++;
let OPTIONS_EFFECT = index++;
let OPTIONS_RESOLUTION = index++;

index = 5000;

let CTRL_SNAPSHOT = index++;
let CTRL_GENERATE = index++;
let CTRL_CANCEL = index++;
let CTRL_DOWNLOAD = index++;
let CTRL_CLOSE = index++;
let CTRL_ABOUT = index++;
let CTRL_OK = index++;
let CTRL_WEBSITE = index++;

let GRP_THEME = THEME_DEFAULT;
let GRP_THEME_TOTAL = 7;

let GRP_EFFECT = EFFECT_NONE;
let GRP_EFFECT_TOTAL = 13;

let GRP_RESOLUTION = RESOLUTION_ULTRA;
let GRP_RESOLUTION_TOTAL = 5;

function compatible_characters(string, mode)
{
        string = string.toUpperCase();

	// Russian.
	string = string.replace(/\u0410/g, 'A');
	string = string.replace(/\u0412/g, 'B');
	string = string.replace(/\u0415/g, 'E');
	string = string.replace(/\u0417/g, '3');
	string = string.replace(/\u041a/g, 'K');
	string = string.replace(/\u041c/g, 'M');
	string = string.replace(/\u041d/g, 'H');
	string = string.replace(/\u041e/g, 'O');
	string = string.replace(/\u0420/g, 'P');
	string = string.replace(/\u0421/g, 'C');
	string = string.replace(/\u0422/g, 'T');
	string = string.replace(/\u0425/g, 'X');

        if (mode == 1) 
        { 
		string = string.replace(/\u0020/g, '\u9001'); 
		string = string.replace(/\n/g, '\u9101'); 
		string = string.replace(/A/g, 'a'); 
		string = string.replace(/B/g, 'b'); 
		string = string.replace(/C/g, 'c'); 
		string = string.replace(/D/g, 'd'); 
		string = string.replace(/E/g, 'e'); 
		string = string.replace(/F/g, 'f'); 
		string = string.replace(/G/g, 'g'); 
		string = string.replace(/H/g, 'h'); 
		string = string.replace(/I/g, 'i'); 
		string = string.replace(/J/g, 'j'); 
		string = string.replace(/K/g, 'k'); 
		string = string.replace(/L/g, 'l'); 
		string = string.replace(/M/g, 'm'); 
		string = string.replace(/N/g, 'n'); 
		string = string.replace(/O/g, 'o'); 
		string = string.replace(/P/g, 'p'); 
		string = string.replace(/Q/g, 'q'); 
		string = string.replace(/R/g, 'r'); 
		string = string.replace(/S/g, 's'); 
		string = string.replace(/T/g, 't'); 
		string = string.replace(/U/g, 'u'); 
		string = string.replace(/V/g, 'v'); 
		string = string.replace(/W/g, 'w'); 
		string = string.replace(/X/g, 'x'); 
		string = string.replace(/Y/g, 'y'); 
		string = string.replace(/Z/g, 'z'); 
	}
        else
        {
		string = string.replace(/\u0020/g, '\u9000');
		string = string.replace(/\n/g, '\u9100');
        }

	string = string.replace(/\(1\)/g, '\u1001');
	string = string.replace(/\(2\)/g, '\u1002');
	string = string.replace(/\(3\)/g, '\u1003');
	string = string.replace(/\(4\)/g, '\u1004');
	string = string.replace(/\(5\)/g, '\u1005');
	string = string.replace(/\(6\)/g, '\u1006');
	string = string.replace(/\(7\)/g, '\u1007');
	string = string.replace(/\(8\)/g, '\u1008');
	string = string.replace(/\(9\)/g, '\u1009');
 
	return string;
}

function get_control_resource()
{
    let table = [

       OPTIONS_THEME,
       'ctrl_options_theme',
       'menu_item',
       update_group_options,
       update_group_options,
       update_group_options,

       OPTIONS_EFFECT,
       'ctrl_options_effect',
       'menu_item',
       update_group_options,
       update_group_options,
       update_group_options,

       OPTIONS_RESOLUTION,
       'ctrl_options_resolution',
       'menu_item',
       update_group_options,
       update_group_options,
       update_group_options,

       THEME_DEFAULT,
       'ctrl_theme_default',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_VAPORWAVE,
       'ctrl_theme_vaporwave',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_THANOS,
       'ctrl_theme_thanos',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_NIGHT,
       'ctrl_theme_night',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_FIRE,
       'ctrl_theme_fire',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_JURASSIC_BEACH,
       'ctrl_theme_jurassic_beach',
       'menu_item',
       null,
       update_group_theme,
       null,

       THEME_THE_LAST_FIGHT,
       'ctrl_theme_the_last_fight',
       'menu_item',
       null,
       update_group_theme,
       null,

       EFFECT_NONE,
       'ctrl_effect_none',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_TRANSPARENT,
       'ctrl_effect_transparent',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_RIPPLE,
       'ctrl_effect_ripple',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_REVERSE_RIPPLE,
       'ctrl_effect_reverse_ripple',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_DOUBLE_RIPPLE,
       'ctrl_effect_double_ripple',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_DOUBLE_WAVE,
       'ctrl_effect_double_wave',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_WAVE,
       'ctrl_effect_wave',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_WAVEX2,
       'ctrl_effect_wavex2',
       'menu_item',
       null,
       update_group_effect,
       null,
 
       EFFECT_WAVEX4,
       'ctrl_effect_wavex4',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_WAVEX8,
       'ctrl_effect_wavex8',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_HALLUCINATION,
       'ctrl_effect_hallucination',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_FLAMES,
       'ctrl_effect_flames',
       'menu_item',
       null,
       update_group_effect,
       null,

       EFFECT_REALITY_DISTORTION,
       'ctrl_effect_reality_distortion',
       'menu_item',
       null,
       update_group_effect,
       null,

       RESOLUTION_ULTRA,
       'ctrl_resolution_ultra',
       'menu_item',
       null,
       update_group_resolution,
       null,

       RESOLUTION_HIGH,
       'ctrl_resolution_high',
       'menu_item',
       null,
       update_group_resolution,
       null,

       RESOLUTION_MEDIUM_HIGH,
       'ctrl_resolution_medium_high',
       'menu_item',
       null,
       update_group_resolution,
       null,

       RESOLUTION_MEDIUM,
       'ctrl_resolution_medium',
       'menu_item',
       null,
       update_group_resolution,
       null,

       RESOLUTION_LOW,
       'ctrl_resolution_low',
       'menu_item',
       null,
       update_group_resolution,
       null,

       CTRL_SNAPSHOT,
       'ctrl_snapshot',
       'control',
       null,
       null,
       null,

       CTRL_GENERATE,
       'ctrl_generate',
       'control',
       null,
       null,
       null,

       CTRL_CANCEL,
       'ctrl_cancel',
       'control',
       null,
       null,
       null,

       CTRL_DOWNLOAD,
       'ctrl_download',
       'control',
       update_control_download,
       update_control_download,
       update_control_download,

       CTRL_CLOSE,
       'ctrl_close',
       'control',
       update_control_close,
       update_control_close,
       update_control_close,

       CTRL_OK,
       'ctrl_ok',
       'control',
       update_control_close,
       update_control_close,
       update_control_close,

       CTRL_WEBSITE,
       'ctrl_website',
       'control',
       update_control_website,
       update_control_website,
       update_control_website ];


    return table;
}

function get_soft_key_resource()
{
    let table = [
        'key_8000', "(*)",

        'key_1001', "(1)",
        'key_1002', "(2)",
        'key_1003', "(3)",
        'key_1004', "(4)",
        'key_1005', "(5)",
        'key_1006', "(6)",
        'key_1007', "(7)",
        'key_1008', "(8)",
        'key_1009', "(9)",

        'key_00c6', '\u00c6',
        'key_00d0', '\u00d0',
        'key_00de', '\u00de',
        'key_041b', '\u041b',
        'key_041f', '\u041f',
        'key_042a', '\u042a',
        'key_042b', '\u042b',
        'key_042c', '\u042c',
        'key_042d', '\u042d',
        'key_042e', '\u042e',
        'key_042f', '\u042f',
        'key_00c7', '\u00c7',
        'key_0411', '\u0411',
        'key_0413', '\u0413',
        'key_0414', '\u0414',
        'key_0416', '\u0416',
        'key_0418', '\u0418',
        'key_0419', '\u0419',
        'key_0423', '\u0423',
        'key_0424', '\u0424',
        'key_0427', '\u0427',
        'key_0428', '\u0428',
        'key_0429', '\u0429',

        'key_3042', '\u3042',
        'key_3044', '\u3044',
        'key_3046', '\u3046',
        'key_3048', '\u3048',
        'key_3051', '\u3051',
        'key_3053', '\u3053',
        'key_3057', '\u3057',
        'key_3059', '\u3059',
        'key_3061', '\u3061',
        'key_3064', '\u3064',
        'key_3066', '\u3066',
        'key_3068', '\u3068',
        'key_3072', '\u3072',
        'key_3075', '\u3075',
        'key_3078', '\u3078',
        'key_3080', '\u3080',
        'key_3081', '\u3081',
        'key_3082', '\u3082',
        'key_3084', '\u3084',
        'key_3086', '\u3086',
        'key_3088', '\u3088',
        'key_3089', '\u3089',
        'key_3092', '\u3092',
        'key_3093', '\u3093' ];

    return table;
}


function get_theme_resource()
{
    let table = [

        THEME_DEFAULT,
        'font-000.png',
        'background-000.png',

        THEME_VAPORWAVE, 
        'font-001.png',
        'background-001.png',

        THEME_THANOS, 
        'font-000.png',
        'background-002.png',

        THEME_NIGHT, 
        'font-003.png',
        'background-003.png',

        THEME_FIRE, 
        'font-004.png',
        'background-004.png',

        THEME_JURASSIC_BEACH, 
        'font-005.png',
        'background-005.png',

        THEME_THE_LAST_FIGHT, 
        'font-006.png',
        'background-006.png' ];

    return table;
}

function get_effect_resource()
{
    let table = [

        EFFECT_NONE, 
        0,
        0,

        EFFECT_TRANSPARENT,
        0,
        0,

        EFFECT_RIPPLE, 
        PRIMARY_TABLE_ID,
        SECONDARY_TABLE_ID,

        EFFECT_REVERSE_RIPPLE, 
        SECONDARY_TABLE_ID,
        PRIMARY_TABLE_ID,

        EFFECT_DOUBLE_RIPPLE, 
        SECONDARY_TABLE_ID,
        SECONDARY_TABLE_ID,

        EFFECT_DOUBLE_WAVE, 
        PRIMARY_TABLE_ID,
        PRIMARY_TABLE_ID,

        EFFECT_WAVE, 
        PRIMARY_TABLE_ID,
        1,

        EFFECT_WAVEX2, 
        PRIMARY_TABLE_ID,
        2,

        EFFECT_WAVEX4, 
        PRIMARY_TABLE_ID,
        4,

        EFFECT_WAVEX8, 
        PRIMARY_TABLE_ID,
        8,

        EFFECT_HALLUCINATION, 
        PRIMARY_TABLE_ID,
        -129,
 
        EFFECT_FLAMES,
        PRIMARY_TABLE_ID,
        -130,

        EFFECT_REALITY_DISTORTION,
        PRIMARY_TABLE_ID,
        -132 ];

    return table;
}

function get_font_resource() {

   let table = [
        '\u9000', 16, 29,
        'A', 16, 29,
        'B', 16, 29,
        'C', 16, 29,
        'D', 16, 29,
        'E', 16, 29,
        'F', 15, 29,
        'G', 16, 29,
        'H', 16, 29,
        'I',  8, 29,
        'J', 16, 29,
        'K', 16, 29,
        'L', 16, 29,
        'M', 24, 29,
        'N', 16, 29,
        'O', 16, 29,
        'P', 16, 29,
        'Q', 16, 29,
        'R', 16, 29,
        'S', 16, 29,
        'T', 16, 29,
        'U', 16, 29,
        'V', 16, 29,
        'W', 24, 29,
        'X', 18, 29,
        'Y', 16, 29,
        'Z', 16, 29,

        // Extended
	'À', 16, 29,
        'È', 16, 29,
        'Ì',  8, 29,
        'Ò', 16, 29,
        'Ù', 16, 29,
        'Á', 16, 29,
        'É', 16, 29,
        'Í',  8, 29,
        'Ó', 16, 29,
        'Ú', 16, 29,
        'Ȁ', 16, 29,
        'Ȅ', 16, 29,
        'Ȉ', 14, 29,
        'Ȍ', 16, 29,
        'Ȕ', 16, 29,
        'Ä', 16, 29,
        'Ë', 16, 29,
        'Ï', 13, 29,
        'Ö', 16, 29,
        'Ü', 16, 29,
        'Ã', 16, 29,
        'Ẽ', 16, 29,
        'Ĩ', 10, 29,
        'Õ', 16, 29,
        'Ũ', 16, 29,
        '\u00d1', 16, 29,
        'Â', 16, 29,
        'Ê', 16, 29,
        'Î', 10, 29,
        'Ô', 16, 29,
        'Û', 16, 29,
        '\u00c7', 16, 29,
        'Ð', 19, 29,
        'Þ', 16, 29,
        'Æ', 23, 29,

        // Russian
        'Б', 16, 29,
        'Г', 15, 29,
        'Д', 16, 29,
        'Ж', 23, 29,
        'И', 16, 29,
        'Й', 16, 29,
        'Л', 16, 29,
        'П', 16, 29,
	'У', 16, 29,
        'Ф', 21, 29,
        'Ч', 16, 29,
        'Ш', 21, 29,
        'Щ', 22, 29,
        'Ъ', 21, 29,
        'Ы', 22, 29,
        'Ь', 16, 29,
        'Э', 16, 29,
	'Ю', 22, 29,
        'Я', 16, 29,

        // Numbers
        '0', 15, 29,
        '1', 11, 29,
        '2', 16, 29,
        '3', 16, 29,
        '4', 16, 29,
        '5', 16, 29,
        '6', 16, 29,
        '7', 16, 29,
        '8', 16, 29,
        '9', 16, 29,

        // Punctuation
        '!',  7, 29,
        '¡',  7, 29,
        '?', 16, 29,
        '¿', 16, 29,
        ',',  8, 29,
        '.',  7, 29,
        "'",  8, 29,
	'{', 13, 29,
	'}', 13, 29,
        ';',  8, 29,
        ':',  7, 29,
        '-', 16, 29,
		
	// Hiragana
        '\u3042', 17, 29,
        '\u304b', 17, 29,
        '\u305f', 17, 29,
        '\u306a', 18, 29,
        '\u306f', 17, 29,
        '\u307e', 15, 29,
        '\u3084', 17, 29,
        '\u3089', 16, 29,
        '\u308f', 17, 29,
        '\u3044', 16, 29,
        '\u304d', 17, 29,
        '\u3057', 16, 29,
        '\u3061', 17, 29,
        '\u306b', 16, 29,
        '\u3072', 17, 29,
        '\u307f', 18, 29,
        '\u308a', 15, 29,
        '\u3046', 13, 29,
        '\u304f', 13, 29,
        '\u3059', 17, 29,
        '\u3064', 17, 29,
        '\u3075', 17, 29,
        '\u3080', 17, 29,
        '\u3086', 14, 29,
        '\u308b', 16, 29,
        '\u3048', 17, 29,
        '\u3051', 17, 29,
        '\u305b', 17, 29,
        '\u3066', 17, 29,
        '\u306d', 17, 29,
        '\u3078', 17, 29,
        '\u3081', 17, 29,
        '\u308c', 17, 29,
        '\u304a', 17, 29,
        '\u3053', 16, 29,
        '\u305d', 17, 29,
        '\u3068', 15, 29,
        '\u306e', 17, 29,
        '\u307b', 17, 29,
        '\u3082', 16, 29,
        '\u3088', 15, 29,
        '\u3092', 17, 29,
        '\u3093', 17, 29,
        '\u308d', 16, 29,

        // Katakana
        '\u30a2', 17, 29,
        '\u30ab', 17, 29,
        '\u30b5', 17, 29,
        '\u30bf', 16, 29,
        '\u30ca', 17, 29,
        '\u30cf', 18, 29,
        '\u30de', 16, 29,
        '\u30e4', 16, 29,
        '\u30e9', 16, 29,
        '\u30ef', 16, 29,
        '\u30f3', 17, 29,
        '\u30a4', 16, 29,
        '\u30ad', 17, 29,
        '\u30b7', 17, 29,
        '\u30c1', 17, 29,
        '\u30cb', 17, 29,
        '\u30d2', 16, 29,
        '\u30df', 12, 29,
        '\u30ea', 12, 29,
        '\u30a6', 17, 29,
        '\u30af', 17, 29,
        '\u30b9', 17, 29,
        '\u30c4', 14, 29,
        '\u30cc', 16, 29,
        '\u30d5', 16, 29,
        '\u30e0', 17, 29,
        '\u30e6', 18, 29,
        '\u30eb', 18, 29,
        '\u30a8', 18, 29,
        '\u30b1', 17, 29,
        '\u30bb', 17, 29,
        '\u30c6', 17, 29,
        '\u30cd', 17, 29,
        '\u30d8', 17, 29,
        '\u30e1', 15, 29,
        '\u30ec', 14, 29,
        '\u30aa', 17, 29,
        '\u30b3', 16, 29,
        '\u30bd', 17, 29,
        '\u30c8', 13, 29,
        '\u30ce', 14, 29,
        '\u30db', 17, 29,
        '\u30e2', 17, 29,
        '\u30e8', 16, 29,
        '\u30ed', 16, 29,
        '\u30f2', 16, 29,

        // Small Characters
        '\u9001', 8, 14,
        'a', 8, 14,
        'b', 8, 14,
        'c', 8, 14,
        'd', 8, 14,
        'e', 8, 14,
        'f', 8, 14,
        'g', 8, 14,
        'h', 8, 14,
        'i', 8, 14,
        'j', 8, 14,
        'k', 8, 14,
        'l', 8, 14,
        'm', 8, 14,
        'n', 8, 14,
        'o', 8, 14,
        'p', 8, 14,
        'q', 8, 14,
        'r', 8, 14,
        's', 8, 14,
        't', 8, 14,
        'u', 8, 14,
        'v', 8, 14,
        'w', 8, 14,
        'x', 8, 14,
        'y', 8, 14,
        'z', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '', 8, 14,
        '<', 8, 14,
        '>', 8, 14,

        // Animated Characters
	'\u1001', 24, 32,
	'\u1002', 37, 49,
	'\u1003', 32, 32,
        '\u1004', 43, 41,
	'\u1005', 24, 30,
        '\u1006', 32, 25,
	'\u1007', 47, 19,
	'\u1008', 75, 27,
        '\u1009',103, 29 ];

    return table;
}

function get_clip_resource()
{
    let table = [
        5, 0, 1, 2, 3, 4,
           2, 2, 3, 2, 2,

        5, 0, 1, 2, 3, 4,
           7, 5, 5, 5, 5,

        4, 0, 1, 2, 3,
           3, 3, 3, 3,

        5, 0, 1, 2, 3, 4,
           2, 2, 3, 2, 2,

        6, 0, 1, 2, 3, 4, 5,
           1, 1, 1, 1, 3, 3,

        3, 0, 1, 2,
           4, 4, 5,

        4, 0, 1, 2, 3,
           7, 7, 7, 7,

        6, 0, 1, 2, 3, 4, 5,
           2, 2, 3, 3, 3, 3,

        24, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4, 5, 6, 7, 6, 7, 6, 7, 5, 3, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2  ];

    return table;
}

function get_clip_total(ClipResource)
{
    let index = 0;
    let total = 0;

    for (; index < ClipResource.length; index++)
    {
        index+= ClipResource[index] * 2;
        total++;
    }

    return total;
}

function create_default_h_config()
{
    var cfg = new t_config();

    cfg.FRAME_SKIP = 1;
    cfg.ANIMATION_DELAY = 20 * cfg.FRAME_SKIP;

    cfg.IMAGE_WIDTH = 320;
    cfg.IMAGE_HEIGHT = 240;

    cfg.SCALE = 1;
    cfg.EFFECT = EFFECT_RIPPLE;
    cfg.THEME = THEME_VAPORWAVE;

    cfg.RESOURCES_DIR = 'resources/';
    cfg.RESOURCE_FORMAT = 'png';
    cfg.RESOURCE_TOTAL = cfg.BACKGROUND_TOTAL + 1;

    cfg.BACKGROUND_TOTAL = Math.floor(256 / cfg.FRAME_SKIP);

    cfg.BACKGROUND_FILENAME = 'background-000.png';
    cfg.FONT_FILENAME = 'font-000.png';

    cfg.CLIP_FILENAME = 'clip-0428.png';

    cfg.CHARACTER_WIDTH = 0;
    cfg.CHARACTER_HEIGHT = 0;
    cfg.CHARACTER_SPACING = 0;

    cfg.CLIP_OFFSET = 196;

    cfg.PADDING = 8;
    cfg.LINE_SPACING = 0;

    cfg.FontResource = get_font_resource();
    cfg.ClipResource = get_clip_resource(); 
    cfg.ThemeResource = get_theme_resource();
    cfg.EffectResource = get_effect_resource();

    cfg.CHARACTER_TOTAL = cfg.FontResource.length / 3;
    cfg.CLIP_OFFSET = cfg.CHARACTER_TOTAL - 9;
    cfg.CLIP_TOTAL = get_clip_total(cfg.ClipResource);

    return cfg;
}
