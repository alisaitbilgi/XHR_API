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
        else if(xhrObject.status >= 100 && xhrObject.status < 200)
          rej(xhrObject.status + ": Continue");
        else if(xhrObject.status >= 300 && xhrObject.status < 400)
          rej(xhrObject.status + ": Temporary Redirect");
        else if(xhrObject.status >= 400 && xhrObject.status < 500)
          rej(xhrObject.status + ": Not Found");
        else if(xhrObject.status >= 500 && xhrObject.status < 600)
          rej(xhrObject.status + ": Internal Server Error");
        else
          rej("Process Failed");
      };
    });
  }
};

module.exports = Request;
