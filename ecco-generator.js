function display_gif(cfg, blob)
{
    var panel = document.getElementById('display_download');
    var link = document.getElementById('link_download');

    var preview = new Image();

    var url = URL.createObjectURL(blob);
    var filename = '';

    preview.addEventListener('load', () => { 
        panel.appendChild(preview); 
    });

    preview.setAttribute('src', url);
    preview.setAttribute('class', 'display_download');

    preview.width = cfg.IMAGE_WIDTH;
    preview.height = cfg.IMAGE_HEIGHT;

    filename = url.substring(url.lastIndexOf('/') + 1);

    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.gif');

    update_progressbar('&nbsp;', 0); // FIX! 

    hide_all_panels();
    set_panel_visibility('pnl_download', 1);
 
    return;
}

function generate_png(prg)
{
    var panel = document.getElementById('display_download');
    var link = document.getElementById('link_download');

    var preview = new Image();

    prg.display.toBlob((blob) => {

        var url = URL.createObjectURL(blob);
        var filename = '';

        preview.addEventListener('load', () => { 
            panel.appendChild(preview); 
        });

        preview.setAttribute('src', url);
        preview.setAttribute('class', 'display_download');

        preview.width = prg.cfg.IMAGE_WIDTH;
        preview.height = prg.cfg.IMAGE_HEIGHT;

        filename = url.substring(url.lastIndexOf('/') + 1);

        link.setAttribute('href', url);
        link.setAttribute('download', filename + '.png');

    }, 'image/octet-stream');
 
    return;
}

function generate_gif(prg)
{
    prg.generator = null;
    prg.generator = create_generator();

    prg.generator.cfg = prg.cfg;
    prg.generator.string = prg.ps.string;

    prg.generator.resource_progress = update_progressbar;

    generator_handler_progress(
        prg.generator, update_progressbar);

    generator_handler_complete(
        prg.generator, display_gif);

    generator_process(prg.generator);
}

function update_control_snapshot(ui, event, control) 
{
    let prg = control.data;

    if (control_on(control, event) == 0)
	return;

    generate_png(prg);

    hide_all_panels();
    set_panel_visibility('pnl_download', 1);
}

function update_control_generate(ui, event, control) 
{
    let prg = control.data;

    if (control_on(control, event) == 0)
	return;

    generate_gif(prg);

    update_progressbar('&nbsp;', 0);

    hide_all_panels();
    set_panel_visibility('pnl_progress_bar', 1);
}

function update_control_cancel(ui, event, control)
{
    let prg = control.data;

    if (control_on(control, event) == 0)
	return;

    prg.generator.gif.abort(); // FIX - Why?

    hide_all_panels();
    set_panel_visibility('pnl_right', 1);
    set_panel_visibility('pnl_home', 1);

    update_progressbar('&nbsp;', 0);
}

function t_program()
{
    this.generator = null;

    this.cfg = null;
    this.cmp = null;
    this.ps = null;
    this.ui = null;
    this.ms = null;

    this.editor = null;
    this.display = null;

    this.raw_string = null;
    this.frame = 0;
    this.delay = 0;

    this.font = null;
    this.clip = null;
    this.background = null;

    this.resource = null;
    this.resource_index = 0;
    this.resource_total = 0;

    return;
}

function enable_display(prg)
{
    prg.resource_index++;

    if (prg.resource_index == prg.resource_total)
    {
        prg.ps.clip = prg.clip;
        prg.ps.background = prg.display;

        prg.editor.addEventListener(
            'keyup', () => { update_editor(prg); });

        setInterval(() => { update_display(prg); }, 20);
    }
}

// Needs to be fixed (Resource).

function get_resources(prg)
{
    let cfg = prg.cfg;
    let index;

    prg.theme_total = 7;
    prg.resource_total = 15;

    prg.font = new Array();
    prg.background = new Array();

    for (index = 0; index < prg.theme_total; index++)
    {
        prg.font[index] = new Image();    
        prg.font[index].src = cfg.RESOURCES_DIR
            + cfg.ThemeResource[(index * 3) + 1];
    
        prg.font[index].addEventListener(
            'load', () => { enable_display(prg); });

        prg.background[index] = new Image();    
        prg.background[index].src = cfg.RESOURCES_DIR
            + cfg.ThemeResource[(index * 3) + 2];

        prg.background[index].addEventListener(
            'load', () => { enable_display(prg); });
    }

    prg.clip = new Image();    
    prg.clip.src = prg.cfg.RESOURCES_DIR 
        + prg.cfg.CLIP_FILENAME;

    prg.clip.addEventListener(
        'load', () => { enable_display(prg); });
}

function create_program()
{
    let prg = new t_program();
    let ui = new t_user_interface();
    let cfg = create_default_h_config();

    prg.cmp = new t_composition();
    prg.ps = new t_plot_state();

    prg.cfg = cfg;
    prg.ui = ui;
    prg.generator = null;

    get_character_record(cfg, prg.cmp);
    get_clip_record(cfg, prg.cmp);

    ui.cfg = cfg; 
    create_all_controls(ui);

    let control;

    control = get_control(ui, CTRL_SNAPSHOT);
    control.open = update_control_snapshot;
    control.close = update_control_snapshot;
    control.out = update_control_snapshot;
    control.data = prg;

    control = get_control(ui, CTRL_GENERATE);
    control.open = update_control_generate;
    control.close = update_control_generate;
    control.out = update_control_generate;
    control.data = prg;

    control = get_control(ui, CTRL_CANCEL);
    control.open = update_control_cancel;
    control.close = update_control_cancel;
    control.out = update_control_cancel;
    control.data = prg;

    enable_all_keymap_handlers()
    enable_all_soft_key_handlers(prg);
    enable_all_control_handlers(prg.ui);
    enable_all_link_handlers(prg.ui);

    cfg.THEME = THEME_DEFAULT;
    cfg.EFFECT = EFFECT_RIPPLE;
    cfg.RESOLUTION = RESOLUTION_MEDIUM;

    update_group_theme(ui, null, null);
    update_group_effect(ui, null, null);
    update_group_resolution(ui, null, null);

    set_panel_visibility('pnl_home', 1);
	
    get_sequence(prg.cfg, prg.ps);

    return prg;
}

function update_program(prg)
{
    prg.editor = document.getElementById('editor');
    prg.display = document.getElementById('display');

    get_resources(prg);
}

function set_progressbar(percentage)
{
    let classList = document.getElementById('ctrl_progress_bar').classList;
    let previous_class = classList.item(0);
    
    if (percentage >= 95) classList.add('progress_bar_100');
    else if (percentage >= 90) classList.add('progress_bar_090');
    else if (percentage >= 80) classList.add('progress_bar_080');
    else if (percentage >= 70) classList.add('progress_bar_070');
    else if (percentage >= 60) classList.add('progress_bar_060');
    else if (percentage >= 50) classList.add('progress_bar_050');
    else if (percentage >= 40) classList.add('progress_bar_040');
    else if (percentage >= 30) classList.add('progress_bar_030');
    else if (percentage >= 20) classList.add('progress_bar_020');
    else if (percentage >= 10) classList.add('progress_bar_010');
    else classList.add('progress_bar_000');

    if (classList.length > 1)
        classList.remove(previous_class);
}

function update_progressbar(caption, percentage)
{
    let progress_bar_caption = document.getElementById('progress_bar_caption');
    let element = document.getElementById('percentage_field');
    let string = '';

    percentage = Math.round(percentage*100);
    set_progressbar(percentage);
    
    if (percentage < 10) string = '&nbsp;';
    string+= percentage;

    progress_bar_caption.innerHTML = caption;
    element.innerHTML = string + '%';
}

function update_display_background(prg)
{
    let cfg = prg.cfg;

    let context = null;
    let background = null;

    let ms = null;
    let offset_table = null;

    let index = prg.frame * prg.cfg.FRAME_SKIP;
    let line = 0;

    context = prg.display.getContext('2d');
    context.imageSmoothingEnabled = false;

    if (cfg.EFFECT == EFFECT_TRANSPARENT)
    {
        context.clearRect(
            0, 
            0, 
            prg.display.width,
            prg.display.height);

        return;
    }

    background = document.createElement('canvas');
    background.width = cfg.IMAGE_WIDTH;
    background.height = cfg.IMAGE_HEIGHT;

    ms = get_wave_generator(cfg);
    ms.memory[ms.a[3]] = index;

    process_0x0bb006(ms);
    offset_table = get_offset_table(ms);

    for (line = 0; line < 240; line++)
        context.drawImage(
            prg.background[cfg.THEME - THEME_DEFAULT], 
            0, line, 384, 1,
	    offset_table[line], line, 384, 1);

    if (prg.frame > 255) prg.frame = 0;
    else prg.frame++;

    return;
}

function update_editor(prg)
{
    if (prg.resource_index < prg.resource_total)
        return;

    let cfg = prg.cfg;
    let editor = prg.editor;

    let raw_string = editor.value;
    let string = null;

    let cmp = new t_composition();

    cmp.character = prg.cmp.character;
    cmp.clip = prg.cmp.clip;

    string = compatible_characters(raw_string);

    get_word_record(cfg, cmp, string);
    get_line_record(cfg, cmp);

    if (cmp.block_h > cfg.IMAGE_HEIGHT - cfg.PADDING * 2)
    {
        cmp = prg.cmp;
        editor.value = prg.raw_string;
    }

    else
    {
       prg.cmp = cmp;
       prg.raw_string = raw_string;
       prg.ps.string = string;
    }

    update_display(prg);
}

function update_display(prg)
{
    if (prg.resource_index < prg.resource_total)
        return;
    
    if (prg.delay > 255) prg.delay = 0;
    else prg.delay++;

    if (prg.delay % prg.cfg.FRAME_SKIP != 0)
         return;

    prg.ps.font = prg.font[prg.cfg.THEME - THEME_DEFAULT];

    update_display_background(prg);
    plot_block(prg.cfg, prg.ps, prg.cmp);
}

function insert_ch(prg, id)
{
    var editor = prg.editor;
    var string = editor.value;

    var selection_start = editor.selectionStart;
    var selection_end = editor.selectionEnd;

    var string_begin = string.substring(0, selection_start);
    var string_end = string.substring(selection_end);

    editor.value = string_begin + id + string_end;

    editor.selectionStart = selection_end + 1;
    editor.selectionEnd = selection_end + 1;
    editor.focus();

    update_editor(prg);
}

function soft_key_listener(event, prg)
{
    let soft_key = prg.ui.soft_key;

    let index, y;
    let total = soft_key.length / 2;
    let item;

    for (index = 0; index < total; index++)
    {
        item = soft_key[(index * 2)];

        if (item == event.target.id)
        {
            item = soft_key[(index * 2) + 1];
            insert_ch(prg, item);

            break;
        }
    }
}

function enable_all_soft_key_handlers(prg)
{
    let soft_key = prg.ui.soft_key;

    let index, y;
    let total = soft_key.length / 2;
    let element;

    for (index = 0; index < total; index++)
    {
        elements = document.querySelectorAll('#' + soft_key[(index * 2)]);

        for (y = 0; y < elements.length; y++)
        {
            elements[y].addEventListener('click',
                (event) => { soft_key_listener(event, prg); });
        }
    }
}

function keymap_listener(event, table)
{
    let index;

    for (index = 0; table.length / 2; index++)
    {
        if (table[(index * 2)] == event.target.id)
            set_panel_visibility(table[(index * 2) + 1], 1);
        else
            set_panel_visibility(table[(index * 2) + 1], 0);
    }
}

function enable_all_keymap_handlers()
{
    let table = [
        'link_ani', 'map_ani',
        'link_int', 'map_int',
        'link_hira', 'map_hira'];

    let index;
    let target;

    for (index = 0; index < table.length / 2; index++)
    {
        target = document.getElementById(table[(index * 2)]);
        target.addEventListener('click',
            (event) => { keymap_listener(event, table); });
    }
}
