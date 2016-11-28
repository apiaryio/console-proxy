port = undefined

onPortMessage = function (e) {
  data = JSON.parse(e.data);

  fetch(data.url, data.requestOptions)
    .then(res => res.json())
    .then(data => port.postMessage(data))
    .then(undefined, (err) => port.postMessage(err));

}

onmessage = function (e) {
  if (e.data === 'port') {
    port = e.ports[0];
    port.onmessage = onPortMessage;
  }
}
