let port = undefined

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://apiary-console.surge.sh',
  'https://apiary-console.surge.sh'
];

const onPortMessage = function (event) {
  const data = JSON.parse(event.data);

  fetch(data.url, data.requestOptions)
      .then(response => {
        let content = null;
        if (response.headers.get('Content-Type').includes('application/json')) {
          content = response.json();
        } else {
          content = response.text();
        }

        return Promise.all([response.headers, content]);
      })
    .then(([headers, body]) => {

      let h = {};

      for (let header of headers) {
        h[header[0]] = header[1];
      }

      port.postMessage({ headers: h, body });
    })
    .then(undefined, (err) => {
      console.error(`Apiary iFrame error: ${err.message || err}`);
      port.postMessage(err.message || err);
    });

}

onmessage = function (event) {
  if (allowedOrigins.includes(event.origin) && event.data === 'port') {
    port = event.ports[0];
    port.onmessage = onPortMessage;
  }
}
