/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{288:function(t,e,r){"use strict";r.r(e);var n=r(266),o=r(263),c=r(265),l=r(264),h=r(267);r(268);const f="@firebase/remote-config",d="0.3.4";class m{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach((t=>t()))}}const w="remote-config",_={"registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser"},C=new l.b("remoteconfig","Remote Config",_);const v=["1","true","t","yes","y","on"];class S{constructor(t,e=""){this._source=t,this._value=e}asString(){return this._value}asBoolean(){return"static"!==this._source&&v.indexOf(this._value.toLowerCase())>=0}asNumber(){if("static"===this._source)return 0;let t=Number(this._value);return isNaN(t)&&(t=0),t}getSource(){return this._source}}async function T(t){const e=Object(l.t)(t),[r,n]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);return!!(r&&r.config&&r.eTag&&r.eTag!==n)&&(await Promise.all([e._storageCache.setActiveConfig(r.config),e._storage.setActiveConfigEtag(r.eTag)]),!0)}function M(t){const e=Object(l.t)(t);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then((()=>{e._isInitializationComplete=!0}))),e._initializePromise}async function E(t){const e=Object(l.t)(t),r=new m;setTimeout((async()=>{r.abort()}),e.settings.fetchTimeoutMillis);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:r}),await e._storageCache.setLastFetchStatus("success")}catch(t){const r=function(t,e){return t instanceof l.c&&-1!==t.code.indexOf(e)}(t,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(r),t}}function F(t){const e=Object(l.t)(t);return function(t={},e={}){return Object.keys(Object.assign(Object.assign({},t),e))}(e._storageCache.getActiveConfig(),e.defaultConfig).reduce(((e,r)=>(e[r]=y(t,r),e)),{})}function y(t,e){const r=Object(l.t)(t);r._isInitializationComplete||r._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const n=r._storageCache.getActiveConfig();return n&&void 0!==n[e]?new S("remote",n[e]):r.defaultConfig&&void 0!==r.defaultConfig[e]?new S("default",String(r.defaultConfig[e])):(r._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new S("static"))}class I{constructor(t,e,r,n){this.client=t,this.storage=e,this.storageCache=r,this.logger=n}isCachedDataFresh(t,e){if(!e)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const r=Date.now()-e,n=r<=t;return this.logger.debug(`Config fetch cache check. Cache age millis: ${r}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${n}.`),n}async fetch(t){const[e,r]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(r&&this.isCachedDataFresh(t.cacheMaxAgeMillis,e))return r;t.eTag=r&&r.eTag;const n=await this.client.fetch(t),o=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return 200===n.status&&o.push(this.storage.setLastSuccessfulFetchResponse(n)),await Promise.all(o),n}}function L(t=navigator){return t.languages&&t.languages[0]||t.language}class O{constructor(t,e,r,n,o,c){this.firebaseInstallations=t,this.sdkVersion=e,this.namespace=r,this.projectId=n,this.apiKey=o,this.appId=c}async fetch(t){const[e,r]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),n=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,o={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:e,app_instance_id_token:r,app_id:this.appId,language_code:L()},l={method:"POST",headers:o,body:JSON.stringify(c)},h=fetch(n,l),f=new Promise(((e,r)=>{t.signal.addEventListener((()=>{const t=new Error("The operation was aborted.");t.name="AbortError",r(t)}))}));let d;try{await Promise.race([h,f]),d=await h}catch(t){let e="fetch-client-network";throw"AbortError"===t.name&&(e="fetch-timeout"),C.create(e,{originalErrorMessage:t.message})}let m=d.status;const w=d.headers.get("ETag")||void 0;let _,v;if(200===d.status){let t;try{t=await d.json()}catch(t){throw C.create("fetch-client-parse",{originalErrorMessage:t.message})}_=t.entries,v=t.state}if("INSTANCE_STATE_UNSPECIFIED"===v?m=500:"NO_CHANGE"===v?m=304:"NO_TEMPLATE"!==v&&"EMPTY_CONFIG"!==v||(_={}),304!==m&&200!==m)throw C.create("fetch-status",{httpStatus:m});return{status:m,eTag:w,config:_}}}class j{constructor(t,e){this.client=t,this.storage=e}async fetch(t){const e=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(t,e)}async attemptFetch(t,{throttleEndTimeMillis:e,backoffCount:r}){await function(t,e){return new Promise(((r,n)=>{const o=Math.max(e-Date.now(),0),c=setTimeout(r,o);t.addEventListener((()=>{clearTimeout(c),n(C.create("fetch-throttle",{throttleEndTimeMillis:e}))}))}))}(t.signal,e);try{const e=await this.client.fetch(t);return await this.storage.deleteThrottleMetadata(),e}catch(e){if(!function(t){if(!(t instanceof l.c&&t.customData))return!1;const e=Number(t.customData.httpStatus);return 429===e||500===e||503===e||504===e}(e))throw e;const n={throttleEndTimeMillis:Date.now()+Object(l.k)(r),backoffCount:r+1};return await this.storage.setThrottleMetadata(n),this.attemptFetch(t,n)}}}class P{constructor(t,e,r,n,o){this.app=t,this._client=e,this._storageCache=r,this._storage=n,this._logger=o,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:6e4,minimumFetchIntervalMillis:432e5},this.defaultConfig={}}get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}}function k(t,e){const r=t.target.error||void 0;return C.create(e,{originalErrorMessage:r&&r.message})}const A="app_namespace_store";class D{constructor(t,e,r,n=function(){return new Promise(((t,e)=>{try{const r=indexedDB.open("firebase_remote_config",1);r.onerror=t=>{e(k(t,"storage-open"))},r.onsuccess=e=>{t(e.target.result)},r.onupgradeneeded=t=>{const e=t.target.result;0===t.oldVersion&&e.createObjectStore(A,{keyPath:"compositeKey"})}}catch(t){e(C.create("storage-open",{originalErrorMessage:t}))}}))}()){this.appId=t,this.appName=e,this.namespace=r,this.openDbPromise=n}getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(t){return this.set("last_fetch_status",t)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(t){return this.set("last_successful_fetch_timestamp_millis",t)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(t){return this.set("last_successful_fetch_response",t)}getActiveConfig(){return this.get("active_config")}setActiveConfig(t){return this.set("active_config",t)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(t){return this.set("active_config_etag",t)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(t){return this.set("throttle_metadata",t)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}async get(t){const e=await this.openDbPromise;return new Promise(((r,n)=>{const o=e.transaction([A],"readonly").objectStore(A),c=this.createCompositeKey(t);try{const t=o.get(c);t.onerror=t=>{n(k(t,"storage-get"))},t.onsuccess=t=>{const e=t.target.result;r(e?e.value:void 0)}}catch(t){n(C.create("storage-get",{originalErrorMessage:t&&t.message}))}}))}async set(t,e){const r=await this.openDbPromise;return new Promise(((n,o)=>{const c=r.transaction([A],"readwrite").objectStore(A),l=this.createCompositeKey(t);try{const t=c.put({compositeKey:l,value:e});t.onerror=t=>{o(k(t,"storage-set"))},t.onsuccess=()=>{n()}}catch(t){o(C.create("storage-set",{originalErrorMessage:t&&t.message}))}}))}async delete(t){const e=await this.openDbPromise;return new Promise(((r,n)=>{const o=e.transaction([A],"readwrite").objectStore(A),c=this.createCompositeKey(t);try{const t=o.delete(c);t.onerror=t=>{n(k(t,"storage-delete"))},t.onsuccess=()=>{r()}}catch(t){n(C.create("storage-delete",{originalErrorMessage:t&&t.message}))}}))}createCompositeKey(t){return[this.appId,this.appName,this.namespace,t].join()}}class N{constructor(t){this.storage=t}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}async loadFromStorage(){const t=this.storage.getLastFetchStatus(),e=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),n=await t;n&&(this.lastFetchStatus=n);const o=await e;o&&(this.lastSuccessfulFetchTimestampMillis=o);const c=await r;c&&(this.activeConfig=c)}setLastFetchStatus(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)}setLastSuccessfulFetchTimestampMillis(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)}setActiveConfig(t){return this.activeConfig=t,this.storage.setActiveConfig(t)}}async function R(){if(!Object(l.B)())return!1;try{return await Object(l.U)()}catch(t){return!1}}Object(c._registerComponent)(new o.a(w,(function(t,{instanceIdentifier:e}){const r=t.getProvider("app").getImmediate(),n=t.getProvider("installations-internal").getImmediate();if("undefined"==typeof window)throw C.create("registration-window");if(!Object(l.B)())throw C.create("indexed-db-unavailable");const{projectId:o,apiKey:d,appId:m}=r.options;if(!o)throw C.create("registration-project-id");if(!d)throw C.create("registration-api-key");if(!m)throw C.create("registration-app-id");e=e||"firebase";const w=new D(m,r.name,e),_=new N(w),v=new h.b(f);v.logLevel=h.a.ERROR;const S=new O(n,c.SDK_VERSION,e,o,d,m),T=new j(S,w),E=new I(T,w,_,v),F=new P(r,E,_,w,v);return M(F),F}),"PUBLIC").setMultipleInstances(!0)),Object(c.registerVersion)(f,d),Object(c.registerVersion)(f,d,"esm2017");class ${constructor(t,e){this.app=t,this._delegate=e}get defaultConfig(){return this._delegate.defaultConfig}set defaultConfig(t){this._delegate.defaultConfig=t}get fetchTimeMillis(){return this._delegate.fetchTimeMillis}get lastFetchStatus(){return this._delegate.lastFetchStatus}get settings(){return this._delegate.settings}set settings(t){this._delegate.settings=t}activate(){return T(this._delegate)}ensureInitialized(){return M(this._delegate)}fetch(){return E(this._delegate)}fetchAndActivate(){return async function(t){return t=Object(l.t)(t),await E(t),T(t)}(this._delegate)}getAll(){return F(this._delegate)}getBoolean(t){return function(t,e){return y(Object(l.t)(t),e).asBoolean()}(this._delegate,t)}getNumber(t){return function(t,e){return y(Object(l.t)(t),e).asNumber()}(this._delegate,t)}getString(t){return function(t,e){return y(Object(l.t)(t),e).asString()}(this._delegate,t)}getValue(t){return y(this._delegate,t)}setLogLevel(t){!function(t,e){const r=Object(l.t)(t);switch(e){case"debug":r._logger.logLevel=h.a.DEBUG;break;case"silent":r._logger.logLevel=h.a.SILENT;break;default:r._logger.logLevel=h.a.ERROR}}(this._delegate,t)}}function K(t,{instanceIdentifier:e}){const r=t.getProvider("app-compat").getImmediate(),n=t.getProvider("remote-config").getImmediate({identifier:e});return new $(r,n)}var z;(z=n.a).INTERNAL.registerComponent(new o.a("remoteConfig-compat",K,"PUBLIC").setMultipleInstances(!0).setServiceProps({isSupported:R})),z.registerVersion("@firebase/remote-config-compat","0.1.5")}}]);