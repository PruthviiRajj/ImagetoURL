import React, { Component } from 'react';

class ClipboardCopy extends Component {
  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  copyToClipboard = () => {
    // Select the text area
    this.textAreaRef.current.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Deselect the text area
    window.getSelection().removeAllRanges();
    // Optionally, notify the user
    alert('Text copied to clipboard!');
  };

  render() {
    return (
      <div>
        <textarea
          style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}
          ref={this.textAreaRef}
          value={this.props.textToCopy}
          readOnly
        />
        <button className='btn btn-info' onClick={this.copyToClipboard}>Copy URL</button>
      </div>
    );
  }
}

export default ClipboardCopy;
