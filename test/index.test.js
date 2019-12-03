/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const assert = require('assert');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FSPersister = require('@pollyjs/persister-fs');
const { setupMocha: setupPolly } = require('@pollyjs/core');
const path = require('path');
const { authFastly, fastlyAuthWrapper } = require('../src/index.js');

/* eslint-env mocha */
describe('authFastly', () => {
  setupPolly({
    recordFailedRequests: false,
    recordIfMissing: false,
    logging: false,
    adapters: [NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, 'fixtures/recordings'),
      },
    },
    matchRequestsBy: {
      headers: {
        exclude: ['fastly-key'],
      },
      url: false,
      method: true,
    },
  });

  const token = 'fake_token';
  const service = 'fake_service';

  it('authFastly correctly authenticates', async () => {
    const ret = await authFastly(token, service);
    assert.equal(true, ret);
  });

  it('authFastly rejects with bad token', async () => {
    const ret = await authFastly('bad token', service);
    assert.equal(false, ret);
  });

  it('authFastly rejects with bad serviceid', async () => {
    const ret = await authFastly(token, 'bad service');
    assert.equal(false, ret);
  });
});

describe('fastlyAuthWrapper Tests', async () => {
  setupPolly({
    recordFailedRequests: false,
    recordIfMissing: false,
    logging: false,
    adapters: [NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, 'fixtures/recordings'),
      },
    },
    matchRequestsBy: {
      headers: {
        exclude: ['fastly-key'],
      },
      url: false,
      method: true,
    },
  });

  const token = 'fake_token';
  const service = 'fake_service';

  const action = () => 'Marquise';
  const action2 = (fastlyCreds, something1, something2, something3) => ({
    arg1: something1,
    arg2: something2,
    arg3: something3,
  });

  it('works with default behavior', async () => {
    const result = await fastlyAuthWrapper(action)({ token, service });

    assert.equal(result, 'Marquise');
  });

  it('works with excess parameters', async () => {
    const result = await fastlyAuthWrapper(action2)({ token, service }, 'something', 'something2', 'something3');
    assert.deepEqual(result, { arg1: 'something', arg2: 'something2', arg3: 'something3' });
  });

  it('fails with bad token', async () => {
    const result = await fastlyAuthWrapper(action)({ token: 'badtoken', service });

    assert.deepEqual(result, { statusCode: 401, body: 'Fastly Authentication Failed' });
  });

  it('fails with bad service', async () => {
    const result = await fastlyAuthWrapper(action)({ token, service: 'bad service' });

    assert.deepEqual(result, { statusCode: 401, body: 'Fastly Authentication Failed' });
  });
});
