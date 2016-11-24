In this work, I've implemented a Request object which has 2 methods, "get" and "post" that returns a new promise 
according to response's of the requests. By implementing this, I've aimed to provide a practical usage of XMLHttpRequest 
and promises. When it's typed  'Request.get(url)' or 'Request.post(url,data)' the API fetchs/posts the related data asynchronously from/to this url and returns a resolved promise with the value of responded data if the process is successful. If not, the API returns a rejected promise with the value of failing reason.
To use this, just download the repo and then type npm install on terminal..
