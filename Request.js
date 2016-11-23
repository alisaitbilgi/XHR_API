"use strict";

const Request = {
  get: function (url) {
    return new Promise((res, rej) => {
      let xhrObject = new XMLHttpRequest();
      xhrObject.open("GET", url, true);
      xhrObject.send();
      xhrObject.onreadystatechange = function() {
        if(xhrObject.status >= 200 && xhrObject.status < 300) {
          if(xhrObject.readyState === 4)
            res(xhrObject.response);
        }
        else if(xhrObject.status === 404)
          rej("404 Not Found");
        else
          rej("fail");
      };
    });
  }
};

module.exports = Request;
