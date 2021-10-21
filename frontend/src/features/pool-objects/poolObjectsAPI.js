export function fetchPoolObjects() {
  return fetch('http://backedn.localhost:8080/api/pool_objects/').then(r => r.json())
}


export function fetchCreatePoolObject(number) {
  return fetch(
    'http://backedn.localhost:8080/api/pool_objects/',
    {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
      body: JSON.stringify({'number': number})
    })
}

export function fetchFreePoolObject(number) {
  return fetch(
    `http://backedn.localhost:8080/api/pool_objects/${number}/`,
    {
      method: 'put',
    })
}

export function fetchGetPoolObject(number) {
  return fetch(
    `http://backedn.localhost:8080/api/pool_objects/${number}/`,
    {
      method: 'get',
    })
}
