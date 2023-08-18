// const rotate_class_name = 'rotate-icon' // 转移到card.js
// var user_config = {}
// var share_key = {}

// // Call主页面Toast Start
// // 转移到card.js
// function show_toast(status, text, desc = null) {
//     window.parent.show_toast(status, text, desc)
// }
// // Call主页面Toast End

// 整体操作 Start
// 已移动至card.js
// 整体操作 End

// // 展开按钮旋转 Start
// // 转移到card.js
// function _icon_rotate() {
//     const buttons = document.querySelectorAll('.btn-icon');
//     buttons.forEach(button => {
//         const svg = button.querySelector('svg');
//         button.addEventListener('click', () => {
//             if (((button.getAttribute('aria-expanded') === 'false') && !(svg.classList.contains(rotate_class_name))) || ((button.getAttribute('aria-expanded') === 'true') && (svg.classList.contains(rotate_class_name)))) {
//                 svg.classList.toggle(rotate_class_name);
//             };
//         });
//     });
// }
// // 展开按钮旋转 End

/*
// 卡片状态转换 Start
function collapse_set(status, collapseID) {
    const element = document.getElementById(collapseID);
    const _collapse = new bootstrap.Collapse(element);
    const button = document.querySelector(`[data-bs-toggle="collapse"][data-bs-target="#${collapseID}"]`);
    const svg = button.querySelector('svg');
    switch (status) {
        case 'show':
            _collapse.show()
            if (svg.classList.contains(rotate_class_name)) {
                svg.classList.remove(rotate_class_name);
            }
            break;
        case 'hide':
            _collapse.hide()
            if (!(svg.classList.contains(rotate_class_name))) {
                svg.classList.add(rotate_class_name);
            }
            break;
        case 'toggle':
            _collapse.toggle()
            svg.classList.toggle(rotate_class_name);
            break;
    }
}
// 卡片状态转换 End
*/

// // Switch切换卡片状态 Start
// // 转移到card.js
// function switch_toggle_collapse(switchID) {
//     // 获取 checkbox 元素
//     const _switch = document.getElementById(switchID);
//     const button = document.querySelector(`[data-bs-toggle="collapse"][data-bs-target="#collapse-${switchID}"]`);
//     // 添加事件监听器
//     _switch.addEventListener("change", function () {
//         // 检查 checkbox 是否被选中
//         if (_switch.checked && (button.getAttribute('aria-expanded') == 'false')) {
//             // collapse_set('show', `collapse-` + elementID)

//             // 创建一个新的鼠标点击事件
//             var clickEvent = new MouseEvent("click");

//             // 分派点击事件到按钮元素
//             button.dispatchEvent(clickEvent);
//         }
//     });
// }
// // Switch切换卡片状态 End

// // Spinner可见切换 Start
// // 转移到card.js
// function toggle_spinner(status = 'hidden', element) {
//     /*
//     status: 'hidden', 'show'
//     element: 该spinner的父元素
//     */
//     let spanEl = $(element).children("span.spinner-border")
//     switch (status) {
//         case 'hidden':
//             if (!(spanEl.hasClass("visually-hidden"))) {
//                 spanEl.addClass("visually-hidden")
//             }
//             break;

//         case 'show':
//             if (spanEl.hasClass("visually-hidden")) {
//                 spanEl.removeClass("visually-hidden")
//             }
//             break

//         default:
//             break;
//     }
// };
// // Spinner可见切换 End

// 组成配置页 Start
// 第一部分 生成卡片 Start
function make_card(m) {

    //基础代码和标题部分
    /*
    let functionHTML = `
            <div id=card_${m.key} class="card">
            <div class="card-header">
                <h5 class="mb-0" > <input type="checkbox" class="switch" ${user_config[m.key] ? 'checked="checked"' : ""} id=${m.key} name=${m.key} onclick="checkboxOnclick(this)"  data-bs-toggle="collapse" data-bs-target="#${m.key}_config" /> ${m.name} 
            <button type="button" id=${m.key}_do_single name=${m.key} flag="run_once" class="btn btn-secondary" onclick="do_single(this)">单项执行</button>
        </h5>
            </div>
    `;
    */

    let moduleCardHTML = `<div class="card mt-2">
    <div class="card-header">
        <div class="hstack d-flex flex-wrap">
            <div class="hstack">
                <div class="d-flex justify-content-center align-items-center"><input class="form-check-input" type="checkbox" style="transform: scale(1.30);margin-top: 0;" /></div>
                <div class="vr mx-3"></div>
                <div class="d-flex justify-content-center align-items-center form-switch" style="padding: 0;margin-bottom: 0;">
                <input id=${m.key} class="form-check-input" type="checkbox" style="transform: scale(1.30);margin-left: 2px;margin-top: 0;" ${user_config[m.key] ? 'checked="checked"' : ""} name=${m.key} onclick="checkboxOnclick(this)" />
                </div>
            </div>
            <h5 style="margin: 0;margin-left: 12px;">${m.name}</h5>
            <div class="hstack gap-1 ms-auto" style="margin-right: -10px;">
                <button id=${m.key}_do_single class="btn btn-primary" type="button" onclick="do_single(this)" name=${m.name} key=${m.key} flag="run_once">
                <span class="spinner-border spinner-border-sm visually-hidden" aria-hidden="true" style="margin-right: 4px;"></span>执行此项</button>
            `;

    if (user_config[m.key]) {
        moduleCardHTML += `
        <button id=${m.key}_collapse_toggle class="btn btn-icon" type="button" style="border-style: none;" data-bs-toggle="collapse" data-bs-target="#collapse-${m.key}" aria-expanded="true" aria-controls="collapse-${m.key}" href="#collapse-${m.key}">
        <svg class="bi bi-chevron-up text-primary" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="transform: scale(1.30);transition: transform 0.35s ease;">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
        </svg></button>
        </div></div></div>
        <div id="collapse-${m.key}" class="vstack card-body collapse show p-0">`;

    } else {
        moduleCardHTML += `
        <button id=${m.key}_collapse_toggle class="btn btn-icon" type="button" style="border-style: none;" data-bs-toggle="collapse" data-bs-target="#collapse-${m.key}" aria-expanded="false" aria-controls="collapse-${m.key}" href="#collapse-${m.key}">
        <svg class="bi bi-chevron-up text-primary ${rotate_class_name}" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="transform: scale(1.30);transition: transform 0.35s ease;">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
        </svg></button>
        </div></div></div>
        <div id="collapse-${m.key}" class="vstack card-body collapse p-0">`;
    }

    moduleCardHTML += `<div class="d-flex justify-content-center" style="margin: var(--bs-card-spacer-y) var(--bs-card-spacer-x);">
    <div class="row d-flex flex-wrap w-100 gap-1">
        <div class="col" style="max-width: 40%;min-width: 20%;"><label class="form-label" style="font-weight: bold;">描述：</label>`;
    //描述部分
    /*
        if (m.description.length !== 0){
        functionHTML += `
            <div class="card-body">
                    ${m.description}
            </div>
            `
    }
    */

    if (m.description.length !== 0) {
        moduleCardHTML += `
                    <p class="mb-0">${m.description}</p>
            `;
    } else {
        moduleCardHTML += `
                    <p class="mb-0">无。</p>
            `;
    }

    //设置项部分
    /*
    if (Object.keys(m.config).length !== 0){
        functionHTML += `<div role="ul" class="list-group list-group-flush collapse ${user_config[m.key] ? 'show' : ''}" id=${m.key}_config } >`
        for (const key in m.config) {
            functionHTML += "<li class='list-group-item'>";
            functionHTML += generate_config_HTML(m.config[key]);
            functionHTML += "</li>";
        }
        functionHTML += "</div>"
    }
    */

    if (Object.keys(m.config).length !== 0) {
        moduleCardHTML += `
                    <hr class="w-100" style="margin: 10px 0;" /><label class="form-label" style="font-weight: bold;">设置项：</label>
                    <form class="form-item-spacing-1">
                    `;
        for (const key in m.config) {
            moduleCardHTML += `<div class="input-group flex-wrap input-group-sm">`;
            moduleCardHTML += generate_config_HTML(m.config[key]);
            moduleCardHTML += `</div>`
        }
        moduleCardHTML += `</form>`
    }
    moduleCardHTML += `</div>`

    //分割线部分
    moduleCardHTML += `<div class="col-auto p-0">
    <div class="vr h-100"></div>
    </div>`

    //执行结果部分
    /*
    functionHTML += `
        <div class="card-footer" id=${m.key}_result>
            无执行结果
        </div>
            </div>
    `;
    */
    // action.html版本
    moduleCardHTML += `<div class="col"><label class="form-label" style="font-weight: bold;">运行结果：</label>
    <small id=${m.key}_result_tag class="text-nowrap py-1 px-2 fw-semibold border rounded-2">null</small>
    <p id=${m.key}_result class="text-info-emphasis" style="margin-bottom: 0;">暂无运行结果。</p>
    </div>`;

    // info.html版本
    // moduleCardHTML += `<div class="col d-flex flex-column">
    // <div><label class="form-label" style="font-weight: bold;">运行结果：</label>
    // <small id=${m.key}_result_tag class="text-nowrap py-1 px-2 fw-semibold border rounded-2">null</small></div>
    // <div class="vstack">
    //     <form id=${m.key}_result class="h-100"><textarea class="form-control h-100" data-bs-toggle="tooltip" style="resize: none;" title="点击复制" readonly placeholder="运行结果"></textarea></form>
    // </div></div>`;

    //收尾div部分 4个
    moduleCardHTML += `</div></div></div></div>`;

    //单card完成
    return moduleCardHTML;

}
// 第一部分 生成卡片 End
// 第二部分 生成配置代码 Start
// 第二部分移动至card.js
// 第二部分 生成配置代码 End

// 第三部分 载入运行结果 Start
// 第三部分 1函数定义-结果Tag颜色及文本
// 已移动至card.js

// 第三部分 2函数定义-结果文本颜色
function set_result_color(status, element) {
    const classDict = {
        'success': `text-success-emphasis`,
        'info': `text-info-emphasis`,
        'warning': `text-warning-emphasis`,
        'error': `text-danger-emphasis`,
    }
    for (var key in classDict) {
        element.classList.remove(classDict[key]);
    }
    switch (status) {
        case "success":
            element.classList.add(classDict['success']);
            return
            break;
        case "skip":
            element.classList.add(classDict['info']);
            return
            break;
        case "abort":
            element.classList.add(classDict['warning']);
            return
            break;
        case "error":
            element.classList.add(classDict['error']);
            return
            break;
        default:
            element.classList.add(classDict['info']);
            return
            break;
    }

}

// // 第三部分 3.载入运行结果文本
function load_result(ret, key) {
    let objTag = $(`#${key}_result_tag`);
    let objResult = $(`#${key}_result`);
    // console.log(ret.hasOwnProperty(key))
    if (ret.hasOwnProperty(key)) {
        /*
        $(`#${key}_result`).html(ret[key]["log"].replace(/\n/g, '<br>'))
        $(`#${key}_result`).css("background-color", status_color(ret[key]['status']));
        */
        set_tag(ret[key]['status'], objTag[0]);
        set_result_color(ret[key]['status'], objResult[0]);
        objResult.html(ret[key]["log"].replace(/\n/g, '<br>'));
    } else {
        set_tag('skip', objTag[0]);
        set_result_color('skip', objResult[0]);
        objResult.html(`暂无运行结果。`);
    }
}
// // 第三部分 载入运行结果 End

// // 第四部分 事件函数
// // 以下均已移动至card.js
// // 点击时保存 Start
// function selectOnChange(e) {
//     /*
//     适用于time/int/single类型
//     */
//     const key = e.id;
//     let value = e.value;
//     if (isDigit(value))
//         value = parseInt(value);
//     user_config[key] = value;
//     $(`[name=${key}]`).val(value);
//     update_new();
// }
// // 点击时保存 End

// // 检查int Start
// function isDigit(str) {
//     for (var i = 0; i < str.length; i++) {
//         if (isNaN(parseInt(str[i]))) {
//             return false; // 包含非数字字符
//         }
//     }
//     return true; // 不包含非数字字符
// };
// // 检查int End

// // 点击时保存（多选 Start
// function selectMultiOnChange(e) {
//     /*
//     Multi类型专用
//     */
//     const key = e.id;
//     let value = Array.from(e.selectedOptions).map(option => option.value);
//     const intValue = value.map(option => parseInt(option))
//     if (intValue.length != 0 && !isNaN(intValue[0]))
//         value = intValue;
//     user_config[key] = value;
//     update_new();
// };
// // 点击时保存（多选 End

// // 点击时保存（checkbox Start
// function checkboxOnclick(checkbox) {
//     /*
//     适用于switch
//     */
//     const key = checkbox.id;
//     const value = checkbox.checked;
//     user_config[key] = value;
//     update_new();
// }
// // 点击时保存（checkbox End

// // 单项执行 Start
// function do_single(e) {
//     const flag = e.getAttribute('flag');
//     $(`[flag=${flag}]`).attr('disabled', true);
//     toggle_spinner('show', e);
//     // suspend("alert-info", "已开始执行。");
//     show_toast('info', `已开始执行“${e.name}”。`)
//     let config = {
//         config: user_config,
//         order: [e.key]
//     }
//     $.ajax({
//         url: '/daily/api/do_single' + window.location.search,
//         type: 'post',
//         contentType: "application/json;charset=utf-8",
//         data: JSON.stringify(config),
//         success: function (ret) {
//             load_results(ret.order, ret.result);
//             $(`[flag=${flag}]`).attr('disabled', false);
//             toggle_spinner('hidden', e);
//             // suspend("alert-success", "任务执行成功！");
//             show_toast('success', `“${e.name}”执行成功。`)
//         },
//         error: function (ret) {
//             // suspend("alert-danger", "执行任务失败: " + ret.responseText);
//             show_toast('error', `“${e.name}”执行失败。`, `${ret.responseText}`)
//             $(`[flag=${flag}]`).attr('disabled', false);
//             toggle_spinner('hidden', e);
//         }
//     })
// }
// // 单项执行 End

// // 全部执行 Start
// function do_task(e) {
//     const flag = e.getAttribute('flag');
//     $(`[flag=${flag}]`).attr('disabled', true);
//     toggle_spinner('show', e)
//     // suspend("alert-info", "已开始执行清日常任务。");
//     show_toast('info', `已开始执行清日常任务。`)
//     $.ajax({
//         url: '/daily/api/do_task' + window.location.search,
//         type: 'get',
//         processData: false,
//         success: function (ret) {
//             // <!-- prompt(JSON.stringify(ret), "alert-success", 60000); -->
//             // suspend("alert-success", "清日常任务执行完毕。");
//             show_toast('success', `清日常任务执行完毕。`)
//             toggle_spinner('hidden', e)
//             $(`[flag=${flag}]`).attr('disabled', false);
//             load_results(ret.order, ret.result);
//         },
//         error: function (ret) {
//             show_toast("error", "清日常任务执行失败。", `${ret.responseText}`);
//             toggle_spinner('hidden', e)
//             $(`[flag=${flag}]`).attr('disabled', false);
//         }
//     })
// }
// // 全部执行 End
// // 第三部分 事件函数 End