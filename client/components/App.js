import React from 'react'
import axios from 'axios'
import PhotoBox from './PhotoBox'
import Modal from './Modal'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      currentPhoto: {},
      showModal: false
    }
  }

  async componentDidMount() {
    window.addEventListener(
      "beforeunload", () => {
        localStorage.setItem('photos', JSON.stringify(this.state.photos))
      }
    )
    try {
      let photos
      if (localStorage.photos) {
        photos = JSON.parse(localStorage.getItem('photos'))

      } else {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/photos')
        photos = data.slice(0, 25)
      }
      this.setState({photos})
    } catch (err) {
      console.error(err)
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload", () => {
        localStorage.setItem('photos', JSON.stringify(this.state.photos))
      }
    );
    localStorage.setItem('photos', JSON.stringify(this.state.photos))
  }

  selectPhoto = photo => {
    this.setState({currentPhoto: photo, showModal: true})
  }

  deselectPhoto = () => {
    this.setState({currentPhoto: {}, showModal: false})
  }

  addDescription = event => {
    event.preventDefault()

    const photos = this.state.photos.map(photo => {
      if (photo.id === this.state.currentPhoto.id) {

        photo.description = event.target.description.value

      }
      return photo
    })
    this.setState({
      photos,
      currentPhoto: {}
    })

  }

  render() {
    // key={this.state.currentPhoto.id}

    return (
      <div id='photogrid'>
        {this.state.photos.length && this.state.photos.map(photo => {
          return <PhotoBox key={photo.id} photo={photo} selectPhoto={this.selectPhoto} className='thumb'/>
        })}
        {this.state.showModal && <Modal photo={this.state.currentPhoto}
          deselectPhoto={this.deselectPhoto} addDescription={this.addDescription}  />}
      </div>
    )
  }
}

export default App
