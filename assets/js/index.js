// const flag = 'olo'
// 账号注册 Start
function register() {
    document.getElementById('card-index').style.pointerEvents = 'none';
    // $(`[flag=${flag}]`).attr('disabled', true);
    $.ajax({
        url: "/daily/api/config?account=" + $("#account").val(),
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            username: "",
            password: "",
            alian: "",
            qq: ""
        }),
        processData: false,
        success: function (ret) {
            alert("注册成功。")
            login();
        },
        error: function (ret) {
            alert(ret.responseText);
            document.getElementById('card-index').style.pointerEvents = 'auto';
        }
    });
}
// 账号注册 End
// 账号登录 Start
function login() {
    document.getElementById('card-index').style.pointerEvents = 'none';
    let account = $("#account").val()
    $.ajax({
        url: "/daily/api/login?account=" + account,
        type: "get",
        processData: false,
        success: function (ret) {
            window.location.href = "/daily/config.html?account=" + account;
        },
        error: function (ret) {
            alert("账号无效或不存在，第一次使用请先注册。\n如需帮助，请联系管理员。\n" + ret.responseText);
            document.getElementById('card-index').style.pointerEvents = 'auto';
        }
    });
    // window.location.href = "/daily/config.html?account=" + $("#account").val();
}
// 账号登录 End
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        login();
    }
});