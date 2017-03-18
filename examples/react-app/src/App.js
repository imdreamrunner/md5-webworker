import React, { Component } from 'react'
import md5 from 'md5-webworker'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  handleFileInputChange = async (e) => {
    if (e.target.files.length === 0) {
      this.setState({ text: '' })
    } else {
      const md5hex = await md5(e.target.files[0])
      this.setState({ text: md5hex })
    }
  }

  render () {
    return (
      <div>
        <input type="file" onChange={this.handleFileInputChange} />
        <p>MD5: {this.state.text}</p>
      </div>
    )
  }
}

export default App
