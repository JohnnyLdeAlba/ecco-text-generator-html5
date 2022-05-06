function get_sequence(cfg, ps)
{
    if (cfg.CLIP_TOTAL == 0)
        return;

    ps.sequence = new Array();
    
    var index;
    for (index = 0; index < cfg.CLIP_TOTAL; index++)
    {
        ps.sequence[index] = new t_sequence();
        ps.sequence[index].id = cfg.CLIP_OFFSET + index;
    }
}

function t_generator()
{
    this.gif = null;

    this.string = '';
    this.cmp = null;

    this.font_filename = '';
    this.clip_filename = '';

    this.font = null;
    this.clip = null;
    this.background = null;

    this.resource = null;
    this.resource_index = 0;

    this.resource_progress = null;
}

function get_wave_generator(cfg)
{
    let table_total = 13;
    let table = cfg.EffectResource;

    let mode = PRIMARY_TABLE_ID;
    let offset = SECONDARY_TABLE_ID;
    let index;

    for (index = 0; index < table_total; index++)
    {
        if (cfg.EFFECT == table[(index * 3)])
        {
            mode = table[(index * 3) + 1];
            offset = table[(index * 3) + 2];
        }
    }
    
    return create_0x0bb006(mode, offset);
}

function generator_create_all_backgrounds(gen)
{
    let cfg = gen.cfg;

    let ms = null;
    let offset_table = null;

    let background = null;
    let context = null;

    let mode = PRIMARY_TABLE_ID;
    let offset = SECONDARY_TABLE_ID;

    ms = get_wave_generator(cfg);

    let index, line;
    for (index = 0; index < cfg.BACKGROUND_TOTAL; index++)
    {
        background = document.createElement('canvas');
        background.width = cfg.IMAGE_WIDTH;
        background.height = cfg.IMAGE_HEIGHT;

        context = background.getContext('2d');
	context.imageSmoothingEnabled = false;

        ms.a[3] = index * cfg.FRAME_SKIP;

        process_0x0bb006(ms);
	offset_table = get_offset_table(ms);

        if (cfg.EFFECT != EFFECT_TRANSPARENT)
        {
	    for (line = 0; line < 240; line++)
                context.drawImage(
	            gen.background, 0, line, 384, 1,
	            offset_table[line], line, 384, 1);
        }
        else
        {
            context.clearRect(
                0, 0, background.width, background.height);
        }

        gen.resource[index] = background;
    }

    generator_render(gen);
}

function generator_get_composition(gen)
{
    var cfg = gen.cfg;
    var cmp = gen.cmp;
    var string = gen.string;

    get_character_record(cfg, cmp); 
    get_clip_record(cfg, cmp);

    get_word_record(cfg, cmp, string);
    get_line_record(cfg, cmp);

    return;
}

function generator_render(gen) 
{
    var cfg = gen.cfg;
    var cmp = gen.cmp;

    generator_get_composition(gen);

    var background = null
    var context = null;

    var ps = new t_plot_state();

    ps.font = gen.font;
    ps.clip = gen.clip;
    ps.string = gen.string;

    get_sequence(cfg, ps);

    var index;
    for (index = 0; index < cfg.BACKGROUND_TOTAL; index++)
    {
        ps.background = gen.resource[index];
        plot_block(cfg, ps, cmp);

        background = document.createElement('canvas');
        background.width = cfg.IMAGE_WIDTH * cfg.SCALE;
        background.height = cfg.IMAGE_HEIGHT * cfg.SCALE;

        context = background.getContext('2d');
        context.imageSmoothingEnabled = false;

	    context.drawImage(
            ps.background,
            0,0,
            cfg.IMAGE_WIDTH * cfg.SCALE,
            cfg.IMAGE_HEIGHT * cfg.SCALE);

        // Dispose needs to be fixed for (hidden) ripple effects to work properly.
        gen.gif.addFrame(background, { 
		    delay: cfg.ANIMATION_DELAY,
			dispose: -2
		});
    }

    gen.gif.render();
}

function generator_update_resource_total(gen)
{
    var cfg = gen.cfg;
    var caption = 'Loading resources...';
    var percentage;

    gen.resource_index++;

    if (gen.resource_progress != null)
    {
        percentage = gen.resource_index / 3;
	percentage = percentage.toFixed(2);
        gen.resource_progress(caption, percentage);
    }

    if (gen.resource_index == 3)
        generator_create_all_backgrounds(gen);
}

function generator_process(gen)
{
    var cfg = gen.cfg;

    var filename = '';
    var resource = null;

    resource = new Image();
    resource.addEventListener(
        'load', 
        () => { generator_update_resource_total(gen); });

    resource.src = cfg.RESOURCES_DIR + cfg.FONT_FILENAME;
    gen.font = resource;

    resource = new Image();
    resource.addEventListener(
        'load', 
        () => { generator_update_resource_total(gen); });

    resource.src = cfg.RESOURCES_DIR + cfg.CLIP_FILENAME;
    gen.clip = resource;

    resource = new Image();
    resource.addEventListener(
        'load', 
        () => { generator_update_resource_total(gen); });

    resource.src = cfg.RESOURCES_DIR + cfg.BACKGROUND_FILENAME;
    gen.background = resource;
}

function create_generator() {

    var gen = new t_generator();

    gen.gif = new GIF({ 
        quality: 0, 
        workers: 64,
		transparent: null
		});

    gen.cfg = null;
    gen.cmp = new t_composition();

    gen.font = null;
    gen.font_filename = null;
    gen.background = null;

    gen.resource = new Array();
    gen.resource_total = 0;

    return gen; }

function generator_handler_progress(gen, handler)
{
    gen.gif.on('progress', (percentage) => {
        handler('Processing Gif...', percentage); });
}

function generator_handler_complete(gen, handler)
{
    gen.gif.on('finished', (blob) => {
        handler(gen.cfg, blob); });
}
