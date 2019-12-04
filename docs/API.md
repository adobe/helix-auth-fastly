## Functions

<dl>
<dt><a href="#authFastly">authFastly(token, service)</a></dt>
<dd><p>authenticates token and service with Fastly</p>
</dd>
<dt><a href="#fastlyAuthWrapper">fastlyAuthWrapper(token, service)</a></dt>
<dd><p>wrapper that takes an action and faslty authenticates
it, upon success it invokes the action with remaining
params.</p>
</dd>
</dl>

<a name="authFastly"></a>

## authFastly(token, service)
authenticates token and service with Fastly

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Fastly Authentication Token |
| service | <code>string</code> | serviceid for a helix-project |

<a name="fastlyAuthWrapper"></a>

## fastlyAuthWrapper(token, service)
wrapper that takes an action and faslty authenticates
it, upon success it invokes the action with remaining
params.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Fastly Authentication Token |
| service | <code>string</code> | serviceid for a helix-project |

