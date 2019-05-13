import React from 'react'

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
      <div className="backdrop">
        <div className="modal">
          <p>{photo.title}</p>
          <img src={photo.url} />
          <form onSubmit={this.props.addDescription}>
            <label htmlFor='description'>Add/Change Description:</label>
            <input name='description' type='text' value={this.state.description} onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
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
