"use strict";

const Request = require("./myMethod");
const sinon = require("sinon");


describe("Testing Request.get() method...", () => {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondWith("GET", "abc", [200, {"Content-Type": "text/javascript"}, '{ "id": 12, "comment": "Hey there" }']);
  });

  afterEach(() => {
    server.restore();
  });

  it("should return a resolved promise whose value is server's response body", () => {
    return new Promise(resolve => {
      Request.get("abc")
        .then(result => {
          resolve(result);
        });
      server.respond();
    }).then(data => expect(data).toEqual('{ "id": 12, "comment": "Hey there" }'));
  });

  it("should return a rejected promise whose value is reason of the failure", () => {
    return new Promise((resolve, reject) => {
      Request.get("gh")
        .catch(result => {
          reject(result);
        });
      server.respond();
    }).catch(data => expect(data).toEqual("404 Not Found"));
  });

});
