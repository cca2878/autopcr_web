const iframeActionID = 'iframe-action'
const iframeInfoID = 'iframe-info'
const toastContainerID = 'toast-container-1'
const configFormID = ['form-normal-config', 'form-account-config'];

// 载入信息 Start
$(document).ready(function () {
    $(`#${iframeActionID}`).attr('src', 'action.html' + window.location.search);
    $(`#${iframeInfoID}`).attr('src', 'info.html' + window.location.search);
    $.ajax({
        url: `/daily/api/${jinjaUrlConfig}` + window.location.search,
        type: "get",
        processData: false,
        success: function (ret) {
            // let ta_tab = $("#module");
            $("#input-alian").val(ret.alian);
            $("#input-qqnum").val(ret.qq);
            $("#input-uname").val(ret.username);
            $("#input-upwd").val(ret.password);

            // result = ret.last_result;
            user_config = ret.config;
            // const data = ret.data;
            // const module = ret.order;

            // for (let i = 0; i < module.length; ++i) {
            //     let val = data[module[i]];

            //     ta_tab.append(make_card(val)); //添加一列
            // }

            // for (let key in share_key){
            //     if (share_key[key] > 1){
            //         $(`[name=${key}]`).css({
            //             'border-color': get_random_color(),
            //             'border-width': "3px"
            //         });
            //     }
            // }

            // load_results(module, result);
            if (ret.username || ret.alian) {
                $("#tab-main a[href='#tab-2']").tab("show");
            } else {
                $("tab-main a[href='#tab-1']").tab("show");
            }
        },
        error: function (ret) {
            show_toast('error', '获取配置失败。', `${ret.responseText}`);
            // suspend("alert-danger", "获取配置失败");
        },
    });
}
);
// 载入信息 End

// 动态设置iframe高度 Start
function updateElementHeight() {
    var viewportHeight = window.innerHeight;
    var elementPos = document.getElementById('tab-items').getBoundingClientRect().bottom;
    var result = viewportHeight - elementPos - 73;
    document.getElementById(iframeActionID).style.height = result + 'px';
    document.getElementById(iframeInfoID).style.height = result + 'px';
}
window.onresize = updateElementHeight;
window.onload = updateElementHeight;
// 动态设置iframe高度 End

// iframe暗黑模式切换 Start
var themeDropdownItems = document.querySelectorAll("#themeDropdown + .dropdown-menu a");
var childWindowAction = $(`#${iframeActionID}`)[0].contentWindow;
var childWindowInfo = $(`#${iframeInfoID}`)[0].contentWindow;

themeDropdownItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
        var themeValue = this.getAttribute("data-bs-theme-value");
        childWindowAction.document.body.setAttribute("data-bs-theme", themeValue);
        childWindowInfo.document.body.setAttribute("data-bs-theme", themeValue);
    });
});
// iframe暗黑模式切换 End

// $(document).ready(function () {
//     $(`#${iframeActionID}`).attr('src', 'action.html' + window.location.search);
//     $(`#${iframeInfoID}`).attr('src', 'info.html' + window.location.search);
// });
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

// Toast函数 Start
function show_toast(status, text, desc = null) {
    const classDict = {
        'success': [`text-success-emphasis`, `bg-success-subtle`, `border-success-subtle`],
        'info': [`text-info-emphasis`, `bg-info-subtle`, `border-info-subtle`],
        'warning': [`text-warning-emphasis`, `bg-warning-subtle`, `border-warning-subtle`],
        'error': [`text-danger-emphasis`, `bg-danger-subtle`, `border-danger-subtle`],
    }
    let date = new Date();
    if (desc != null) {
        desc = desc.replace(/\n/g, '<br>')
        var res = `<div id="toast" class="toast" role="alert">
        <div class="toast-header">
        <strong class="me-auto">${text}</strong>
        <small>${date.toLocaleTimeString('en-US', { hour12: false })}</small>
        <button class="btn-close ms-2 mb-1 close" type="button" aria-label="Close" data-bs-dismiss="toast"></button></div>
        <div class="toast-body" role="alert">
        <p>${desc}</p>
        </div></div>`
    } else {
        var res = `<div id="toast" class="toast" role="alert">
        <div class="toast-body d-flex align-items-center" role="alert" style="padding: var(--bs-toast-padding-y) var(--bs-toast-padding-x);">
        <strong class="me-auto">${text}</strong>
        <small>${date.toLocaleTimeString('en-US', { hour12: false })}</small>
        <button class="btn-close ms-2 mb-1 close" type="button" aria-label="Close" data-bs-dismiss="toast" style="margin-right: calc(-.5 * var(--bs-toast-padding-x));"></button>
        </div></div>`;
    }


    if (status in classDict) {
        var classNames = classDict[status];
    } else {
        var classNames = classDict['info'];
    }

    let parser = new DOMParser();
    let toastElement = parser.parseFromString(res, 'text/html').getElementById('toast');
    for (let i = 0; i < classNames.length; i++) {
        toastElement.classList.add(classNames[i]);
    }
    document.getElementById(toastContainerID).appendChild(toastElement);
    let toast = new bootstrap.Toast(toastElement);
    toast.show()
    toastElement.addEventListener('hidden.bs.toast', function () {
        toastElement.parentNode.removeChild(toastElement);
    });
}
// Toast函数 End

// 删除账号函数 Start
function delete_config() {
    let element = $("#delete_config")
    // var confirmed = confirm('确定要删除该账号？该操作不可撤销！');
    element.attr('disabled', true);
    toggle_spinner('show', element[0])
    // suspend("alert-info", "已开始执行任务。");
    $.ajax({
        url: '/daily/api/config' + window.location.search,
        type: 'delete',
        processData: false,
        success: function (ret) {
            // suspend("alert-success", "删除账号成功！");
            show_toast('success', "删除账号成功。")
            toggle_spinner('hidden', element[0])
            window.location.href = "/daily/";
        },
        error: function (ret) {
            // suspend("alert-danger", "删除账号失败: " + ret.responseText);
            show_toast('error', "删除账号失败。", ret.responseText)
            toggle_spinner('hidden', element[0])
            element.attr('disabled', false);
        }
    })

}
// 删除账号函数 End

// 修改账号配置 Start
function update_new() {
    let config = {}; // 可以用referrer解决问题
    // id = 1;
    document.getElementById('main-tab-content').style.pointerEvents = 'none';
    config['alian'] = $("#input-alian").val();
    config['qq'] = $("#input-qqnum").val();
    config['username'] = $("#input-uname").val();
    config['password'] = $("#input-upwd").val();
    config['config'] = user_config;

    $.ajax({
        url: `/daily/api/${jinjaUrlConfig}` + window.location.search,
        type: "put",
        data: JSON.stringify(config),
        contentType: "application/json;charset=utf-8",
        processData: false,
        success: function (ret) {
            if (ret.statusCode == 200) {
                // suspend("alert-success", ret.message);
                document.getElementById('main-tab-content').style.pointerEvents = 'auto';
                show_toast('success', '本次修改保存成功。')
            } else {
                // alert("本次修改保存失败：" + ret.message + "\n如有需要，请联系管理员\n点击确定将为您刷新页面");
                show_toast('error', '本次修改保存失败。', `将于三秒后刷新页面，如有需要请联系管理员。\n${ret.message}`);
                setTimeout(function() {
                    location.reload(true);
                }, 3000);
            }
        },
        error: function (ret) {
            show_toast('error', '本次修改保存失败。', `将于三秒后刷新页面，如有需要请联系管理员。\n${ret.message}`);
            setTimeout(function() {
                location.reload(true);
            }, 3000);
        },
    });
}
// 修改账号配置 End
// config表单重置 Start
function reset_config_form() {
    configFormID.forEach(function (item) {
        document.getElementById(item).reset();
    });
}
// config表单重置 End
// // 测试函数
// function test() {
//     document.getElementById('main-tab-content').style.pointerEvents = 'none';
//     setTimeout(function() {
//         document.getElementById('main-tab-content').style.pointerEvents = 'auto';
//     }, 3000);
// }