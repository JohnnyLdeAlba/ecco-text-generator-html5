let CONTROL_SELECTED = 0x00000001;
let CONTROL_DESELECT = 0x00000001 << 1;
let CONTROL_HIGHLIGHTED = 0x00000001 << 2;
let CONTROL_DEHIGHLIGHT = 0x00000001 << 3;

function t_control() 
{
    this.id = 0;
    this.key = null;
    this.class = null;
    this.state = 0;

    this.open = null;
    this.close = null;
    this.out = null;

    this.data = null;
} 

function set_control_state(ctrl, state) 
{
    let element = document.getElementById(ctrl.key);

    switch (state)
    {
        case CONTROL_SELECTED:
        {
            element.classList.remove(ctrl.class);
            element.classList.add(ctrl.class + '_selected');
            break;
        }

        case CONTROL_DESELECT:
        {
            element.classList.remove(ctrl.class + '_selected');
            element.classList.add(ctrl.class);
            break;
        }

        case CONTROL_HIGHLIGHTED:
        {
            element.classList.remove(ctrl.class);
            element.classList.add(ctrl.class + '_highlighted');
            break;
        }

        case CONTROL_DEHIGHLIGHT:
        {
            element.classList.remove(ctrl.class + '_highlighted');
            element.classList.add(ctrl.class);
            break;
        }
    }
}

function control_on(ctrl, event)
{
    if (event == 'close')
    {
	ctrl.state = CONTROL_SELECTED;
	set_control_state(ctrl, CONTROL_SELECTED);

	return 0;
    }

    set_control_state(ctrl, CONTROL_DESELECT);

    if (event == 'out')
    {
	ctrl.state&= 0xffffff00;
	return 0;
    }

    if ((ctrl.state & 0x000000ff) == 0)
        return 0;

    ctrl.state&= 0xffffff00;
    return 1;
}

function update_control_group(
    ui,
    control_id,
    group_id, 
    total)
{
    let index;
    let control;

    for (index = 0; index < total; index++)
    {
        control = get_control(ui, group_id + index);

        if (control_id == control.id)
            set_control_state(control, CONTROL_HIGHLIGHTED);
        else
            set_control_state(control, CONTROL_DEHIGHLIGHT);
    }
}

function set_panel_visibility(id, visible)
{
    let element = document.getElementById(id);

    if (visible == 1)
    {
         element.classList.remove('invisible');
         element.classList.add('visible');
    }

    else
    {
         element.classList.remove('visible');
         element.classList.add('invisible');
    }
}

function update_group_resolution(ui, event, control)
{
    let cfg = ui.cfg;

    if (control != null)
        cfg.RESOLUTION = control.id;

    switch (cfg.RESOLUTION)
    {
        case RESOLUTION_ULTRA:
        {
            cfg.FRAME_SKIP = 1;
            cfg.SCALE = 2;

            break;
        }

        case RESOLUTION_HIGH:
        {
            cfg.FRAME_SKIP = 2;
            cfg.SCALE = 2;

            break;
        }

        case RESOLUTION_MEDIUM_HIGH:
        {
	    cfg.FRAME_SKIP = 1;
            cfg.SCALE = 1;

            break;
        }

        case RESOLUTION_MEDIUM:
        {
            cfg.FRAME_SKIP = 2;
            cfg.SCALE = 1;

            break;
        }

        case RESOLUTION_LOW:
        {
            cfg.FRAME_SKIP = 3;
            cfg.SCALE = 1;

            break;
        }
    }

    cfg.ANIMATION_DELAY = 20 * cfg.FRAME_SKIP;
    cfg.BACKGROUND_TOTAL = Math.floor(256 / cfg.FRAME_SKIP);
    cfg.RESOURCE_TOTAL = cfg.BACKGROUND_TOTAL + 1;

    update_control_group(
        ui, 
        cfg.RESOLUTION,
        GRP_RESOLUTION,
        GRP_RESOLUTION_TOTAL);

    return;
}

function update_group_theme(ui, event, control)
{
    let cfg = ui.cfg;
    let index;

    if (control == null)
        control = get_control(ui, cfg.THEME);

    cfg.THEME = control.id; 
    resource = cfg.ThemeResource;

    for (index = 0; index < GRP_THEME_TOTAL; index++)
    {
        if (cfg.THEME == resource[(index * 3) + 0])
        {
            cfg.FONT_FILENAME = resource[(index * 3) + 1];
            cfg.BACKGROUND_FILENAME = resource[(index * 3) + 2];
        }
    }

    update_control_group(
        ui, 
        cfg.THEME,
        GRP_THEME,
        GRP_THEME_TOTAL);
}

function update_group_effect(ui, event, control)
{
    let cfg = ui.cfg;

    if (control != null)
        cfg.EFFECT = control.id;

    update_control_group(
        ui, 
        cfg.EFFECT,
        GRP_EFFECT,
        GRP_EFFECT_TOTAL);
}

function hide_all_panels() 
{
    let panel = document.getElementById('display_download');

    try { panel.removeChild(panel.lastChild); }
    catch(e) {}

    let table = [
        'pnl_right',
        'pnl_home',
        'pnl_theme',
        'pnl_effect',
        'pnl_resolution',
        'pnl_about',
        'pnl_progress_bar',
        'pnl_download' ]

    let index;
    let total = table.length;

    for (index = 0; index < total; index++)
        set_panel_visibility(table[index], 0);
}

function update_group_options(ui, event, control)
{
    if (control_on(control, event) == 0)
	    return;


    if (control == null) return;

    hide_all_panels();
    set_panel_visibility('pnl_right', 1);

    switch (control.id)
    {
        case OPTIONS_THEME:
        {
            set_panel_visibility('pnl_theme', 1);
            break;
        }
 
        case OPTIONS_EFFECT:
        {
           set_panel_visibility('pnl_effect', 1);
           break;
        }

        case OPTIONS_RESOLUTION:
        {
           set_panel_visibility('pnl_resolution', 1);
           break;
        }
    }  

    return; 
}

function update_control_download(ui, event, control)
{
    if (control_on(control, event) == 0)
	    return;

    var link = document.getElementById('link_download');
    link.click();

    hide_all_panels();
    set_panel_visibility('pnl_right', 1);
    set_panel_visibility('pnl_home', 1);
 
 
    return;
}

function update_control_close(ui, event, control)
{
    if (control_on(control, event) == 0)
	    return;

    hide_all_panels();
    set_panel_visibility('pnl_right', 1);
    set_panel_visibility('pnl_home', 1);
 
    return;
}

function update_control_about(ui, event, control)
{
    if (control_on(control, event) == 0)
	return;

    hide_all_panels();
    set_panel_visibility('pnl_right', 1);
    set_panel_visibility('pnl_about', 1);
 
    return;
}

function update_control_website(ui, event, control)
{
    if (control_on(control, event) == 0)
	return;

    window.location = 'https://eccothedolphin.online';
    return;
}

function t_user_interface()
{
    this.link = [
        'link_home', 'pnl_home pnl_right',
        'link_about', 'pnl_about' ];

    this.soft_key = get_soft_key_resource();

    this.ControlResource = get_control_resource();
    this.CTRL_TOTAL = (this.ControlResource.length / 6);

    this.cfg = null;
    this.ctrl = new Array();
}

function create_all_controls(ui)
{
    let index;
    let resource_index;

    let ctrl = ui.ctrl;
    let ControlResource = ui.ControlResource;

    for (index = 0; index < ui.CTRL_TOTAL; index++)
    {
        resource_index = index * 6;

        ctrl[index] = new t_control();

        ctrl[index].id = ControlResource[resource_index];
        ctrl[index].key = ControlResource[resource_index + 1];
        ctrl[index].class = ControlResource[resource_index + 2];

        ctrl[index].open = ControlResource[resource_index + 3];
        ctrl[index].close = ControlResource[resource_index + 4];
        ctrl[index].out = ControlResource[resource_index + 5];
    }
}

function get_control(ui, id)
{
    let ctrl = ui.ctrl;

    let index;

    for (index = 0; index < ui.CTRL_TOTAL; index++)
    {
        if (isNaN(id))
        {
            if (ctrl[index].key == id)
                return ctrl[index];
        }
        else if (ctrl[index].id == id)
            return ctrl[index];
    }

    return null;
}

function event_listener(event, ui, type)
{
    let ctrl = ui.ctrl;

    let index;
    let control;

    for (index = 0; index < ui.CTRL_TOTAL; index++)
    {
        control = ctrl[index];
        if (control.key == event.target.id)
            break;
    }

    if (index == ui.CTRL_TOTAL)
        return;

    switch (type)
    {
        case 'open': 
        {
            control.open(ui, 'open', control);
            break;
        }

        case 'close': 
        {
            control.close(ui, 'close', control);
            break;
        }

        case 'out': 
        {
            control.out(ui, 'out', control);
            break;
        }
    }
}

function enable_all_control_handlers(ui)
{
    let ctrl = ui.ctrl;

    let index;
    let control;
    let element;

    for (index = 0; index < ui.CTRL_TOTAL; index++)
    {
        control = ui.ctrl[index];
        element = document.getElementById(control.key);

        if (control.open != null)
            element.addEventListener('mouseup',
                (event) => { event_listener(event, ui, 'open'); });

        if (control.close != null)
            element.addEventListener('mousedown', 
                (event) => { event_listener(event, ui, 'close'); });
        
        if (control.out != null)
            element.addEventListener('mouseout',
                (event) => { event_listener(event, ui, 'out'); });
    }
}

function link_listener(event, ui)
{
    let link = ui.link;

    let index, y, z;
    let total = link.length / 2;
    let item;
    let classList;

    for (index = 0; index < total; index++)
    {
        item = link[(index * 2)];

        classList = event.target.classList;
        for (y = 0; y < classList.length; y++)
        {
            if (item == classList[y])
            {
                item = link[(index * 2) + 1];
                item = item.split(' ');

                hide_all_panels();

                for (z = 0; z < item.length; z++)
                    set_panel_visibility(item[z], 1);

                break;
            }
        }        
    }
}

function enable_all_link_handlers(ui)
{
    let link = ui.link;

    let index, y;
    let total = link.length / 2;
    let element;

    for (index = 0; index < total; index++)
    {
        elements = document.querySelectorAll('.' + link[(index * 2)]);

        for (y = 0; y < elements.length; y++)
        {
            elements[y].addEventListener('click',
                (event) => { link_listener(event, ui); });
        }
    }
}
