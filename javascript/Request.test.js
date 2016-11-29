"use strict";

const Request = require("./Request");
const sinon = require("sinon");

describe("Testing", () => {

  let open, send, temp, server, jsonObject;

  function xhrMockClass() {
    return {open, send};
  }

  describe(" Request.get() method over", () => {

    describe(" 1)XMLHttpRequest behaviours: the API should ", () => {

      beforeAll(() => {
        open = jest.fn();
        send = jest.fn();
        temp = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
      });

      afterAll(() => {
        window.XMLHttpRequest = temp;
      });

      it("create an XMLHttpRequest", () => {
        Request.get("whatever");
        expect(send).toHaveBeenCalled();
      });

      it("call an XMLHttpRequest with 'get' method and with given 'url' ", () => {
        Request.get("abc");
        expect(open).toHaveBeenCalledWith("GET", "abc", true);
      });

    });

    describe(" 2)a fake server, when it responses", () => {

      beforeAll(() => {
        jsonObject = {"aracArray": [{"YEAR": 2009, "CATEGORY": "coupe", "PRICE": 820000, "LPG": false}]};
        server = sinon.fakeServer.create();
      });

      afterAll(() => {
        server.restore();
      });

      describe("  successful: the API should return a", () => {

        it("'resolved' promise whose value is the server's response body", () => {
          server.respondWith("GET", "abc", [200, {"Content-Type": "text/javascript"}, '{ "id": 12, "comment": "Hey there" }']);
          const testResult = Request.get("abc").then(data => expect(data).toEqual('{ "id": 12, "comment": "Hey there" }'));
          server.respond();
          return testResult;
        });

      });

      describe("  not successful: the API should return a", () => {

        it("'rejected' promise whose value is '100: Continue' ", () => {
          server.respondWith([100, {"Content-Type": "text/javascript"}, "whatever"]);
          const testResult = Request.get("bla bla").catch(data => expect(data).toEqual("100: Continue"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '307: Temporary Redirect' ", () => {
          server.respondWith([307, {"Content-Type": "text/javascript"}, "-953"]);
          const testResult = Request.get("ect.").catch(data => expect(data).toEqual("307: Temporary Redirect"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '404: Not Found' ", () => {
          server.respondWith([404, {"Content-Type": "text/javascript"}, " {}"]);
          const testResult = Request.get("any").catch(data => expect(data).toEqual("404: Not Found"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '500: Internal Server Error' ", () => {
          server.respondWith([500, {"Content-Type": "text/javascript"}, "[]"]);
          const testResult = Request.get("null").catch(data => expect(data).toEqual("500: Internal Server Error"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is 'Process Failed' ", () => {
          server.respondWith([Math.floor((Math.random() * 1000) + 600), {"Content-Type": "text/javascript"}, "?*/"]);
          const testResult = Request.get("whatever").catch(data => expect(data).toEqual("Process Failed"));
          server.respond();
          return testResult;
        });

      });
    });
  });

  describe(" Request.post() method over ", () => {

    describe(" 1)XMLHttpRequest behaviours: the API should ", () => {

      beforeAll(() => {
        open = jest.fn();
        send = jest.fn();
        temp = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
      });

      afterAll(() => {
        window.XMLHttpRequest = temp;
      });

      it("should create an XMLHttpRequest", () => {
        Request.post("whatever", "smth");
        expect(send).toBeCalled();
      });

      it("should call an XMLHttpRequest with 'POST' method and with given 'url' ", () => {
        Request.post("whatever", "smth");
        expect(open).toBeCalledWith("POST", "whatever", true);
      });

    });

    describe(" 2)a fake server, when it responses", () => {

      beforeAll(() => {
        jsonObject = {"aracArray": [{"YEAR": 2009, "CATEGORY": "coupe", "PRICE": 820000, "LPG": false}]};
        server = sinon.fakeServer.create();
      });

      afterAll(() => {
        server.restore();
      });

      describe("  successful: the API should return a", () => {

        it("'resolved' promise whose value is the data which is posted", () => {
          server.respondWith("POST", "abc", [200, {"Content-Type": "text/javascript"}, "SUCCESS"]);
          const testResult = Request.post("abc", jsonObject)
            .then(data => expect(data).toEqual({"aracArray": [{"YEAR": 2009, "CATEGORY": "coupe", "PRICE": 820000, "LPG": false}]}));
          server.respond();
          return testResult;
        });

      });

      describe("  not successful: the API should return a", () => {

        it("'rejected' promise whose value is '100: Continue' ", () => {
          server.respondWith("POST", "whatever", [100, {"Content-Type": "text/javascript"}, "whatever"]);
          const testResult = Request.post("whatever", "something").catch(data => expect(data).toEqual("100: Continue"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '307: Temporary Redirect' ", () => {
          server.respondWith("POST", "somewhere", [307, {"Content-Type": "text/javascript"}, "something"]);
          const testResult = Request.post("somewhere", 555).catch(data => expect(data).toEqual("307: Temporary Redirect"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '404: Not Found' ", () => {
          server.respondWith("POST", "goooogle.kom", [404, {"Content-Type": "text/javascript"}, "  "]);
          const testResult = Request.post("goooogle.kom", [5, 6]).catch(data => expect(data).toEqual("404: Not Found"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is '500: Internal Server Error' ", () => {
          server.respondWith("POST", "feysbuk", [500, {"Content-Type": "text/javascript"}, "No matter the response"]);
          const testResult = Request.post("feysbuk", {}).catch(data => expect(data).toEqual("500: Internal Server Error"));
          server.respond();
          return testResult;
        });

        it("'rejected' promise whose value is 'Process Failed' ", () => {
          server.respondWith("POST", "teveter", [Math.floor((Math.random() * 1000) + 600), {"Content-Type": "text/javascript"}, "?*/"]);
          const testResult = Request.post("teveter", "?/*").catch(data => expect(data).toEqual("Process Failed"));
          server.respond();
          return testResult;
        });

      });
    });
  });

});


