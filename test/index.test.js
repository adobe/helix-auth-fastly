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
const { authFastly, fastlyAuthWrapper } = require('../src/index.js');
const env = require('../src/env.js');

/* eslint-env mocha */
describe('testing util functions', () => {
  const service = '0bxMEaYAJV6SoqFlbZ2n1f';

  it('authFastly correctly authenticates', async () => {
    const ret = await authFastly(env.token, service);
    assert.equal(true, ret);
  });

  it('authFastly rejects with bad token', async () => {
    const handle = async () => {
      await authFastly('bad token', service);
    };
    assert.rejects(handle);
  });

  it('authFastly rejects with bad serviceid', async () => {
    const handle = async () => {
      await authFastly(env.token, 'bad service');
    };
    assert.rejects(handle);
  });
});

describe('fastlyAuthWrapper Tests', async () => {
  const service = '0bxMEaYAJV6SoqFlbZ2n1f';

  const action = () => 'Marquise';

  it('works with default behavior', async () => {
    const result = await fastlyAuthWrapper(action)({ token: env.token, service });

    assert.equal(result, 'Marquise');
  });

  it('works with excess parameters', async () => {
    const result = await fastlyAuthWrapper(action)({ token: env.token, service }, 'something', 'something2', 'something3');

    assert.equal(result, 'Marquise');
  });

  it('fails with bad token', async () => {
    const result = await fastlyAuthWrapper(action)({ token: 'badToken', service });

    assert.deepEqual(result, { statusCode: 401, body: 'Fastly Authentication Failed' });
  });

  it('fails with bad service', async () => {
    const result = await fastlyAuthWrapper(action)({ token: env.token, service: 'bad service' });

    assert.deepEqual(result, { statusCode: 401, body: 'Fastly Authentication Failed' });
  });
});
