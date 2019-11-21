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
const initfastly = require('@adobe/fastly-native-promises');

/**
 * authenticates token and service with Fastly
 *
 * @param {string} token Fastly Authentication Token
 * @param {string} service serviceid for a helix-project
 */
async function authFastly(token, service) {
  // verify Fastly credentials
  try {
    const Fastly = await initfastly(token, service);
    await Fastly.getVersions();
    return true;
  } catch (e) {
    return false;
  }
}

function fastlyAuthWrapper(func, {
  token = "token", 
  service = "service"
}){
  
  return async (opts,...rest) => {
    if (await authFastly(opts[token], opts[service])) {
      return func(opts, ...rest);
    }
    return {
      statusCode: 401,
      body: "Fastly Authentication Failed"
    }
  } 
}

module.exports = { fastlyAuthWrapper, authFastly };
