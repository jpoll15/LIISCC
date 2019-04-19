import React from 'react'

// The gray background
const backdropStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50,
  overflow: 'auto',
};

// The modal "window"
const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  position: 'fixed',
  top: '5%',
  bottom: '5%',
  maxHeight: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: 30,
  overflow: 'auto',
};

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }

  componentDidMount() {
    if (this.props.photo.description) this.setState({description: this.props.photo.description})
  }

  handleChange = event => {
    this.setState({description: event.target.value})
  }

  render() {
    const {photo} = this.props

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <p>{photo.title}</p>
          <img src={photo.url} />
          <p>Current Description: {this.props.photo.description}</p>
          <form onSubmit={this.props.addDescription}>
            <label htmlFor='description'>Add/Change Description:</label>
            <input name='description' type='text' value={this.state.description} onChange={this.handleChange}/>
            <button type='submit'>Add/Change Description</button>
            <button type='button' onClick={this.props.deselectPhoto}>
              Close/Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default Modal
