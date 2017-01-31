"use strict";

const handler = {
    get: function (target, name) {
        return name in target ? target[name] : function (url="", data) {
                let method = name.toUpperCase();
                return new Promise((res, rej) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, url, true);
                    xhr.send(data);
                    xhr.onload = function () {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            res(xhr.response);
                        } else if (xhr.status >= 400) {
                            res(xhr.response);
                        } else {
                            res(xhr.response);
                        }
                    };
                    xhr.onerror = function (e) {
                        rej(new Error(e));
                    };
                });
            };
    }
};

const Request = new Proxy({}, handler);

module.exports = {Request};
