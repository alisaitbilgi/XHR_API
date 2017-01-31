   
   In this work, I've implemented a Request object which is a 'proxy object' that returns a promise 
according to response's of the requests. You can easly make an asynchronous request by using any http verbs with my Request proxy object by just typing for instance Request.head(param1, param2) or Request.put(param1, param2) or any other http verbs.
Two parameters are optional, you can type any number of and any types of parameters according to your request needs. For general usage parameters refers to: param1 = url  ,  param2 = data.
   
   By implementing this, I've aimed to provide a practical usage of XMLHttpRequest and promises. When it's typed  'Request.get(url)' or 'Request.post(url,data)' or any others, the API fetches/posts the related data asynchronously from/to given url and returns a resolved promise with the value of responded data if the process is successful. If not, the API returns a rejected promise whose value is the reason of the failure.

Tests which are implemented by using JEST framework, stays in Request.test.js file.

To use this API, just download the repo and apply to your related project.
