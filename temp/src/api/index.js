import * as http from 'http'
import { alert } from 'ui/dialogs'
import queryString from 'query-string'

export default class {
  constructor () {

    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    this.baseApiUrl = 'https://sanbox.havaz.vn/api/v1/'
  }

  gerenateUrl (url, params) {
    url = this.baseApiUrl + url
    let serializedParams = queryString.stringify(params)
    return url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  setHeader (headers = {}) {
    this.headers = Object.assign(headers, this.headers)
  }

  getHeaders () {
    return this.headers
  }

  getResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 500) {
        reject({statusCode: response.statusCode, data: response.content.toJSON()})
      }
      resolve({statusCode: response.statusCode, data: response.content.toJSON()})
    })
  }

  get (url, params = {}, headers = {}) {
    this.setHeader(headers)

    return http.request({
      url: this.gerenateUrl(url, params),
      method: 'GET',
      headers: this.getHeaders()
    }).then(this.getResponse)
  }

  post (url, data = {}, params = {}, headers = {}) {
    this.setHeader(headers)

    return http.request({
      url: this.gerenateUrl(url, params),
      method: 'POST',
      content: JSON.stringify(data),
      headers: this.getHeaders()
    }).then(this.getResponse)
  }

  put (url, data = {}, params = {}, headers = {}) {
    this.setHeader(headers)

    return http.request({
      url: this.gerenateUrl(url, params),
      method: 'PUT',
      content: JSON.stringify(data),
      headers: this.getHeaders()
    }).then(this.getResponse)
  }

  delete (url, params = {}, headers = {}) {
    this.setHeader(headers)

    return http.request({
      url: this.gerenateUrl(url, params),
      method: 'DELETE',
      headers: this.getHeaders()
    }).then(this.getResponse)
  }

}
