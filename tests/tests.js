const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/'
});
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.navigator = {
  userAgent: 'node.js',
};

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const { expect } = require('chai')
const enzyme = require('enzyme')
const { mount, shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
enzyme.configure({ adapter: new Adapter() });
const React = require('react')
import PhotoBox from '../client/components/PhotoBox'
import App from '../client/components/App'
// imported instead of required React Components from client side; was getting error

const waitFor = (wait) => new Promise((resolve) => setTimeout(resolve, wait))

describe('React components', () => {

  const fakePics = [
    {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
  ]

  describe('PhotoBox component', () => {

    it('renders the thumbnail as an image from the photo prop', () => {
      const wrapper = shallow(<PhotoBox photo={fakePics[0]} />)
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        "https://via.placeholder.com/150/92c952"
      ])
    })

  })

  describe('App component', () => {

    let mock

    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset();
    })

    after(() => {
      mock.restore();
    })

    it('renders the photos from state', async () => {
      mock.onGet('https://jsonplaceholder.typicode.com/photos').replyOnce(200, fakePics)

      const wrapper = mount(<App />)

      await waitFor(10)

      wrapper.update()

      expect(wrapper.state('photos')).to.deep.equal(fakePics)
    })
  })

})
