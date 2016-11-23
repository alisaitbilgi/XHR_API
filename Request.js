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
            res("The process ", url, "is done");
        }
        else if(xhrObject.status >= 400)
          rej("Error: ", url, xhrObject.status);
        else
          rej("Not OK!");
      };
    });
  }
};
