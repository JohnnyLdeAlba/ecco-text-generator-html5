function t_config()
{
    this.FRAME_SKIP = 0;
    this.ANIMATION_DELAY = 0;

    this.IMAGE_WIDTH = 0;
    this.IMAGE_HEIGHT = 0;

    this.SCALE = 1;

    this.THEME = 0;
    this.EFFECT = 0;
    this.RESOLUTION = 0;

    this.RESOURCE_FORMAT = null;
    this.RESOURCE_TOTAL = 0;
    this.RESOURCES_DIR = null;

    this.BACKGROUND_TOTAL = 0;
    this.BACKGROUND_FILENAME = null;
    this.FONT_FILENAME = null;

    this.CLIP_FILENAME = null;

    this.CHARACTER_TOTAL = 0;
    this.CHARACTER_WIDTH = 0;
    this.CHARACTER_HEIGHT = 0;
    this.CHARACTER_SPACING = 0;

    this.CLIP_OFFSET = 9999;
    this.CLIP_TOTAL = 0;

    this.PADDING = 0;
    this.LINE_SPACING = 0;

    this.FontResource = null;
    this.ClipResource = null;
    this.EffectResource = null;
    this.ThemeResource = null;
}

function t_character()
{
    this.id = 0;

    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
}

function t_clip()
{
    this.total = 0;
    this.delay_total = 0;

    this.cell = null;
    this.delay = null;
}

function t_record()
{
    this.id = 0;

    this.x = 0;
    this.y = 0;

    this.w = 0;
    this.h = 0;

    this.offset = 0;
    this.size = 0;

    return;
}

function t_composition()
{
    this.character = null;
    this.clip = null;

    this.word_total = 0;
    this.word = null;

    this.line_total = 0;
    this.line = null;

    this.block_h = 0

    return;
}

function get_character_record(cfg, cmp) 
{
    var font_resource = cfg.FontResource;
    cmp.character = new Array();

    var index;
    var position_x = 0;
    var position_y = 0

    for (index = 0; index < cfg.CHARACTER_TOTAL; index++) 
    {
        cmp.character[index] = new t_character();

        if (index == cfg.CLIP_OFFSET)
            position_x = 0;

        cmp.character[index].character = font_resource[(index * 3) + 0];
        cmp.character[index].x = position_x;
        cmp.character[index].y = 0;

        cmp.character[index].w = font_resource[(index * 3) + 1];
        cmp.character[index].h = font_resource[(index * 3) + 2];

        position_x+= cmp.character[index].w;

        if ((index < cfg.CLIP_OFFSET) && 
            (position_y < cmp.character[index].h))
                position_y = cmp.character[index].h;
    }

    return;
}

function get_clip_record(cfg, cmp)
{
    var clip_resource = cfg.ClipResource;
    cmp.clip = new Array();

    var x, y;
    var total = 0;

    var cell = 0;
    var delay = 0;
    var delay_total = 0;

    var offset = 0;

    for (x = 0; x < cfg.CLIP_TOTAL; x++)
    {
        cmp.clip[x] = new t_clip();
  
        total = clip_resource[(x + offset) + 0];
  
        cmp.clip[x].cell = new Array();
        cmp.clip[x].delay = new Array(); 
        delay_total = 0;

        for (y = 0; y < total; y++)
        {
            cell = clip_resource[((x + offset) + 1) + y];
            delay = clip_resource[((x + offset) + 1 + total) + y];

            cmp.clip[x].cell[y] = cell;
            cmp.clip[x].delay[y] = delay;

            delay_total+= delay;
        }

        cmp.clip[x].delay_total = delay_total;
        cmp.clip[x].total = total;

        offset+= total * 2;
    }
}

function get_raw_character_id(cfg, cmp, character)
{
    var index;

    switch (character)
    {
        case '\u9100': character = '\u9000';
            break;

        case '\u9101': character = '\u9001';
            break;
    }


    for (index = 0; index < cfg.CHARACTER_TOTAL; index++)
        if (character == cmp.character[index].character) 
            return index;

    return -1; 
}

function get_character_id(cfg, cmp, character)
{
    switch (character)
    {
        case '\u9000': return -2;
        case '\u9001': return -2;

        case '\u9100': return -3;
        case '\u9101': return -3;
    }

    return get_raw_character_id(cfg, cmp, character);
}

function get_word_record(cfg, cmp, string)
{
    var character_id = 0;
    var previous_character_id = 0;
    var raw_character_id = 0;

    var word_index = 0;

    var w = 0;
    var h = cfg.CHARACTER_HEIGHT;

    cmp.word_total = 0;

    cmp.word = new Array();
    cmp.word[word_index] = new t_record();

    var index;
    for (index = 0; index < string.length; index++)
    {
        character_id = get_character_id(cfg, cmp, string.charAt(index));
        raw_character_id = get_raw_character_id(cfg, cmp, string.charAt(index));
       
        switch (character_id)
        { 
	    case -1: continue;

            case -2: 
            {
                w = cmp.character[raw_character_id].w + cfg.CHARACTER_SPACING * 2;
                h = cmp.character[raw_character_id].h + cfg.LINE_SPACING;
 
                break;
            }

            case -3:
            {
                w = 0;
                h = cmp.character[raw_character_id].h + cfg.LINE_SPACING;
  
                break;
            }

            default: if (character_id >= 0) 
            {
                w = cmp.character[character_id].w + cfg.CHARACTER_SPACING * 2;
                h = cmp.character[character_id].h + cfg.LINE_SPACING;

                break;
            }
        }

        if ((character_id == -2) ||
            (character_id == -3) ||

           (previous_character_id == -2) ||
           (previous_character_id == -3) ||
           (cmp.word[word_index].w + w >= cfg.IMAGE_WIDTH - cfg.PADDING * 2))
        {
            word_index++;

            cmp.word[word_index] = new t_record();

            if (character_id >= 0)
                cmp.word[word_index].id = 0;
            else
                cmp.word[word_index].id = character_id;

            cmp.word[word_index].offset = index;
        }

        cmp.word[word_index].w+= w;

        if (cmp.word[word_index].h < h)
            cmp.word[word_index].h = h;

        cmp.word[word_index].size = index - cmp.word[word_index].offset;
        cmp.word[word_index].size++;
        
        previous_character_id = character_id;
    }

    cmp.word_total = word_index;
    cmp.word_total++;

    return;
}

function get_line_record(cfg, cmp)
{
    var word_id = 0;
    var previous_word_id = 0;

    var line_index = 0;
    var w = 0;
    var h = 0;

    cmp.block_h = 0;
    cmp.line_total = 0;

    cmp.line = new Array();
    cmp.line[line_index] = new t_record();

    // cmp.line[line_index].h = cfg.CHARACTER_HEIGHT + cfg.LINE_SPACING;
    cmp.line[line_index].h = cfg.LINE_SPACING;

    var index;
    for (index = 0; index < cmp.word_total; index++)
    {
        word_id = cmp.word[index].id;

        w = cmp.word[index].w;
        h = cmp.word[index].h;

        if ((word_id == -3) ||
            (cmp.line[line_index].w + w > cfg.IMAGE_WIDTH - cfg.PADDING * 2))
        {
            line_index++;        
 
            cmp.line[line_index] = new t_record();
            cmp.line[line_index].offset = index;
        }

        cmp.line[line_index].w+= w;

        if (cmp.line[line_index].h < h)
            cmp.line[line_index].h = h;

        cmp.line[line_index].size = index - cmp.line[line_index].offset;
        cmp.line[line_index].size++;

        previous_word_id = word_id; 
    }

    cmp.line_total = line_index;
    cmp.line_total++;

    for (index = 0; index < cmp.line.length; index++)
        cmp.block_h+= cmp.line[index].h; 

    return;
}
