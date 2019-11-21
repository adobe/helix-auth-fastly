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
$ npm install -S @adobe/helix-auth-fastly
```

## Usage
helix-auth-fastly is a wrapper around actions to ensure that actions are fastly authenticated.

helix-auth-fastly also exposes functionality for conditional fastly authentication.

To use helix-auth-fastly wrapper execute:
```
const { fastlyAuthWrapper } = @adobe/helix-auth-fastly; 

let action = func;

wrap = fastlyAuthWrapper(action,
{
    token: fastlyAuthToken, 
    service: fastlyServiceId,
});
```

To use helix-auth-fastly conditionally; you can also execute:
```
const { authFastly } = @adobe/helix-auth-fastly;

if(authFastly(token, service)){
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
