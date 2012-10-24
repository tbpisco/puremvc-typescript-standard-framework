var puremvc;
(function (puremvc) {
    "use strict";
    var Model = (function () {
        function Model() {
            if(Model.instance) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = {
            };
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if(proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxyMap[proxyName] || null;
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        Model.SINGLETON_MSG = "Model Singleton already constructed!";
        Model.instance = null;
        Model.getInstance = function getInstance() {
            if(!Model.instance) {
                Model.instance = new Model();
            }
            return Model.instance;
        }
        return Model;
    })();
    puremvc.Model = Model;    
})(puremvc || (puremvc = {}));

