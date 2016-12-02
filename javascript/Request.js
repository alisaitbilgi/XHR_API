"use strict";

const handler = {
  get: function (target, name) {
    return name in target ? target[name] : function (url, data) {
      let method = name.toUpperCase();
      if (!data)
        data = null;
      if(!url)
        url = "";
      return new Promise((res, rej) => {
        const xhrObject = new XMLHttpRequest();
        xhrObject.open(method, url, true);
        xhrObject.send(data);
        xhrObject.onload = function () {
          let responseObject = {
            RequestURL: url,
            RequestMethod: method,
            StatusCode: xhrObject.status,
            RequestPayload: data
          };

          if (data === null)
            delete responseObject.RequestPayload;

          if (xhrObject.status >= 200 && xhrObject.status < 300) {
            res(responseObject);
          }
          else if (xhrObject.status >= 400)
            rej("404 Not Found");
          else
            rej("Process Failed " + xhrObject.status);
        };
        xhrObject.onerror = function (e) {
          rej("There is a failure on the network level");
        };
      });
    };
  }
};
const Request = new Proxy({}, handler);

module.exports = Request;
