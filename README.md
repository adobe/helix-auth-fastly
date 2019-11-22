# Helix Auth Fastly

> Authenticate Helix actions against Fastly

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-auth-fastly.svg)](https://codecov.io/gh/adobe/helix-auth-fastly)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-auth-fastly.svg)](https://circleci.com/gh/adobe/helix-auth-fastly)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-auth-fastly.svg)](https://github.com/adobe/helix-auth-fastly/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-auth-fastly.svg)](https://github.com/adobe/helix-auth-fastly/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-auth-fastly.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-auth-fastly)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install @adobe/helix-auth-fastly
```

## Usage

`helix-auth-fastly` is a wrapper around OpenWhisk actions to that ensures that invocations of the action are only successful if valid Fastly credentials, in the forms of a service ID and token, are provided.

`helix-auth-fastly` can also be used as a simple single-purpose function to validate a pair of Fastly credentials.

To use the `helix-auth-fastly` wrapper set up your OpenWhisk action like this:

```javascript
const { fastlyAuthWrapper } = require('@adobe/helix-auth-fastly'); 

const action = () = {
  // your action code goes here
};

const main = fastlyAuthWrapper(action, {token: 'tokenName', service: 'serviceName'});

module.exports.main = main;
```

To use helix-auth-fastly conditionally; you can also execute:
```javascript

const { authFastly } = require('@adobe/helix-auth-fastly');

if(await authFastly(token, service)){
    //authentication has succeeded
} else {
    //authentication has failed
}
```

See the [API documentation](docs/API.md).

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
