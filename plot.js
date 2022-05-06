function t_sequence()
{
    this.id = 0;

    this.index = 0;
    this.cycle = 0;
}

function t_plot_state()
{
    this.font = null;
    this.clip = null;
    this.background = null;
    this.sequence = null;

    this.clip_index = 0;
    this.delay_offset = 0;

    this.string = '';

    this.position_x = 0;
    this.position_y = 0;
}

function plot_word(
    cfg,
    ps,
    cmp,

    line_index,
    word_index,
    word_offset) 
{
    let context = ps.background.getContext('2d');
    context.imageSmoothingEnabled = false;
	
    let offset = cmp.word[word_offset + word_index].offset;
    let total = cmp.word[word_offset + word_index].size;

    let character_id = -1;
    let raw_character_id = 0;
    let character = null;

    let sequence = null;
    let clip = null;

    let clip_id = 0;
    let clip_index = 0;

    let position_y = 0;
    let resource = null;

    let index;
    for (index = 0; index < total; index++)
    {
        character_id = get_character_id(
            cfg,
            cmp, 
            ps.string.charAt(offset + index));
			
        raw_character_id = get_raw_character_id(
            cfg,
            cmp, 
            ps.string.charAt(offset + index));

        if (character_id == -2)
        {
            character = cmp.character[raw_character_id];
            ps.position_x+= character.w + cfg.CHARACTER_SPACING;
        }
        else if (character_id >= 0) 
        {
            character = cmp.character[character_id];
            ps.position_x+= cfg.CHARACTER_SPACING;

            if (character_id >= cfg.CLIP_OFFSET)
            {
                clip_id = character_id - cfg.CLIP_OFFSET;

                clip = cmp.clip[clip_id];
                sequence = ps.sequence[clip_id];

                clip_index = clip.cell[sequence.index];

                position_y = character.y +
                    (character.h * clip_index);

                resource = ps.clip;
            }
            else
            {
                position_y = character.y;
                resource = ps.font;
            }

            context.drawImage(
                resource,
                character.x,
                position_y,
                character.w,
                character.h,

                ps.position_x,
                ps.position_y + (cmp.line[line_index].h - character.h),
                character.w,
                character.h);
					
            ps.position_x+= character.w + cfg.CHARACTER_SPACING;	
        }
    }
}

function plot_line(
    cfg,
    ps,
    cmp,
    line_index)
{
    ps.position_x = Math.floor(cfg.IMAGE_WIDTH/2 - cmp.line[line_index].w/2);

    var offset = cmp.line[line_index].offset;
    var total = cmp.line[line_index].size;

    var index;
    for (index = 0; index < total; index++)
        plot_word(cfg, ps, cmp, line_index, index, offset);

    ps.position_y+= cmp.line[line_index].h;
}

function plot_block(cfg, ps, cmp)
{
    ps.position_y = Math.floor(cfg.IMAGE_HEIGHT/2 - cmp.block_h/2);

    var sequence = null; 
    var clip = null;

    var clip_index = 0;
    var delay = 0;

    var index;

    for (index = 0; index < cmp.line_total; index++) 
        plot_line(cfg, ps, cmp, index);

    for (index = 0; index < cfg.CLIP_TOTAL; index++)
    {
        sequence = ps.sequence[index];
        clip = cmp.clip[index];
 
        clip_index = sequence.index;
        delay = clip.delay[clip_index];

        if (sequence.cycle >= ((delay + 1) * (2 / cfg.FRAME_SKIP)) - 1)
        {
            sequence.cycle = 0;

            if (clip_index >= clip.total - 1)
                clip_index = 0;
            else clip_index++;
        }
        else sequence.cycle++;

        sequence.index = clip_index;
    }

    if (ps.clip_index >= cfg.BACKGROUND_TOTAL - 1)
        ps.clip_index = 0;
    else ps.clip_index++;
}
