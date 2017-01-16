import React, { Component } from 'react';
import Channel from 'jschannel';

const CHANNEL_NOT_READY = 'CHANNEL_NOT_READY';

class Seed extends Component {

  componentWillUnmount() {
    if (this.props.seedUrl) {
      this.iframe.removeEventListener('load', this.iframeLoaded);
      this.channel.destroy();
    }
  }

  componentDidMount() {
    if (!this.props.seedUrl) {
      window.chrome.runtime.sendMessage('kldpeogcjjfpkfdndnppggbdiooiomfd', {method: 'ping'}, () => {
        this.ready = true;
        this.props.onReady && this.props.onReady();
      });
    }
  }

  request = (requestOptions) => {
    return new Promise((resolve, reject) => {
      if (!this.ready || this.ready !== true)
        return reject(new Error(CHANNEL_NOT_READY));

      if (this.props.seedUrl) {
        this.channel.call({
          method: 'httpRequest',
          params: requestOptions,
          success: resolve,
          error: reject
        });

      } else {
        window.chrome.runtime.sendMessage('kldpeogcjjfpkfdndnppggbdiooiomfd', {
          method: 'httpRequest',
          params: requestOptions
        }, (response) => {
          if (response.error)
            return reject(response.error);
          return resolve(response.data);
        });
      }
    });
  }

  iframeLoaded = () => {
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
    return (this.props.seedUrl ?
      <iframe
        src={this.props.seedUrl}
        height="0"
        width="0"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        ref={(iframe) => { if (iframe) { this.iframe = iframe; iframe.addEventListener('load', this.iframeLoaded, false); } } }
        >
      </iframe> : null
    );
  }
}

Seed.propTypes = {
  seedUrl: React.PropTypes.string,
  origin: React.PropTypes.string,
  scope: React.PropTypes.string.isRequired,
  debugOutput: React.PropTypes.bool,
  onReady: React.PropTypes.func
};

Seed.defaultProps = {
  origin: '*',
  debugOutput: false
}

export default Seed;
