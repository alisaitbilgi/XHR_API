"use strict";

const Request = require("./myMethod");
const sinon = require("sinon");

describe("get method tests", () => {

  describe("Testing Request.get() method over XMLHttpRequest behaviours ", () => {
    const open = jest.fn();
    const send = jest.fn();
    const xhrMockClass = function () {
      return {
        open,
        send
      };
    };
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    it("should create an XMLHttpRequest", () => {
      Request.get("whatever");
      expect(send).toBeCalled();
    });

    it("should call an XMLHttpRequest with 'get' method and given 'url' ", () => {
      Request.get("abc");
      expect(open).toBeCalledWith("GET", "abc", true);
    });

  });

  describe("Testing Request.get() method over a fake server which responses differently", () => {
    let server;
    let i = 0;
    let httpStatusCode = [];

    beforeEach(() => {
      switch (i) {
        case 0 :
          httpStatusCode[i] = 200;
          break;
        case 1 :
          httpStatusCode[i] = 100;
          break;
        case 2 :
          httpStatusCode[i] = 307;
          break;
        case 3 :
          httpStatusCode[i] = 404;
          break;
        case 4 :
          httpStatusCode[i] = 500;
          break;
        default:
          httpStatusCode[i] = Math.floor((Math.random() * 400) + 600);
          break;
      }
      server = sinon.fakeServer.create();
      server.respondWith("GET", "abc", [httpStatusCode[i], {"Content-Type": "text/javascript"}, '{ "id": 12, "comment": "Hey there" }']);
      i++;
    });

    afterEach(() => {
      server.restore();
    });

    it("should return a 'resolved' promise whose value is the server's response body", () => {
      return new Promise(resolve => {
        Request.get("abc")
          .then(result => {
            resolve(result);
          });
        server.respond();
      }).then(data => expect(data).toEqual('{ "id": 12, "comment": "Hey there" }'));
    });

    it("should return a 'rejected' promise whose value is '100: Continue' ", () => {
      return new Promise((resolve, reject) => {
        Request.get("abc")
          .catch(result => {
            reject(result);
          });
        server.respond();
      }).catch(data => expect(data).toEqual("100: Continue"));
    });

    it("should return a 'rejected' promise whose value is '307: Temporary Redirect' ", () => {
      return new Promise((resolve, reject) => {
        Request.get("abc")
          .catch(result => {
            reject(result);
          });
        server.respond();
      }).catch(data => expect(data).toEqual("307: Temporary Redirect"));
    });

    it("should return a 'rejected' promise whose value is '404 Not Found' ", () => {
      return new Promise((resolve, reject) => {
        Request.get("abc")
          .catch(result => {
            reject(result);
          });
        server.respond();
      }).catch(data => expect(data).toEqual("404: Not Found"));
    });

    it("should return a 'rejected' promise whose value is '500: Internal Server Error' ", () => {
      return new Promise((resolve, reject) => {
        Request.get("abc")
          .catch(result => {
            reject(result);
          });
        server.respond();
      }).catch(data => expect(data).toEqual("500: Internal Server Error"));
    });

    it("should return a 'rejected' promise whose value is 'Process Failed' ", () => {
      return new Promise((resolve, reject) => {
        Request.get("abc")
          .catch(result => {
            reject(result);
          });
        server.respond();
      }).catch(data => expect(data).toEqual("Process Failed"));
    });

  });
});
