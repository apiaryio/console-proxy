import React, { Component } from 'react';
import Channel from 'jschannel';

const CHANNEL_NOT_READY = 'CHANNEL_NOT_READY';

class Seed extends Component {

  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.iframeLoaded);
    this.channel.destroy();
  }

  request = (requestOptions) => {
    return new Promise((resolve, reject) => {
      if (!this.ready || this.ready !== true)
        return reject(new Error(CHANNEL_NOT_READY));

      this.channel.call({
        method: 'httpRequest',
        params: requestOptions,
        success: resolve,
        error: reject
      });
    });
  }

  iframeLoaded = () => {
    this.channel = Channel.build({
      window: this.iframe.contentWindow,
      origin: this.props.baseUrl,
      scope: this.props.scope,
      onReady: () => {
        this.ready = true;
        this.props.onReady && this.props.onReady();
      }
    });
  }

  render() {
    return (
      <iframe
        src={this.props.baseUrl}
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
  baseUrl: React.PropTypes.string.isRequired,
  scope: React.PropTypes.string.isRequired,
  onReady: React.PropTypes.func
};

export default Seed;
