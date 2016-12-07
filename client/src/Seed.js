import React, { Component } from 'react';
import Channel from 'jschannel';

class Seed extends Component {

  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.iframeLoaded);
  }

  requestDataWithIframe = (requestOptions, callback) => {
    this.channel.call({
      method: 'httpRequest',
      params: {
        url: `${this.props.baseUrl}/api/users/Vincenzo`,
        requestOptions: requestOptions
      },
      success: (data) => callback(null, data),
      error: callback
    });
  }

  iframeLoaded = () => {
    this.channel = Channel.build({
      window: this.iframe.contentWindow,
      origin: this.props.baseUrl,
      scope: this.props.scope,
    });
  }

  render() {
    return (
      <iframe
        src={`${this.props.baseUrl}/serve-seed.html`}
        height="0"
        width="0"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        ref={(iframe) => { if (iframe) { this.iframe = iframe; iframe.addEventListener('load', this.iframeLoaded, false); } } }
        >
      </iframe>
    );
  }
}

Seed.propTypes = {
  baseUrl: React.PropTypes.string,
  scope: React.PropTypes.string
};

export default Seed;
