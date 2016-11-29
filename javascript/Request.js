"use strict";

const Request = {
  get: function (url) {
    return new Promise((res, rej) => {
      const xhrObject = new XMLHttpRequest();
      xhrObject.open("GET", url, true);
      xhrObject.send();
      xhrObject.onreadystatechange = function() {
        const status = xhrObject.status;
        if(status >= 200 && status < 300) {
          if(xhrObject.readyState === 4)
            res(xhrObject.response);
        }
        else if(status >= 100 && status < 200)
          rej(status + ": Continue");
        else if(status >= 300 && status < 400)
          rej(status + ": Temporary Redirect");
        else if(status >= 400 && status < 500)
          rej(status + ": Not Found");
        else if(status >= 500 && status < 600)
          rej(status + ": Internal Server Error");
        else
          rej("Process Failed");
      };
    });
  },

  post: function (url, data) {
    return new Promise((res, rej) => {
      const xhrObject = new XMLHttpRequest();
      xhrObject.open("POST", url, true);
      xhrObject.send(data);
      xhrObject.onreadystatechange = function() {
        const status = xhrObject.status;
        if(xhrObject.status >= 200 && xhrObject.status < 300) {
          if(xhrObject.readyState === 4)
            res(data);
        }
        else if(status >= 100 && status < 200)
          rej(status + ": Continue");
        else if(status >= 300 && status < 400)
          rej(status + ": Temporary Redirect");
        else if(status >= 400 && status < 500)
          rej(status + ": Not Found");
        else if(status >= 500 && status < 600)
          rej(status + ": Internal Server Error");
        else
          rej("Process Failed");
      };
    });
  }
};

module.exports = Request;
