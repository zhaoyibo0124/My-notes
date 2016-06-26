/*登录*/
(function login() {
    var tel = document.getElementById("tel");
    var remindps = document.getElementById("remindps");
    tel.onclick = function () {
        if (!tel.value) {
            remindps.innerHTML = "请输入邮箱/手机号"
        } else {
            remindps.innerHTML = ""
            var str = tel.innerHTML;
            var reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!reg.test(str)) {
                remindps.innerHTML = "输入错误"
            }
        }
    };

})();