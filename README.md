# Apiary Console with seed proof of concept

## What's up?

This repository is a simple proof of concept proving that using an `iframe` as
intermediary in Http calls from the browser is possible.

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

### Usage

1. Clone the repository
2. `npm install`
3. Go to the `client` directory and `npm install`
4. Go back and `npm start`

### Deploy
1. Push the current repo somewhere (heroku?)
2. Go to the `client` directory and `npm deploy`. You might need access to the surge free account

### Real use case

#### Backend server
- Host a new HTML [page][1] linking the provided [script][2]
- Enjoy

#### Client
- Create a new invisible `iframe` tag, and host the backend provided page
- Create a communication channel using the [Channel Messaging API][3]
- When you have to send a request, serialise it and send it to the port.
- Wait for the response and react accordingly.

## Cavetas - Limitations - ToDo
1. This example is using the `fetch` API - which is not currently that spread
across all the browsers. We might want to change the client once we will figure
out the one that is able to fullfill all use cases.

2. This example currently does not open at all on IE11, it does not work on
Microsft Edge.

3. There's an important foreword I'm doing here: I'm assuming that the payload I
want to send on the wire is serialisable. I should verify that.

4. Also - I'm assuming all errors and responses that are coming from the
Http server are serialisable as well. If not, we're screwed up.

## Security considerations
1. [Subresource Integrity][6]

2. Verified `iframe` origin

3. Always verify the syntax of the received message (it's done for us by [JSChannel][3])

## Interesting links

[JSChannel][4] by Mozilla and its [npmised improved version][5].

Note: `JSChannel` is using `postMessage` as communication mechanism. It would be
really really interesting to fork the project and make it use the
[Channel Messaging API][3].

[1]: https://github.com/apiaryio/apiary-console-seed/blob/master/serve-seed.ejs
[2]: https://github.com/apiaryio/apiary-console-seed/blob/master/client/public/apiary-customer-seed.js
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[4]: https://github.com/mozilla/jschannel
[5]: https://github.com/wix/jschannel
[6]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
