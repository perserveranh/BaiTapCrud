import ApiServices from 'src/api'
export default class extends ApiServices{
  login (user) {
    return this.post('login', user)
  }

  getInfo (params) {
    return this.get('account', params)
  }
}
