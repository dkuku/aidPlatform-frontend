import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { Item, Image } from 'semantic-ui-react'

export default class FlickrPhoto extends Component {
  constructor(props) {
    super(props)
    this.flickrURL = this.flickrURL.bind(this)
    this.getImages = this.getImages.bind(this)
    this.state = {
      image: '',
      hasMoreItems: true,
      loadMore: true,
      page: 1,
    }
  }

  flickrURL(page) {
    const address = 'https://api.flickr.com/services/rest/?'
    return (
      address +
      queryString.stringify({
        page: 0,
        method: 'flickr.photos.search',
        tags: this.props.tags,
        api_key: 'ca3783111609d69139840916b7a01ad2',
        format: 'json',
        nojsoncallback: 1,
        per_page: 1,
      })
    )
  }

  imageURL(item) {
    console.log(JSON.stringify(item))
    return item
      ? 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
      : null
  }

  componentWillMount() {
    this.getImages()
  }

  getImages() {
    axios
      .get(this.flickrURL())
      .then(response => {
        this.setState({ image: response.data.photos.photo[0] })
      })
      .catch(error => console.log(error))
  }

  render() {
    return <Item.Image src={this.imageURL(this.state.image)} />
  }
}
