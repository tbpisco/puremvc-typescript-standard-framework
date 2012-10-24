var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var puremvc;
(function (puremvc) {
    "use strict";
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
            if (typeof proxyName === "undefined") { proxyName = null; }
            if (typeof data === "undefined") { data = null; }
                _super.call(this);
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if(data != null) {
                this.setData(data);
            }
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.NAME = 'Proxy';
        return Proxy;
    })(puremvc.Notifier);
    puremvc.Proxy = Proxy;    
})(puremvc || (puremvc = {}));

