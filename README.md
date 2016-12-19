# Apiary Console with seed proof of concept

## What's up?

This is a componend meant to act as a proxy between a website and a real server
to overcome some limitations webservers have even if using CORS headers.

## Context

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

### Usage in your application
Fundamentally all we have here is a React component that should be dropped into
your application - it will take care of establishing a connection and provide
a method to forward your requests throught the seed.

```javascript
Seed.propTypes = {
  baseUrl: React.PropTypes.string.isRequired,
  scope: React.PropTypes.string.isRequired,
  onReady: React.PropTypes.func
};
```

`baseUrl`: The URL where the seed page is being served. This should actually be
on a customer domain, possibly under the same domain where the requests will land.

`scope`: An indentification string that *MUST* match with the one provided on the
serving page.

`onReady`: Callback called once actual communication has been established between
the parent page and child frame. If the child frame hadn't set up its end of the
channel, for instance, `onReady` would never get called.

Once you've rendered an instance of the component, you can send requests throught
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

### Usage for development

1. Clone the repository
2. `npm install`
3. Go to the `client` directory and `npm install`
4. Go back and `npm start`

### Deploy
1. Push the current repo somewhere (heroku?)
2. Go to the `client` directory and `npm run deploy`. You might need access to the Firebase free account

#### Faster deploy
1. `npm run deploy` (if you have all the things set up)

### How is this working internally?

#### Backend server
- Host a new HTML [page][1] linking the provided [script][2]
- Enjoy

#### Client
- Creates a new invisible `iframe` tag, and host the backend provided page
- Creates a communication channel using the [JSChannel][5]
- When you have to send a request, serialise it and send it to the port.
- Wait for the response and react accordingly.

## Cavetas - Limitations
1. There's an important foreword I'm doing here: I'm assuming that the payload I
want to send on the wire is serialisable. I should verify that.

2. Also - I'm assuming all errors and responses that are coming from the
Http server are serialisable as well. If not, we're screwed up.

## Security considerations
1. [Subresource Integrity][6]
2. Verified `iframe` origin
3. Always verify the syntax of the received message (it's done for us by [JSChannel][3])

[1]: https://github.com/apiaryio/apiary-console-seed/blob/master/serve-seed.ejs
[2]: https://github.com/apiaryio/apiary-console-seed/blob/master/client/public/apiary-customer-seed.js
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[5]: https://github.com/mozilla/jschannel
[6]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
[7]: https://github.com/mzabriskie/axios#request-config
[8]: https://github.com/apiaryio/node-hamms
[9]: https://github.com/mzabriskie/axios#response-schema
