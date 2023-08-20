const rotate_class_name = 'rotate-icon'
var user_config = {}
var share_key = {}
// 整体操作 Start
$(document).ready(function () {
    $.ajax({
        url: `/daily/api/${jinjaUrl}` + window.location.search,
        type: "get",
        processData: false,
        success: function (ret) {
            let ta_tab = $("#card-stack");

            result = ret.last_result;
            user_config = ret.config;
            const data = ret.data;
            const module = ret.order;

            for (let i = 0; i < module.length; ++i) {
                let val = data[module[i]];
                ta_tab.append(make_card(val)); //添加一列
                switch_toggle_collapse(val.key)
            }

            load_results(module, result);
            _icon_rotate()

        },
        error: function (ret) {
            show_toast('error', '获取配置失败。', `${ret.responseText}`);
            // suspend("alert-danger", "获取配置失败");
        },
    });
});
// 整体操作 End

// Call主页面Toast Start
function show_toast(status, text, desc = null) {
    window.parent.show_toast(status, text, desc)
}
// Call主页面Toast End

// 展开按钮旋转 Start
function _icon_rotate() {
    const buttons = document.querySelectorAll('.btn-icon');
    buttons.forEach(button => {
        const svg = button.querySelector('svg');
        button.addEventListener('click', () => {
            if (((button.getAttribute('aria-expanded') === 'false') && !(svg.classList.contains(rotate_class_name))) || ((button.getAttribute('aria-expanded') === 'true') && (svg.classList.contains(rotate_class_name)))) {
                svg.classList.toggle(rotate_class_name);
            };
        });
    });
}
// 展开按钮旋转 End

// Switch切换卡片状态 Start
function switch_toggle_collapse(switchID) {
    // 获取 checkbox 元素
    const _switch = document.getElementById(switchID);
    const button = document.querySelector(`[data-bs-toggle="collapse"][data-bs-target="#collapse-${switchID}"]`);
    // 添加事件监听器
    _switch.addEventListener("change", function () {
        // 检查 checkbox 是否被选中
        // if (_switch.checked && (button.getAttribute('aria-expanded') == 'false')) {
        if (_switch.checked ^ (button.getAttribute('aria-expanded') == 'true')) {
            // collapse_set('show', `collapse-` + elementID)

            // 创建一个新的鼠标点击事件
            var clickEvent = new MouseEvent("click");

            // 分派点击事件到按钮元素
            button.dispatchEvent(clickEvent);
        }
    });
}
// Switch切换卡片状态 End

// Spinner可见切换 Start
function toggle_spinner(status = 'hidden', element) {
    /*
    status: 'hidden', 'show'
    element: 该spinner的父元素
    */
    let spanEl = $(element).children("span.spinner-border")
    switch (status) {
        case 'hidden':
            if (!(spanEl.hasClass("visually-hidden"))) {
                spanEl.addClass("visually-hidden")
            }
            break;

        case 'show':
            if (spanEl.hasClass("visually-hidden")) {
                spanEl.removeClass("visually-hidden")
            }
            break

        default:
            break;
    }
};
// Spinner可见切换 End

// 第二部分 生成配置代码 Start
// 第二部分 1.生成配置项块 Start
function generate_config_HTML(config) {
    share_key[config.key] = (share_key[config.key] || 0) + 1;
    let configHTML = '';

    /*
    configHTML += `
        <div class="mb-3" name=${config.key}_card>
            <h6>${config.desc}</h6>
            ${generate_option_HTML(config)}
        </div>
        `;
      */

    configHTML = `<div class="input-group input-group-sm" name=${config.key}_card><span class="text-start align-items-start input-group-text">${config.desc}</span>${generate_option_HTML(config)}</div>`
    return configHTML;
}
// 第二部分 1.生成配置项块 End

// 第二部分 2.生成配置项输入部分-选择器 Start
function generate_option_HTML(config) {

    switch (config.config_type) {
        //1.单选
        case 'single':
            return get_single_html(config)
            break;

        //2.多选
        case 'multi':
            return get_multi_html(config)
            break;

        //3.数值
        case 'int':
            return get_int_html(config)
            break;

        //4.布尔
        case 'bool':
            return get_bool_html(config)
            break;

        //5.时间
        case 'time':
            return get_time_html(config)
            break;
    }
}
// 第二部分 2.生成配置项输入部分-选择器 End

// 第二部分 3.1生成配置项输入部分-具体实现-单选 Start
function get_single_html(config) {
    /*
    let res = `<select class="custom-select" id=${config.key} name=${config.key} onchange="selectOnChange(this)">`;
    for (let i = 0; i < config.candidates.length; i++) res += `<option value='${config.candidates[i]}' ${user_config[config.key] == config.candidates[i] ? "selected" : ""}>${config.candidates[i]}</option>`;
    res += "</select>";
    */
    let res = `<select id=${config.key} class="form-select" name=${config.key} onchange="selectOnChange(this)">`
    for (let i = 0; i < config.candidates.length; i++) {
        res += `<option value='${config.candidates[i]}' ${user_config[config.key] == config.candidates[i] ? "selected" : ""}>${config.candidates[i]}</option>`;
    }
    res += "</select>";
    return res;
}
// 第二部分 3.1生成配置项输入部分-具体实现-单选 End

// 第二部分 3.2生成配置项输入部分-具体实现-多选 Start
function get_multi_html(config) {
    let res = `<select id=${config.key} class="form-select" multiple name=${config.key} onchange="selectMultiOnChange(this)">`;
    for (let i = 0; i < config.candidates.length; i++) {
        res += `<option value='${config.candidates[i]}' ${user_config[config.key].includes(config.candidates[i]) ? "selected" : ""}>${config.candidates[i]}</option>`;
    }
    res += "</select>";
    return res;
}
// 第二部分 3.2生成配置项输入部分-具体实现-多选 End

// 第二部分 3.3生成配置项输入部分-具体实现-数值 Start
function get_int_html(config) {
    /*
    return `<input type="text" name=${config.key} value=${user_config[config.key]} onchange="selectOnChange(this)" class="form-control" placeholder=${config.candidates[0]}-${config.candidates[config.candidates.length-1]}`;
    */
    return `<input id=${config.key} class="form-control" type="text" value=${user_config[config.key]} onchange="selectOnChange(this)" oninput="value=value.replace(/\D/g,&#39;&#39;)" name=${config.key} placeholder=${config.candidates[0]} ~ ${config.candidates[config.candidates.length - 1]} oninput="value=value.replace(/\D/g,'')" />`;
}
// 第二部分 3.3生成配置项输入部分-具体实现-数值 End

// 第二部分 3.4生成配置项输入部分-具体实现-布尔 Start
function get_bool_html(config) {
    /*
    return `<input type="checkbox" class="switch" ${user_config[config.key] ? 'checked="checked"' : ""} id=${config.key} name=${config.key} onclick="checkboxOnclick(this)" />`;
    */
    let res = `<div class="input-group-text form-control form-switch px-3" style="min-width: fit-content;">`
    res += `<input id=${config.key} class="form-check-input m-0" type="checkbox" style="transform: scale(1.30);" name=${config.key} ${user_config[config.key] ? 'checked="checked"' : ""} onclick="checkboxOnclick(this)" /></div>`;
    return res
}
// 第二部分 3.4生成配置项输入部分-具体实现-布尔 End

// 第二部分 3.5生成配置项输入部分-具体实现-时间 Start
function get_time_html(config) {
    /*
    return `<input type="time" class="form-control" id=${config.key} name=${config.key} value=${user_config[config.key]} onchange="selectOnChange(this)" />`;
    */
    return `<input id=${config.key} class="form-control" type="time" name=${config.key} value=${user_config[config.key]} onchange="selectOnChange(this)" />`;
}
// 第二部分 3.5生成配置项输入部分-具体实现-时间 End
// 第二部分 生成配置代码 End

// 第三部分 1函数定义-结果Tag颜色及文本
function set_tag(status, element) {
    const classDict = {
        'success': [`text-success-emphasis`, `bg-success-subtle`, `border-success-subtle`],
        'info': [`text-info-emphasis`, `bg-info-subtle`, `border-info-subtle`],
        'warning': [`text-warning-emphasis`, `bg-warning-subtle`, `border-warning-subtle`],
        'error': [`text-danger-emphasis`, `bg-danger-subtle`, `border-danger-subtle`],
    }
    const textDict = {
        'success': `运行成功`,
        'info': `跳过运行`,
        'warning': `运行中止`,
        'error': `运行出错`,
    }
    for (var key in classDict) {
        element.classList.remove(...classDict[key]);
    }
    switch (status) {
        case "success":
            element.classList.add(...classDict['success']);
            element.textContent = textDict['success'];
            return
            break;
        case "skip":
            element.classList.add(...classDict['info']);
            element.textContent = textDict['info'];
            return
            break;
        case "abort":
            element.classList.add(...classDict['warning']);
            element.textContent = textDict['warning'];
            return
            break;
        case "error":
            element.classList.add(...classDict['error']);
            element.textContent = textDict['error'];
            return
            break;
        default:
            element.classList.add(...classDict['info']);
            element.textContent = textDict['info'];
            return
            break;
    }
}

// 第三部分 3.载入运行结果文本
function update_new() {
    let config = {};
    // document.getElementById('main-tab-content').style.pointerEvents = 'none';
    let share_ret = window.parent.share_ret
    config['alian'] = share_ret.alian;
    config['qq'] = share_ret.qq;
    config['username'] = "";
    config['password'] = "";
    config['config'] = user_config;
    $.ajax({
        url: `/daily/api/${jinjaUrl}` + window.location.search,
        type: "put",
        data: JSON.stringify(config),
        contentType: "application/json;charset=utf-8",
        processData: false,
        success: function (ret) {
            if (ret.statusCode == 200) {
                // document.getElementById('main-tab-content').style.pointerEvents = 'auto';
                show_toast('success', '修改保存成功。')
            } else {
                show_toast('error', '修改保存失败。', `将于三秒后刷新页面。\n如需帮助，请联系管理员。\n${ret.message}`);
                setTimeout(function() {
                    location.reload(true);
                }, 3000);
            }
        },
        error: function (ret) {
            show_toast('error', '修改保存失败。', `将于三秒后刷新页面。\n如需帮助，请联系管理员。\n${ret.message}`);
            setTimeout(function() {
                location.reload(true);
            }, 3000);
        },
    });
}

function load_results(module, ret) {
    for (let i = 0; i < module.length; ++i) {
        // let key = module[i];
        load_result(ret, module[i]);
    }
}
// load_result函数见页面独特js

// 第三部分 载入运行结果 End
// 第四部分 事件函数
// 以下均已移动至card.js
// 点击时保存 Start
function selectOnChange(e) {
    /*
    适用于time/int/single类型
    */
    const key = e.id;
    let value = e.value;
    if (isDigit(value))
        value = parseInt(value);
    user_config[key] = value;
    update_new();
    $(`[name=${key}]`).val(value);
}
// 点击时保存 End

// 检查int Start
function isDigit(str) {
    for (var i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return false; // 包含非数字字符
        }
    }
    return true; // 不包含非数字字符
};
// 检查int End

// 点击时保存（多选 Start
function selectMultiOnChange(e) {
    /*
    Multi类型专用
    */
    const key = e.id;
    let value = Array.from(e.selectedOptions).map(option => option.value);
    const intValue = value.map(option => parseInt(option))
    if (intValue.length != 0 && !isNaN(intValue[0]))
        value = intValue;
    user_config[key] = value;
    update_new();
};
// 点击时保存（多选 End

// 点击时保存（checkbox Start
function checkboxOnclick(checkbox) {
    /*
    适用于switch
    */
    const key = checkbox.id;
    const value = checkbox.checked;
    user_config[key] = value;
    update_new();
}
// 点击时保存（checkbox End

// 单项执行 Start
function do_single(e) {
    const flag = e.getAttribute('flag');
    $(`[flag=${flag}]`).attr('disabled', true);
    toggle_spinner('show', e);
    // suspend("alert-info", "已开始执行。");
    show_toast('info', `已开始执行“${e.name}”。`)
    let config = {
        config: user_config,
        order: [`${e.getAttribute('key')}`]
    }
    $.ajax({
        url: '/daily/api/do_single' + window.location.search,
        type: 'post',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(config),
        success: function (ret) {
            load_results(ret.order, ret.result);
            $(`[flag=${flag}]`).attr('disabled', false);
            toggle_spinner('hidden', e);
            // suspend("alert-success", "任务执行成功！");
            show_toast('success', `“${e.name}”执行成功。`)
        },
        error: function (ret) {
            // suspend("alert-danger", "执行任务失败: " + ret.responseText);
            show_toast('error', `“${e.name}”执行失败。`, `${ret.responseText}`)
            $(`[flag=${flag}]`).attr('disabled', false);
            toggle_spinner('hidden', e);
        }
    })
}
// 单项执行 End

// 全部执行 Start
function do_all_task(e) {
    const flag = e.getAttribute('flag');
    $(`[flag=${flag}]`).attr('disabled', true);
    toggle_spinner('show', e)
    // suspend("alert-info", "已开始执行清日常任务。");
    show_toast('info', `已开始执行任务。`)
    $.ajax({
        url: '/daily/api/do_task' + window.location.search,
        type: 'get',
        processData: false,
        success: function (ret) {
            // <!-- prompt(JSON.stringify(ret), "alert-success", 60000); -->
            // suspend("alert-success", "清日常任务执行完毕。");
            show_toast('success', `任务执行完毕。`)
            toggle_spinner('hidden', e)
            $(`[flag=${flag}]`).attr('disabled', false);
            load_results(ret.order, ret.result);
        },
        error: function (ret) {
            show_toast("error", "任务执行失败。", `${ret.responseText}`);
            toggle_spinner('hidden', e)
            $(`[flag=${flag}]`).attr('disabled', false);
        }
    })
};
// 全部执行 End
// 第三部分 事件函数 End