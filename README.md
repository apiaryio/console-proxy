# Apiary seed component

**Warning**: This repo is being actively developed - therefore breaking API changes,
as well concept and architecture revolutions might happen.

## What's up?

This is a componend meant to act as a proxy between a website and a real server
to overcome some limitations webservers have even if using CORS headers.

## Context

We all know that, when making http calls from the browser to a server, we will
have access to reduced set of headers due to security restrictions.

First of all, you can only access the custom headers you actually sent in the
request. Any additional header added by the browser is (justly) not accesible.

Moreover, when the request is coming back from the server, the range of headers
you can actually access from the code is a reduces set dictated by the
`Access-Control-Allow-Headers` header.

Fundamentally, if you want to inspect the things on the client side, you have
to configure your server to whitelist the headers (and keep that list updated).

Things are different if your request is being performed when you are in the same
domain. In this case the security is *relaxed* and you get more informations. Not
all of them (browser sent headers won't be accessible anyway), but you get more.

Starting from this thought, the idea behind this demo is to show that, if the
*server side guys* would be willing to host a small `html` [page][1] which would
simply contain a script reference, we can make the toy work as if I would be
making the request from the same domain.

## Details

**Note:** The published package is in the `client` directory. All the other things
here are merely as a playground infrastructure. Also, the only files you'd probably
be interested in are `Seed.js` and `apiary-proxy-source.js`

### Usage in your application
Fundamentally all we have here is a React component that should be dropped into
your application - it will take care of establishing a connection and provide
a method to forward your requests throught the seed.

```javascript
Seed.propTypes = {
  seedUrl: React.PropTypes.string.isRequired,
  origin: React.PropTypes.string,
  scope: React.PropTypes.string,
  debugOutput: React.PropTypes.bool,
  onReady: React.PropTypes.func
};
```

`seedUrl`: The URL where the seed page is being served. This should actually be
on a customer domain, possibly under the same domain where the requests will land.
If the value does not start nor with `http:` nor with `https:`, then the component
will take the value as the Chrome extension ID it should be communicate with.

`origin`: The origin of the requests. This might be useful if you want to make sure
that only matching origins will answer the messages. Ignored when `seedUrl` is null,
as the Chrome extension provides its own origin specification and verification
in the manifest file.

`scope`: An indentification string that *MUST* match with the one provided on the
serving page. Ignored when `seedUrl` is null, as the Chrome extension provides its
 own scope specification and verification in the manifest file.

`debugOutput`: Whether you want or not to output logs from `jschannel` library)

`onReady`: Callback called once actual communication has been established between
the parent page and child frame, with an `Error` object passed if something went
wrong during the process. In case of Chrome extension, it will return an error
object with the actual `window.chrome.runtime.lastError`

Once you've "rendered" an instance of the component, you can send requests throught
its instance method `request`. In order to use it, you might want to save the
component instance using the `ref` property provided by `React`

```javascript
const promise = seed.request(requestOptions);
```

Where `requestOptions` is an [Axios Request Config][7] object. Axios is the
underlying http client used by this component as it's the most complete,
compliant and fault tolerant we found so far. If you're interested more, we've
been testing it a lot on different http edge cases. You can have a look to
[node-hamms][8] repository

The returned promise will resolve with an [Axios Response Object][9], or rejected
with an error, if any occurs during the operation

### Low level method

If you need to pass a generic message to _the other side_ (whether it's the iframe
or the Chrome extension) you can use the lower lever `sendMessage` method.

```javascript
const promise = seed.sendMessage({method, params});
```

- `method`: The method name you would like to call on _the other side_

- `params`: The params that will be passed to that method.

### Usage for development

1. Clone the repository
2. `npm install`
3. Go to the `client` directory and `npm install`
4. Go back and `npm start`


[1]: https://github.com/apiaryio/apiary-console-seed/blob/master/serve-seed.ejs
[2]: https://github.com/apiaryio/apiary-console-seed/blob/master/client/public/apiary-customer-seed.js
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[5]: https://github.com/mozilla/jschannel
[6]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
[7]: https://github.com/mzabriskie/axios#request-config
[8]: https://github.com/apiaryio/node-hamms
[9]: https://github.com/mzabriskie/axios#response-schema
