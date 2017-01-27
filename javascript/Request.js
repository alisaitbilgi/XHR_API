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
          let responseObject = {
            RequestURL: url,
            RequestMethod: method,
            StatusCode: xhr.status,
            RequestPayload: data
          };

          if (data === null)
            delete responseObject.RequestPayload;
          
          if (xhr.status >= 200 && xhr.status < 300)
            res(responseObject);
         
          else if (xhr.status >= 400)
            rej("404 Not Found");
          
          else
            rej("Process Failed " + xhr.status);
        };
        xhr.onerror = function (e) {
          rej("There is a failure on the network level");
        };
      });
    };
  }
};
const Request = new Proxy({}, handler);

module.exports = Request;
