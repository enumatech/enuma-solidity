require('isomorphic-fetch');

class Client {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  call(method, params = []) {
    return fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params,
        id: 1
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        return data.result;
      });
  }
}

module.exports = Client;
