let port = undefined

const onPortMessage = function (e) {
  const data = JSON.parse(e.data);

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

onmessage = function (e) {
  if (e.data === 'port') {
    port = e.ports[0];
    port.onmessage = onPortMessage;
  }
}
