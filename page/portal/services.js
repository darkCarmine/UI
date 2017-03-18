define(["router"], function (router) {
    router.service("rememberMe", function () {
        this.setCookie = function (name, value) {
            var Days = 30; 
            var exp = new Date(); 
            exp.setTime(exp.getTime() + Days*24*60*60*1000); 
            document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString(); 
        };
        this.getCookie = function (name) {
            var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg))       
                return unescape(arr[2]); 
            else 
                return null; 
        };
    });

    router.service("authService", ["rememberMe", function (rememberMe) {
        this.isAuthenticated = false;
        this.setLogin = function () {
            this.isAuthenticated = true;
            rememberMe.setCookie("isAuthenticated", true);
        };
    }]);
});