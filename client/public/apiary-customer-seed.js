port = undefined


onPortMessage = function (e) {
  data = JSON.parse(e.data);

  const requestOptions = data.requestOptions;
  requestOptions.headers = new Headers(requestOptions.headers);

  fetch(data.url, requestOptions)
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
