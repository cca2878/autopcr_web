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
    // moduleCardHTML += `<div class="col"><label class="form-label" style="font-weight: bold;">运行结果：</label>
    // <small id=${m.key}_result_tag class="text-nowrap py-1 px-2 fw-semibold border rounded-2">null</small>
    // <p id=${m.key}_result class="text-info-emphasis" style="margin-bottom: 0;">暂无运行结果。</p>
    // </div>`;

    // info.html版本
    moduleCardHTML += `<div class="col d-flex flex-column">
    <div><label class="form-label" style="font-weight: bold;">运行结果：</label>
    <small id=${m.key}_result_tag class="text-nowrap py-1 px-2 fw-semibold border rounded-2">null</small></div>
    <div class="vstack">
        <form class="h-100">
        <textarea id=${m.key}_result class="form-control h-100" data-bs-toggle="tooltip" style="resize: none;" title="点击复制" readonly placeholder="运行结果" onclick="copy_val(this)"></textarea>
        </form>
    </div></div>`;

    //收尾div部分 4个
    moduleCardHTML += `</div></div></div></div>`;

    //单card完成
    return moduleCardHTML;

}
// 第一部分 生成卡片 End

// 第三部分 3.载入运行结果文本
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
        // set_result_color(ret[key]['status'], objResult[0]);
        objResult.val(ret[key]["log"]);
    } else {
        set_tag('skip', objTag[0]);
        // set_result_color('skip', objResult[0]);
        objResult.val(`暂无运行结果。`);
    }
}
// 第三部分 载入运行结果 End

// 写入剪贴板 Start
function copy_val(e) {
    // var copyText = document.getElementById("msg");
    e.select();
    e.setSelectionRange(0, 999999); /* 兼容移动设备 */
    navigator.clipboard.writeText($(e).val())
    // document.execCommand("copy");
    // suspend("alert-success", "内容已复制到剪贴板！");
    show_toast('success', "内容已复制到剪贴板。")
    }
// 写入剪贴板 End