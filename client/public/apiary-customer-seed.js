onmessage = function (e) {
  e.ports[0].postMessage('Message received by IFrame: "' + e.data + '"');
}
