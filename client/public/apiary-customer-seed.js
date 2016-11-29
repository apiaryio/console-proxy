let port = undefined

const onPortMessage = function (e) {
  const data = JSON.parse(e.data);

  fetch(data.url, data.requestOptions)
    .then(res => Promise.all([res.headers, res.json()]))
    .then(([headers, body]) => {

      let h = {};

      for (let header of headers) {
        h[header[0]] = header[1];
      }

      port.postMessage({ headers: h, body });
    })
    .then(undefined, (err) => {
      console.error(`Apiary iFrame error: ${err}`);
      port.postMessage(err);
    });

}

onmessage = function (e) {
  if (e.data === 'port') {
    port = e.ports[0];
    port.onmessage = onPortMessage;
  }
}
