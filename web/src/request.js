import * as qs from 'qs'
import Observable from '@reactivex/rxjs'

const url = 'https://xxxxxxxxx.something'

function makeUrl(endpoint) {
  return `${url}/${endpoint}?`
}

const shallowRequest = method => (
  method === 'GET' ||
  method === 'HEAD' ||
  method === 'REMOVE' ||
  method === 'DELETE'
)

export function request(method, endpoint, args, fullEndpoint) {
  const shallow = shallowRequest(method)
  let body

  if (!shallow) {
    body = JSON.stringify(args)
  }

  let url = fullEndpoint || makeUrl(endpoint)

  if (shallow) {
    url += qs.stringify(args)
  }

  const req = new Request(url, {
    method,
    headers: new Headers(),
    body
  })

  return Observable.fromPromise(fetch(req)
    .then(res => {
      if (res.status >= 400) {
        throw res
      }

      return res.json()
    })
  )
}

export function get(endpoint, args, fullEndpoint) {
  return request('GET', endpoint, args, fullEndpoint)
}

export function post(endpoint, args, fullEndpoint) {
  return request('POST', endpoint, args, fullEndpoint)
}

export function put(endpoint, args) {
  return request('PUT', endpoint, args)
}

export function remove(endpoint, args) {
  return request('REMOVE', endpoint, args)
}

export default request
