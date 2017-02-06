import React, { Component } from 'react';
import Channel from 'jschannel';

const CHANNEL_NOT_READY = 'CHANNEL_NOT_READY';

class Seed extends Component {

  constructor(props) {
    super(props);
    this.useIframe = (this.props.seedUrl.startsWith('http:') || this.props.seedUrl.startsWith('https:'));
  }

  componentWillUnmount() {
    if (this.useIFrame) {
      if (this.iframe) {
        this.iframe.removeEventListener('load', this.iframeLoaded);
      }

      if (this.channel) {
        this.channel.destroy();
      }
    }
  }

  componentDidMount() {
    if (!this.useIframe) {
      if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
        window.chrome.runtime.sendMessage(this.props.seedUrl, { method: 'ping' }, (reply) => {
          if (reply && reply.pong) {
            this.ready = true;
            this.props.onReady && this.props.onReady();
          }
        });
      }
    }
  }

  sendMessage({method, params}) {
    const useIframe = this.useIframe;

    return new Promise((resolve, reject) => {
      if (!this.ready || this.ready !== true)
        return reject(new Error(CHANNEL_NOT_READY));

      if (useIframe) {
        this.channel.call({
          method,
          params,
          success: resolve,
          error: reject,
        });

      } else {
        window.chrome.runtime.sendMessage(this.props.seedUrl, { method, params }, (response) => {
          if (!response) {
            return reject(new Error('No response returned from Chrome extension'));
          }
          if (response.error)
            return reject(response.error);
          return resolve(response);
        });
      }
    });
  }

  request(requestOptions) {
    return this.sendMessage({
      method: 'httpRequest',
      params: requestOptions
    });
  }

  iframeLoaded() {
    this.channel = Channel.build({
      window: this.iframe.contentWindow,
      origin: this.props.origin,
      scope: this.props.scope,
      debugOutput: this.props.debugOutput,
      onReady: () => {
        this.ready = true;
        this.props.onReady && this.props.onReady();
      }
    });
  }

  render() {
    return (this.useIframe ?
      <iframe
        src={this.props.seedUrl}
        height="0"
        width="0"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        ref={(iframe) => { if (iframe) { this.iframe = iframe; iframe.addEventListener('load', () => this.iframeLoaded(), false); } } }
        >
      </iframe> : null
    );
  }
}

Seed.propTypes = {
  seedUrl: React.PropTypes.string.isRequired,
  origin: React.PropTypes.string,
  scope: React.PropTypes.string,
  debugOutput: React.PropTypes.bool,
  onReady: React.PropTypes.func
};

Seed.defaultProps = {
  origin: '*',
  debugOutput: false
}

export default Seed;
