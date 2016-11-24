"use strict";

const Request = require("./Request");
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

    beforeEach(() => {
      server = sinon.fakeServer.create();
    });

    afterEach(() => {
      server.restore();
    });

    it("should return a 'resolved' promise whose value is the server's response body", () => {
      server.respondWith("GET", "abc", [200, {"Content-Type": "text/javascript"}, '{ "id": 12, "comment": "Hey there" }']);
      const testResult = Request.get("abc").then(data => expect(data).toEqual('{ "id": 12, "comment": "Hey there" }'));
      server.respond();
      return testResult;
    });

    it("should return a 'rejected' promise whose value is '100: Continue' ", () => {
      server.respondWith([100, {"Content-Type": "text/javascript"}, "whatever"]);
      const testResult = Request.get("bla bla").catch(data => expect(data).toEqual("100: Continue"));
      server.respond();
      return testResult;
    });

    it("should return a 'rejected' promise whose value is '307: Temporary Redirect' ", () => {
      server.respondWith([307, {"Content-Type": "text/javascript"}, "something"]);
      const testResult = Request.get("ect.").catch(data => expect(data).toEqual("307: Temporary Redirect"));
      server.respond();
      return testResult;
    });

    it("should return a 'rejected' promise whose value is '404: Not Found' ", () => {
      server.respondWith([404, {"Content-Type": "text/javascript"}, "  "]);
      const testResult = Request.get("any").catch(data => expect(data).toEqual("404: Not Found"));
      server.respond();
      return testResult;
    });

    it("should return a 'rejected' promise whose value is '500: Internal Server Error' ", () => {
      server.respondWith([500, {"Content-Type": "text/javascript"}, "bla bla"]);
      const testResult = Request.get("null").catch(data => expect(data).toEqual("500: Internal Server Error"));
      server.respond();
      return testResult;
    });

    it("should return a 'rejected' promise whose value is 'Process Failed' ", () => {
      server.respondWith([Math.floor((Math.random() * 1000) + 600), {"Content-Type": "text/javascript"}, "?*/"]);
      const testResult = Request.get("whatever").catch(data => expect(data).toEqual("Process Failed"));
      server.respond();
      return testResult;
    });

  });
});
