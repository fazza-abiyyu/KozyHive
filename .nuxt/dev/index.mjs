import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, getRequestURL, getResponseHeader, setCookie, deleteCookie, sendError, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getCookie, appendHeader, readMultipartFormData, getResponseStatusText } from 'file://E:/Projek/kozy-hive/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://E:/Projek/kozy-hive/node_modules/@vue/shared/dist/shared.cjs.js';
import { PrismaClient, Role, BookingStatus, PropertyStatus } from 'file://E:/Projek/kozy-hive/node_modules/@prisma/client/default.js';
import bcrypt from 'file://E:/Projek/kozy-hive/node_modules/bcryptjs/index.js';
import { Readable } from 'node:stream';
import { v2 } from 'file://E:/Projek/kozy-hive/node_modules/cloudinary/cloudinary.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://E:/Projek/kozy-hive/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, joinRelativeURL } from 'file://E:/Projek/kozy-hive/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://E:/Projek/kozy-hive/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://E:/Projek/kozy-hive/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://E:/Projek/kozy-hive/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://E:/Projek/kozy-hive/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://E:/Projek/kozy-hive/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://E:/Projek/kozy-hive/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://E:/Projek/kozy-hive/node_modules/devalue/index.js';
import { isVNode, toValue, isRef } from 'file://E:/Projek/kozy-hive/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://E:/Projek/kozy-hive/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://E:/Projek/kozy-hive/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://E:/Projek/kozy-hive/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://E:/Projek/kozy-hive/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://E:/Projek/kozy-hive/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://E:/Projek/kozy-hive/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://E:/Projek/kozy-hive/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://E:/Projek/kozy-hive/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://E:/Projek/kozy-hive/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://E:/Projek/kozy-hive/node_modules/youch-core/build/index.js';
import { Youch } from 'file://E:/Projek/kozy-hive/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://E:/Projek/kozy-hive/node_modules/nitropack/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://E:/Projek/kozy-hive/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://E:/Projek/kozy-hive/node_modules/errx/dist/index.js';
import UrlPattern from 'file://E:/Projek/kozy-hive/node_modules/url-pattern/lib/url-pattern.js';
import jwt from 'file://E:/Projek/kozy-hive/node_modules/jsonwebtoken/index.js';
import { walkResolver } from 'file://E:/Projek/kozy-hive/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"E:/Projek/kozy-hive/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"E:/Projek/kozy-hive","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"E:/Projek/kozy-hive/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"E:/Projek/kozy-hive/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"E:/Projek/kozy-hive/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"E:/Projek/kozy-hive/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {},
  "JWT_REFRESH_TOKEN": "IJBHAUG87khgb&^r2IUh9wyheiyG*hbg38vyg9y7yh9o21gP&T9pg129p7ty0921gp97T9",
  "JWT_ACCESS_TOKEN": "IJBHAUG87khgb&^r2IUh9wyheiyG*hbg38vyg9y7yh9o21gP&T9pg129p7ty0921gp97T9",
  "CLOUDINARY_CLOUD_NAME": "dglcmrrhx",
  "CLOUDINARY_API_KEY": "668779219879969",
  "CLOUDINARY_API_SECRET": "9Jc7R-dH1srVSGzSXCBxi8fhINA",
  "SMTP_HOST": "smtp.gmail.com",
  "SMTP_PORT": "587",
  "SMTP_USER": "2211102010@ittelkom-pwt.ac.id",
  "SMTP_PASSWORD": "1700428480@Chiel.yu",
  "MAIL_FROM_EMAIL": "2211102010@ittelkom-pwt.ac.id"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _04uirbKTn3SyTVoBgtdC52HPwSheRmUmP0jTJWrDc = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "E:/Projek/kozy-hive";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _mbMgAy5Q1mCGvVfOb2ryeLPLlMq4thks8zCkXcrENGY = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _04uirbKTn3SyTVoBgtdC52HPwSheRmUmP0jTJWrDc,
_mbMgAy5Q1mCGvVfOb2ryeLPLlMq4thks8zCkXcrENGY
];

const generateRefreshToken = (payload) => {
  const config = useRuntimeConfig();
  console.log(config.JWT_REFRESH_TOKEN);
  return jwt.sign(payload, config.JWT_REFRESH_TOKEN, {
    expiresIn: "4h"
  });
};
const generateAccessToken = (payload) => {
  const config = useRuntimeConfig();
  return jwt.sign(payload, config.JWT_ACCESS_TOKEN, {
    expiresIn: "10m"
  });
};
const generateToken = (payload) => {
  const refreshToken = generateRefreshToken(payload);
  const accessToken = generateAccessToken(payload);
  return { refreshToken, accessToken };
};
const decodeAccessToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.JWT_ACCESS_TOKEN);
  } catch (e) {
    return false;
  }
};
const verifyToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.JWT_ACCESS_TOKEN);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
const decodeRefreshToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.JWT_REFRESH_TOKEN);
  } catch (e) {
    return false;
  }
};
const sendRefreshToken = (event, token) => {
  setCookie(event, "refresh_token", token, {
    httpOnly: true,
    sameSite: true,
    secure: true
  });
};
const deleteRefreshToken = (event) => {
  deleteCookie(event, "refresh_token");
};

const prisma = new PrismaClient();

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
class User {
  static async countUsers() {
    return prisma.user.count();
  }
}
__publicField$1(User, "createUser", (data) => {
  var _a;
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      role: (_a = data.role) != null ? _a : Role.TENANT,
      profile: data.profile ? { create: data.profile } : void 0
    }
  });
});
__publicField$1(User, "registerUser", (data) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password
    }
  });
});
__publicField$1(User, "getUserById", (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      profile: true,
      tenantBookings: true,
      tenantTransactions: true,
      properties: true,
      ownerBookings: true,
      ownerTransactions: true
    }
  });
});
__publicField$1(User, "getUserByEmail", (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      tenantBookings: true,
      tenantTransactions: true,
      properties: true,
      ownerBookings: true,
      ownerTransactions: true,
      refreshTokens: true
    }
  });
});
__publicField$1(User, "updateUser", async (id, data) => {
  const updatedData = {
    email: data.email,
    role: data.role,
    profile: data.profile ? { update: data.profile } : void 0
  };
  if (data.password) {
    const saltRounds = 10;
    updatedData.password = await bcrypt.hash(data.password, saltRounds);
  }
  return prisma.user.update({
    where: { id },
    data: updatedData
  });
});
__publicField$1(User, "deleteUser", async (id) => {
  return prisma.user.delete({
    where: { id }
  });
});
__publicField$1(User, "getAllUsers", async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const users = await prisma.user.findMany({
    skip,
    take,
    include: {
      profile: true
    }
  });
  const total = await prisma.user.count();
  const totalPages = Math.ceil(total / pageSize);
  return {
    success: true,
    message: "Users retrieved successfully",
    data: users,
    meta: {
      page,
      limit: pageSize,
      total,
      totalPages
    }
  };
});
__publicField$1(User, "searchUser", async (search, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: search } },
        { profile: { name: { contains: search } } }
      ]
    },
    skip,
    take,
    include: {
      profile: true
    }
  });
  const total = await prisma.user.count({
    where: {
      OR: [
        { email: { contains: search } },
        { profile: { name: { contains: search } } }
      ]
    }
  });
  const totalPages = Math.ceil(total / pageSize);
  return {
    success: true,
    message: "Search results retrieved successfully",
    data: users,
    meta: {
      page,
      limit: pageSize,
      total,
      totalPages
    }
  };
});

const _dzrTQi = defineEventHandler(async (event) => {
  var _a;
  try {
    const endpoints = [
      "/api/auth/user",
      "/api/auth/logs",
      "/api/auth/logout",
      "/api/auth/verification",
      "/api/users",
      "/api/users/me",
      "/api/users/:id",
      "/api/users/search?q=:q",
      "/api/users?page=:page&pagesize=:pagesize",
      "/api/profile",
      "/api/properties",
      "/api/properties/my-properties",
      "/api/properties/:id",
      "/api/properties?page=:page&pagesize=:pagesize",
      "/api/properties/search?q=:q&page=:page&pagesize=:pagesize",
      "/api/properties/cities?c=:c&page=:page&pagesize=:pagesize",
      "/api/properties/:id/status",
      "/api/admin/properties/:id/approve",
      "/api/admin/properties/:id/reject",
      "/api/bookings/:id/activate",
      "/api/bookings/:id/complete",
      "/api/bookings/:id/confirm",
      "/api/bookings/:id/reject",
      "/api/bookings/:id/logs",
      "/api/admin/properties",
      "/api/admin/properties/:id",
      "/api/admin/bookings?page=:page&pagesize=:pagesize",
      "/api/admin/bookings/stats",
      "/api/admin/properties?page=:page&pagesize=:pagesize",
      "/api/bookings/my-bookings",
      "/api/bookings/:id",
      "/api/bookings"
    ];
    const isHandledByThisMiddleware = endpoints.some((endopoint) => {
      const pattern = new UrlPattern(endopoint);
      return pattern.match(event.req.url);
    });
    if (!isHandledByThisMiddleware) {
      return;
    }
    const token = (_a = event.req.headers["authorization"]) == null ? void 0 : _a.split(" ")[1];
    const decoded = decodeAccessToken(token);
    if (!decoded) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Unauthorized"
      }));
    }
    try {
      const userId = decoded.id;
      const user = await User.getUserById(userId);
      if (!user) {
        throw createError({
          statusCode: 403,
          statusMessage: "Unauthorized - User tidak ditemukan."
        });
      }
      event.context.auth = { user };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error saat mendapatkan pengguna."
      });
    }
  } catch (e) {
    return;
  }
});

class ErrorHandler {
  static handleError(event, error) {
    let statusCode = error.statusCode || 500;
    let message = error.statusMessage || error.message || "Terjadi kesalahan internal.";
    switch (error.code) {
      case "P2002":
        if (event.req.method === "POST") {
          statusCode = 409;
          message = "Data sudah ada.";
        } else {
          statusCode = 400;
          message = "Gagal memperbarui data. Pastikan tidak ada duplikasi.";
        }
        break;
      case "P2003":
        statusCode = 400;
        message = "Tidak bisa menghapus atau mengubah karena data terkait masih digunakan.";
        break;
      case "P2025":
        statusCode = 404;
        message = "Data tidak ditemukan.";
        break;
      case "P2000":
        statusCode = 400;
        message = "Validasi gagal. Data tidak sesuai format.";
        break;
      case "P2011":
        statusCode = 400;
        message = "Validasi gagal. Data tidak memenuhi aturan yang ditentukan.";
        break;
      case "P2010":
        statusCode = 500;
        message = "Kesalahan dalam middleware role. Periksa aturan akses dan endpoint.";
        break;
      case "P2012":
        statusCode = 401;
        message = "Authorization gagal. Token tidak ditemukan dalam request.";
        break;
      case "P2013":
        statusCode = 401;
        message = "Authorization gagal. Token yang diberikan tidak valid.";
        break;
      case "P2014":
        statusCode = 401;
        message = "Authorization gagal. User tidak ditemukan di dalam sistem.";
        break;
      case "P2015":
        statusCode = 403;
        message = "Anda tidak memiliki izin untuk mengakses endpoint ini.";
        break;
    }
    console.error("Error Caught:", {
      statusCode,
      message
    });
    setResponseStatus(event, statusCode);
    return {
      success: false,
      statusCode,
      message
    };
  }
}

const _B9vN2H = defineEventHandler(async (event) => {
  var _a;
  try {
    const excludedEndpoints = ["/api/auth/*", "/api/profile", "/api/users/me", "/api/properties/search", "/api/properties/cities"];
    const isExcluded = excludedEndpoints.some((endpoint) => {
      const pattern = new UrlPattern(endpoint);
      return pattern.match(event.req.url);
    });
    if (isExcluded) {
      console.log(`\u23E9 Middleware Role dilewati untuk: ${event.req.url}`);
      return;
    }
    const user = (_a = event.context.auth) == null ? void 0 : _a.user;
    if (!user) {
      throw { statusCode: 401, statusMessage: "Unauthorized - User tidak ditemukan." };
    }
    const roleEndpoints = [
      { path: "/api/users", roles: ["ADMIN"] },
      { path: "/api/users/:id", roles: ["ADMIN"] }
      // { path: "/api/properties/*", roles: ["OWNER"] },
      // { path: "/api/bookings/*", roles: ["TENANT"] },
    ];
    const matchedEndpoint = roleEndpoints.find(({ path }) => {
      const pattern = new UrlPattern(path);
      return pattern.match(event.req.url);
    });
    if (!matchedEndpoint) {
      return;
    }
    if (!matchedEndpoint.roles.includes(user.role)) {
      throw { statusCode: 403, statusMessage: "Forbidden - Anda tidak memiliki akses." };
    }
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://E:/Projek/kozy-hive/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://E:/Projek/kozy-hive/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_F4vIQn = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_6LoUji = () => Promise.resolve().then(function () { return stats_get$1; });
const _lazy_9Yfp89 = () => Promise.resolve().then(function () { return approve_patch$1; });
const _lazy_98czY5 = () => Promise.resolve().then(function () { return reject_patch$3; });
const _lazy_bp7n6T = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_GhcmGr = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_XF0_O7 = () => Promise.resolve().then(function () { return logout_get$1; });
const _lazy_timx8d = () => Promise.resolve().then(function () { return refresh_get$1; });
const _lazy_Dc406Z = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_xELXKt = () => Promise.resolve().then(function () { return activate_patch$1; });
const _lazy_Clnwr7 = () => Promise.resolve().then(function () { return complete_patch$1; });
const _lazy_g0zfXS = () => Promise.resolve().then(function () { return confirm_patch$1; });
const _lazy_BErVkA = () => Promise.resolve().then(function () { return index_delete$9; });
const _lazy_V57ZFx = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_l41_Ws = () => Promise.resolve().then(function () { return index_put$9; });
const _lazy_8EfKm9 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_61ZUnw = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_4AGZIG = () => Promise.resolve().then(function () { return reject_patch$1; });
const _lazy_RMKoXz = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_7yRElE = () => Promise.resolve().then(function () { return myBookings_get$1; });
const _lazy_HBw_9U = () => Promise.resolve().then(function () { return index_delete$7; });
const _lazy_7na682 = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_1RpiGl = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_v5Zzr5 = () => Promise.resolve().then(function () { return index_put$7; });
const _lazy_PWNJ2e = () => Promise.resolve().then(function () { return index_delete$5; });
const _lazy_EsFi6c = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_qDYrlV = () => Promise.resolve().then(function () { return index_put$5; });
const _lazy_VL3sxh = () => Promise.resolve().then(function () { return status_patch$1; });
const _lazy_4WmOur = () => Promise.resolve().then(function () { return cities_get$1; });
const _lazy_VeImZ7 = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_Xk1C2K = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_DBasW1 = () => Promise.resolve().then(function () { return myProperties_get$1; });
const _lazy_opsNBH = () => Promise.resolve().then(function () { return search_get$1; });
const _lazy_R6_nkP = () => Promise.resolve().then(function () { return index_delete$3; });
const _lazy_OJVwMV = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_2mJosN = () => Promise.resolve().then(function () { return index_put$3; });
const _lazy_DzxU0d = () => Promise.resolve().then(function () { return index$1; });
const _lazy_jYdoq0 = () => Promise.resolve().then(function () { return index_delete$1; });
const _lazy_aICSos = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_WubLvg = () => Promise.resolve().then(function () { return index_put$1; });
const _lazy_wQMhBW = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _dzrTQi, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _B9vN2H, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/bookings', handler: _lazy_F4vIQn, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/bookings/stats', handler: _lazy_6LoUji, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/properties/:id/approve', handler: _lazy_9Yfp89, lazy: true, middleware: false, method: "patch" },
  { route: '/api/admin/properties/:id/reject', handler: _lazy_98czY5, lazy: true, middleware: false, method: "patch" },
  { route: '/api/admin/properties', handler: _lazy_bp7n6T, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/login', handler: _lazy_GhcmGr, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_XF0_O7, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/refresh', handler: _lazy_timx8d, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/register', handler: _lazy_Dc406Z, lazy: true, middleware: false, method: "post" },
  { route: '/api/bookings/:id/activate', handler: _lazy_xELXKt, lazy: true, middleware: false, method: "patch" },
  { route: '/api/bookings/:id/complete', handler: _lazy_Clnwr7, lazy: true, middleware: false, method: "patch" },
  { route: '/api/bookings/:id/confirm', handler: _lazy_g0zfXS, lazy: true, middleware: false, method: "patch" },
  { route: '/api/bookings/:id', handler: _lazy_BErVkA, lazy: true, middleware: false, method: "delete" },
  { route: '/api/bookings/:id', handler: _lazy_V57ZFx, lazy: true, middleware: false, method: "get" },
  { route: '/api/bookings/:id', handler: _lazy_l41_Ws, lazy: true, middleware: false, method: "put" },
  { route: '/api/bookings/:id/logs', handler: _lazy_8EfKm9, lazy: true, middleware: false, method: "get" },
  { route: '/api/bookings/:id/logs', handler: _lazy_61ZUnw, lazy: true, middleware: false, method: "post" },
  { route: '/api/bookings/:id/reject', handler: _lazy_4AGZIG, lazy: true, middleware: false, method: "patch" },
  { route: '/api/bookings', handler: _lazy_RMKoXz, lazy: true, middleware: false, method: "post" },
  { route: '/api/bookings/my-bookings', handler: _lazy_7yRElE, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile', handler: _lazy_HBw_9U, lazy: true, middleware: false, method: "delete" },
  { route: '/api/profile', handler: _lazy_7na682, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile', handler: _lazy_1RpiGl, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile', handler: _lazy_v5Zzr5, lazy: true, middleware: false, method: "put" },
  { route: '/api/properties/:id', handler: _lazy_PWNJ2e, lazy: true, middleware: false, method: "delete" },
  { route: '/api/properties/:id', handler: _lazy_EsFi6c, lazy: true, middleware: false, method: "get" },
  { route: '/api/properties/:id', handler: _lazy_qDYrlV, lazy: true, middleware: false, method: "put" },
  { route: '/api/properties/:id/status', handler: _lazy_VL3sxh, lazy: true, middleware: false, method: "patch" },
  { route: '/api/properties/cities', handler: _lazy_4WmOur, lazy: true, middleware: false, method: "get" },
  { route: '/api/properties', handler: _lazy_VeImZ7, lazy: true, middleware: false, method: "get" },
  { route: '/api/properties', handler: _lazy_Xk1C2K, lazy: true, middleware: false, method: "post" },
  { route: '/api/properties/my-properties', handler: _lazy_DBasW1, lazy: true, middleware: false, method: "get" },
  { route: '/api/properties/search', handler: _lazy_opsNBH, lazy: true, middleware: false, method: "get" },
  { route: '/api/users/:id', handler: _lazy_R6_nkP, lazy: true, middleware: false, method: "delete" },
  { route: '/api/users/:id', handler: _lazy_OJVwMV, lazy: true, middleware: false, method: "get" },
  { route: '/api/users/:id', handler: _lazy_2mJosN, lazy: true, middleware: false, method: "put" },
  { route: '/api/users', handler: _lazy_DzxU0d, lazy: true, middleware: false, method: undefined },
  { route: '/api/users/me', handler: _lazy_jYdoq0, lazy: true, middleware: false, method: "delete" },
  { route: '/api/users/me', handler: _lazy_aICSos, lazy: true, middleware: false, method: "get" },
  { route: '/api/users/me', handler: _lazy_WubLvg, lazy: true, middleware: false, method: "put" },
  { route: '/__nuxt_error', handler: _lazy_wQMhBW, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_wQMhBW, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

class Booking {
  // GET: Ambil booking berdasarkan ID
  static async getBookingById(id) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        tenant: { select: { id: true, email: true } },
        owner: { select: { id: true, email: true } },
        property: true,
        bookingLogs: true
      }
    });
  }
  // GET: Ambil semua booking milik tenant
  static async getTenantBookings(tenantId, page, pageSize) {
    const skip = (page - 1) * pageSize;
    const totalBookings = await prisma.booking.count({ where: { tenantId } });
    const bookings = await prisma.booking.findMany({
      where: { tenantId },
      skip,
      take: pageSize,
      include: {
        property: true,
        owner: { select: { id: true, email: true } }
      }
    });
    const totalPages = Math.ceil(totalBookings / pageSize);
    return {
      success: true,
      message: "Tenant's bookings retrieved successfully",
      data: bookings,
      meta: {
        page,
        limit: pageSize,
        total: totalBookings,
        totalPages
      }
    };
  }
  // GET: Ambil semua booking milik owner
  static async getOwnerBookings(ownerId, page, pageSize) {
    const skip = (page - 1) * pageSize;
    const totalBookings = await prisma.booking.count({ where: { ownerId } });
    const bookings = await prisma.booking.findMany({
      where: { ownerId },
      skip,
      take: pageSize,
      include: {
        property: true,
        tenant: { select: { id: true, email: true } }
      }
    });
    const totalPages = Math.ceil(totalBookings / pageSize);
    return {
      success: true,
      message: "Owner's bookings retrieved successfully",
      data: bookings,
      meta: {
        page,
        limit: pageSize,
        total: totalBookings,
        totalPages
      }
    };
  }
  static async getAllBookings(tenantId, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const totalBookings = await prisma.booking.count({
      where: { tenantId }
    });
    const bookings = await prisma.booking.findMany({
      where: { tenantId },
      skip,
      take: pageSize,
      include: {
        property: true,
        owner: { select: { id: true, email: true } }
      }
    });
    const totalPages = Math.ceil(totalBookings / pageSize);
    return {
      success: true,
      message: "Data booking tenant berhasil diambil!",
      data: bookings,
      meta: {
        page,
        limit: pageSize,
        total: totalBookings,
        totalPages
      }
    };
  }
  // POST: Buat booking baru dan kurangi ketersediaan kamar
  static async createBooking(data, userId) {
    var _a, _b;
    const property = await prisma.property.findUnique({ where: { id: data.propertyId } });
    if (!property || property.availableRooms <= 0 || property.status !== "ACTIVE") {
      throw { statusCode: 400, statusMessage: "Properti tidak tersedia untuk booking." };
    }
    const monthlyPrice = property.price;
    const deposit = (_a = data.deposit) != null ? _a : 0;
    const totalAmount = data.duration * monthlyPrice + deposit;
    const booking = await prisma.booking.create({
      data: {
        tenantId: userId,
        ownerId: property.ownerId,
        propertyId: data.propertyId,
        checkInDate: new Date(data.checkInDate),
        duration: data.duration,
        monthlyPrice,
        deposit,
        totalAmount,
        status: BookingStatus.PENDING,
        notes: (_b = data.notes) != null ? _b : null
      }
    });
    await prisma.property.update({
      where: { id: data.propertyId },
      data: { availableRooms: property.availableRooms - 1 }
    });
    return booking;
  }
  static async updateBooking(id, tenantId, data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const booking = await prisma.booking.findUnique({ where: { id } });
    const property = await prisma.property.findUnique({ where: { id: booking == null ? void 0 : booking.propertyId } });
    return prisma.booking.update({
      where: { id },
      data: {
        checkInDate: data.checkInDate ? new Date(data.checkInDate) : void 0,
        duration: (_a = data.duration) != null ? _a : void 0,
        monthlyPrice: (_b = property == null ? void 0 : property.price) != null ? _b : void 0,
        deposit: (_c = data.deposit) != null ? _c : void 0,
        totalAmount: ((_e = (_d = data.duration) != null ? _d : booking == null ? void 0 : booking.duration) != null ? _e : 0) * ((_f = property == null ? void 0 : property.price) != null ? _f : 0) + ((_g = data.deposit) != null ? _g : 0),
        notes: (_h = data.notes) != null ? _h : void 0
      }
    });
  }
  static async updateBookingStatus(id, status) {
    return prisma.booking.update({
      where: { id },
      data: { status }
    });
  }
  static async deleteBooking(id) {
    return prisma.booking.delete({
      where: { id }
    });
  }
  static async getBookingStats() {
    var _a, _b, _c;
    const totalBookings = await prisma.booking.count();
    const totalRevenuePaid = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { status: "PAID" }
    });
    const totalRevenueCompleted = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { status: "COMPLETED" }
    });
    const totalDeposit = await prisma.booking.aggregate({
      _sum: { deposit: true }
    });
    const uniqueTenants = await prisma.booking.findMany({
      select: { tenantId: true },
      distinct: ["tenantId"]
    });
    const totalTenants = uniqueTenants.length;
    const uniqueOwners = await prisma.booking.findMany({
      select: { ownerId: true },
      distinct: ["ownerId"]
    });
    const totalOwners = uniqueOwners.length;
    const pendingBookings = await prisma.booking.count({ where: { status: "PENDING" } });
    const confirmedBookings = await prisma.booking.count({ where: { status: "CONFIRMED" } });
    const activeBookings = await prisma.booking.count({ where: { status: "ACTIVE" } });
    const completedBookings = await prisma.booking.count({ where: { status: "COMPLETED" } });
    const cancelledBookings = await prisma.booking.count({ where: { status: "CANCELLED" } });
    return {
      totalBookings,
      totalRevenuePaid: (_a = totalRevenuePaid._sum.totalAmount) != null ? _a : 0,
      totalRevenueCompleted: (_b = totalRevenueCompleted._sum.totalAmount) != null ? _b : 0,
      totalDeposit: (_c = totalDeposit._sum.deposit) != null ? _c : 0,
      totalTenants,
      totalOwners,
      pendingBookings,
      confirmedBookings,
      activeBookings,
      completedBookings,
      cancelledBookings
    };
  }
}

class ResponseHandler {
  static sendSuccess(event, message, data, statusCode = 200, meta) {
    setResponseStatus(event, statusCode);
    return {
      success: true,
      statusCode,
      message,
      ...data && Object.keys(data).length > 0 ? { data } : {},
      ...meta && Object.keys(meta).length > 0 ? { meta } : {}
    };
  }
  static sendCreated(event, message, data, statusCode = 201, meta) {
    setResponseStatus(event, statusCode);
    return {
      success: true,
      statusCode,
      message,
      data: { ...data },
      meta
    };
  }
}

class Pagination {
  static getPagination(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
  }
  static getMeta(total, page, limit) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }
}

const index_get$g = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const { data, meta } = await Booking.getAllBookings(userId, page, limit);
    return ResponseHandler.sendSuccess(event, "Data pesanan ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
});

const stats_get = defineEventHandler(async (event) => {
  try {
    const stats = await Booking.getBookingStats();
    return ResponseHandler.sendSuccess(event, "Data statistik booking berhasil diambil!", stats, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const stats_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: stats_get
});

class Property {
  // GET: Ambil properti milik owner
  static async getMyProperties(ownerId, page, pageSize, filters = {}) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const properties = await prisma.property.findMany({
      where: {
        ownerId,
        ...filters
      },
      skip,
      take,
      include: {
        owner: { select: { id: true, email: true } },
        bookings: true
      }
    });
    const total = await prisma.property.count({ where: { ownerId, ...filters } });
    const totalPages = Math.ceil(total / pageSize);
    return {
      success: true,
      message: "Owner's properties retrieved successfully",
      data: properties,
      meta: {
        page,
        limit: pageSize,
        total,
        totalPages
      }
    };
  }
  static async countMyProperties(ownerId) {
    return prisma.property.count({
      where: { ownerId }
    });
  }
  // POST: Buat properti baru
  static async createProperty(data) {
    var _a, _b, _c, _d, _e;
    if (!data.ownerId || !data.name || !data.description || !data.address || !data.city || !data.price) {
      throw { statusCode: 400, statusMessage: "Semua field wajib diisi!" };
    }
    return prisma.property.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        price: Number(data.price),
        totalRooms: Number((_a = data.totalRooms) != null ? _a : 1),
        availableRooms: Number((_c = (_b = data.availableRooms) != null ? _b : data.totalRooms) != null ? _c : 1),
        status: (_d = data.status) != null ? _d : "INACTIVE",
        images: (_e = data.images) != null ? _e : null
        // 🔹 Pastikan bisa null jika tidak ada gambar
      }
    });
  }
  // PUT: Update properti
  static async updateProperty(id, data) {
    var _a;
    return prisma.property.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        price: data.price,
        totalRooms: data.totalRooms,
        availableRooms: data.availableRooms,
        status: (_a = data.status) != null ? _a : "ACTIVE",
        images: data.images
      }
    });
  }
  static async patchPropertyStatus(id, status) {
    const validStatuses = ["ACTIVE", "INACTIVE", "PENDING"];
    if (!validStatuses.includes(status)) {
      throw { statusCode: 400, statusMessage: "Status properti tidak valid." };
    }
    const statusEnum = PropertyStatus[status];
    if (!statusEnum) {
      throw { statusCode: 400, statusMessage: "Konversi status ke enum gagal." };
    }
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw { statusCode: 404, statusMessage: "Properti tidak ditemukan." };
    }
    return prisma.property.update({
      where: { id },
      data: { status: statusEnum }
    });
  }
  // DELETE: Hapus properti
  static async deleteProperty(id) {
    return prisma.property.delete({
      where: { id }
    });
  }
  // PATCH: Update status properti
  static async updatePropertyStatus(id, status) {
    return prisma.property.update({
      where: { id },
      data: { status }
    });
  }
  static async countProperties() {
    return prisma.property.count();
  }
  static async getAllProperties(page, pageSize, filters = {}) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const properties = await prisma.property.findMany({
      where: {
        ...filters
      },
      skip,
      take,
      include: {
        owner: { select: { id: true, email: true } },
        bookings: true
      }
    });
    const total = await prisma.property.count({ where: { ...filters } });
    const totalPages = Math.ceil(total / pageSize);
    return {
      success: true,
      message: "Properties retrieved successfully",
      data: properties,
      meta: {
        page,
        limit: pageSize,
        total,
        totalPages
      }
    };
  }
  static async getPropertyById(id) {
    return prisma.property.findUnique({
      where: { id }
    });
  }
  static async searchProperties(query, page = 1, pageSize = 10) {
    const searchQuery = query == null ? void 0 : query.trim().toLowerCase();
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const properties = await prisma.property.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery } },
          { description: { contains: searchQuery } }
        ]
      },
      skip,
      take,
      include: {
        owner: { select: { id: true, email: true } },
        bookings: true
      }
    });
    const total = await prisma.property.count({
      where: {
        OR: [
          { name: { contains: searchQuery } },
          { description: { contains: searchQuery } }
        ]
      }
    });
    return {
      success: true,
      message: "Properties searched successfully",
      data: properties,
      meta: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }
  static async filterPropertiesByCity(city, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const properties = await prisma.property.findMany({
      where: { city: { equals: city } },
      skip,
      take,
      include: {
        owner: { select: { id: true, email: true } },
        bookings: true
      }
    });
    const total = await prisma.property.count({ where: { city: { equals: city } } });
    return {
      success: true,
      message: `Properties in ${city} retrieved successfully`,
      data: properties,
      meta: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }
}

const approve_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
  }
  const existingProperty = await Property.getPropertyById(id);
  if (!existingProperty) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "ACTIVE";
  if (!Object.values(PropertyStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  const updatedProperty = await Property.updatePropertyStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedProperty };
});

const approve_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: approve_patch
});

const reject_patch$2 = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
  }
  const existingProperty = await Property.getPropertyById(id);
  if (!existingProperty) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "DELETED";
  if (!Object.values(PropertyStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  const updatedProperty = await Property.updatePropertyStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedProperty };
});

const reject_patch$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reject_patch$2
});

const index_get$e = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const { data, meta } = await Property.getAllProperties(page, limit);
    return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

class RefreshToken {
  static create(userId, refreshToken) {
    return prisma.refreshToken.create({
      data: {
        userId,
        refreshToken
      }
    });
  }
  static findToken(token) {
    return prisma.refreshToken.findFirst({
      where: { refreshToken: token }
    });
  }
  static deleteToken(token) {
    return prisma.refreshToken.deleteMany({
      where: { refreshToken: token }
    });
  }
  static async getToken(refreshToken) {
    return prisma.refreshToken.findFirst({
      where: {
        refreshToken
      }
    });
  }
}

const login_post = defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    if (!data.email || !data.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Pastikan telah mengisi dengan benar dan lengkap."
      });
    }
    const user = await User.getUserByEmail(data.email);
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Kesalahan Kredensial."
      });
    }
    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Kesalahan Kredensial."
      });
    }
    const { refreshToken, accessToken } = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    const { password, ...userData } = user;
    await RefreshToken.create(user.id, refreshToken);
    sendRefreshToken(event, refreshToken);
    return ResponseHandler.sendSuccess(
      event,
      "Berhasil Masuk!",
      {
        access_token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      },
      200
    );
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login_post
});

const addToBlacklist = (token) => {
};

const logout_get = defineEventHandler(async (event) => {
  try {
    const user = event.context.auth.user;
    if (!user) {
      throw createError({
        statusCode: 403,
        statusMessage: "Pengguna tidak valid."
      });
    }
    const authHeader = event.req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Tidak terotorisasi."
      });
    }
    const token = authHeader.split(" ")[1];
    verifyToken(token);
    addToBlacklist(token);
    const refreshToken = getCookie(event, "refresh_token");
    if (!refreshToken) {
      throw createError({
        statusCode: 400,
        statusMessage: "Tidak ada refresh token yang ditemukan dalam cookie."
      });
    }
    await RefreshToken.deleteToken(refreshToken);
    deleteRefreshToken(event);
    appendHeader(event, "Set-Cookie", "refresh_token=; HttpOnly; Path=/; Max-Age=0");
    return ResponseHandler.sendSuccess(
      event,
      "Berhasil keluar!",
      {},
      200
    );
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const logout_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: logout_get
});

const refresh_get = defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token");
    if (!refreshToken) {
      throw createError({
        statusCode: 400,
        statusMessage: "Tidak ada refresh token yang ditemukan dalam cookie."
      });
    }
    const storedToken = await RefreshToken.findToken(refreshToken);
    if (!storedToken) {
      throw createError({
        statusCode: 403,
        statusMessage: "Refresh token tidak valid."
      });
    }
    let decoded;
    try {
      decoded = decodeRefreshToken(refreshToken);
    } catch (error) {
      throw createError({
        statusCode: 403,
        statusMessage: "Refresh token tidak valid."
      });
    }
    const user = await User.getUserById(decoded.id);
    if (!user) {
      throw createError({
        statusCode: 403,
        statusMessage: "Pengguna tidak valid dengan refresh token."
      });
    }
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    return ResponseHandler.sendSuccess(
      event,
      "Token akses baru berhasil dibuat!",
      {
        access_token: accessToken
      },
      200
    );
  } catch (error) {
    console.error("Error saat refresh token:", error);
    return ErrorHandler.handleError(event, error);
  }
});

const refresh_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: refresh_get
});

const register_post = defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    if (!data.email || !data.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Harap berikan semua kolom yang diperlukan (email dan kata sandi)."
      });
    }
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const user = await User.registerUser({
      email: data.email,
      password: hashedPassword
    });
    return ResponseHandler.sendCreated(
      event,
      "Pengguna berhasil terdaftar!",
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      },
      201
      // Status kode
    );
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: register_post
});

class BookingLog {
  // Simpan log perubahan status booking
  static async createLog(bookingId, status, description) {
    return prisma.bookingLog.create({
      data: {
        bookingId,
        status,
        description
      }
    });
  }
  // Ambil semua log berdasarkan `bookingId`
  static async getLogsByBookingId(bookingId) {
    return prisma.bookingLog.findMany({
      where: { bookingId },
      orderBy: { createdAt: "desc" }
    });
  }
}

class BookingLogger {
  static async logStatusChange(bookingId, newStatus, message) {
    await BookingLog.createLog(bookingId, newStatus, message);
  }
}

const activate_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Pesanan ID tidak valid." });
  }
  const existingBooking = await Booking.getBookingById(id);
  if (!existingBooking) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Pesanan tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "ACTIVE";
  if (!Object.values(BookingStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  await BookingLogger.logStatusChange(id, rawStatus, `Status booking berubah menjadi ${rawStatus}`);
  const updatedBooking = await Booking.updateBookingStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedBooking };
});

const activate_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: activate_patch
});

const complete_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Pesanan ID tidak valid." });
  }
  const existingBooking = await Booking.getBookingById(id);
  if (!existingBooking) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Pesanan tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "COMPLETED";
  if (!Object.values(BookingStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  await BookingLogger.logStatusChange(id, rawStatus, `Status booking berubah menjadi ${rawStatus}`);
  const updatedBooking = await Booking.updateBookingStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedBooking };
});

const complete_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: complete_patch
});

const confirm_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Pesanan ID tidak valid." });
  }
  const existingBooking = await Booking.getBookingById(id);
  if (!existingBooking) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Pesanan tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "CONFIRMED";
  if (!Object.values(BookingStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  await BookingLogger.logStatusChange(id, rawStatus, `Status booking berubah menjadi ${rawStatus}`);
  const updatedBooking = await Booking.updateBookingStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedBooking };
});

const confirm_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: confirm_patch
});

const index_delete$8 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const deletedBooking = await Booking.deleteBooking(id);
    return ResponseHandler.sendSuccess(event, "Data pemesanan berhasil dihapus!", deletedBooking, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_delete$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_delete$8
});

const index_get$c = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const bookingById = await Booking.getBookingById(id);
    return ResponseHandler.sendSuccess(event, "Data pemesanan ditemukan!", bookingById, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
});

const index_put$8 = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const userId = (_c = (_b = event.context.auth) == null ? void 0 : _b.user) == null ? void 0 : _c.id;
    const data = await readBody(event);
    const updatedBooking = await Booking.updateBooking(id, userId, data);
    return ResponseHandler.sendSuccess(event, "Data pemesanan berhasil diubah!", updatedBooking, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_put$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_put$8
});

const index_get$a = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const bookingById = await BookingLog.getLogsByBookingId(id);
    return ResponseHandler.sendSuccess(event, "Data riwayat pemesanan ditemukan!", bookingById, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const index_post$6 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const { status, description } = await readBody(event);
    if (!status || typeof status !== "string") {
      return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status booking tidak valid." });
    }
    const bookingLog = await BookingLog.createLog(id, status, description);
    return ResponseHandler.sendSuccess(event, "Riwayar pesanan berhasil dibuat!", bookingLog, 201);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$6
});

const reject_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Pesanan ID tidak valid." });
  }
  const existingBooking = await Booking.getBookingById(id);
  if (!existingBooking) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Pesanan tidak ditemukan." });
  }
  const body = await readBody(event);
  let rawStatus = ((_c = body == null ? void 0 : body.status) == null ? void 0 : _c.trim().toUpperCase()) || "CANCELLED";
  if (!Object.values(BookingStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  await BookingLogger.logStatusChange(id, rawStatus, `Status booking berubah menjadi ${rawStatus}`);
  const updatedBooking = await Booking.updateBookingStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedBooking };
});

const reject_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reject_patch
});

const index_post$4 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const data = await readBody(event);
    const booking = await Booking.createBooking(data, userId);
    return ResponseHandler.sendSuccess(event, "Pesanan berhasil dibuat!", booking, 201);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

const myBookings_get = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const { data, meta } = await Booking.getTenantBookings(userId, page, limit);
    return ResponseHandler.sendSuccess(event, "Data pesanan ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const myBookings_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: myBookings_get
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Profile {
}
__publicField(Profile, "createProfile", async (userId, data) => {
  return prisma.profile.create({
    data: {
      userId,
      name: data.name,
      phone: data.phone,
      address: data.address
    }
  });
});
__publicField(Profile, "getProfileByUserId", async (userId) => {
  return prisma.profile.findUnique({
    where: { userId }
  });
});
__publicField(Profile, "updateProfile", async (userId, data) => {
  return prisma.profile.update({
    where: { userId },
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address
    }
  });
});
__publicField(Profile, "deleteProfile", async (userId) => {
  return prisma.profile.delete({
    where: { userId }
  });
});

const index_delete$6 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const deletedProfile = await Profile.deleteProfile(userId);
    return ResponseHandler.sendSuccess(event, "Profile berhasil dihapus!", deletedProfile, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_delete$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_delete$6
});

const index_get$8 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const profile = await Profile.getProfileByUserId(userId);
    return ResponseHandler.sendSuccess(event, "Profile ditemukan!", profile, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$8
});

const index_post$2 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const data = await readBody(event);
    const profile = await Profile.createProfile(userId, data);
    return ResponseHandler.sendSuccess(event, "Profile berhasil dibuat!", profile, 201);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

const index_put$6 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const data = await readBody(event);
    const updatedProfile = await Profile.updateProfile(userId, data);
    return ResponseHandler.sendSuccess(event, "Profile berhasil diperbarui!", updatedProfile, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_put$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_put$6
});

const index_delete$4 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const deletedProperties = await Property.deleteProperty(id);
    return ResponseHandler.sendSuccess(event, "Properti berhasil dihapus!", deletedProperties, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_delete$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_delete$4
});

const index_get$6 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const propertyById = await Property.getPropertyById(id);
    return ResponseHandler.sendSuccess(event, "Properti ditemukan!", propertyById, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$6
});

var _a, _b, _c;
const config = useRuntimeConfig();
v2.config({
  cloud_name: (_a = config.CLOUDINARY_CLOUD_NAME) != null ? _a : "",
  api_key: (_b = config.CLOUDINARY_API_KEY) != null ? _b : "",
  api_secret: (_c = config.CLOUDINARY_API_SECRET) != null ? _c : ""
});

const uploadFile = async ({ fileBuffer, filename, mimeType }) => {
  try {
    return await new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: filename,
          format: mimeType.split("/")[1] || "jpg",
          asset_folder: "kozy-hive"
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            result ? resolve(result) : reject(new Error("Upload failed: result is undefined"));
          }
        }
      );
      const bufferStream = Readable.from(fileBuffer);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    throw error;
  }
};

const index_put$4 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const user = (_a = event.context.auth) == null ? void 0 : _a.user;
    if (!user) {
      return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User not authenticated." });
    }
    const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
    if (isNaN(id)) {
      return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
    }
    const existingProperty = await Property.getPropertyById(id);
    if (!existingProperty) {
      return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
    }
    if (existingProperty.ownerId !== user.id) {
      return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Tidak memiliki izin untuk update properti ini." });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) {
      return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "No form data provided." });
    }
    const payload = {};
    let uploadResult;
    for (const field of formData) {
      const { name, data, filename, type } = field;
      if (typeof name !== "string") continue;
      if (filename) {
        const fileBuffer = data;
        const fileName = `${filename.replace(/\s/g, "_")}_${Date.now()}`;
        try {
          uploadResult = await uploadFile({
            fileBuffer,
            filename: fileName,
            mimeType: type
          });
          if (!uploadResult || !uploadResult.secure_url) {
            throw new Error("Gagal mengupload gambar.");
          }
          payload.images = uploadResult.secure_url;
        } catch (uploadError) {
          return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: uploadError.message || "Gagal mengupload gambar." });
        }
      } else if (data) {
        switch (name) {
          case "name":
            payload.name = data.toString("utf-8").trim();
            break;
          case "description":
            payload.description = data.toString("utf-8").trim();
            break;
          case "address":
            payload.address = data.toString("utf-8").trim();
            break;
          case "city":
            payload.city = data.toString("utf-8").trim();
            break;
          case "price":
            payload.price = parseFloat(data.toString("utf-8").trim());
            break;
          case "totalRooms":
            payload.totalRooms = parseInt(data.toString("utf-8").trim(), 10);
            break;
          case "availableRooms":
            payload.availableRooms = parseInt(data.toString("utf-8").trim(), 10);
            break;
          case "status":
            const rawStatus = data.toString("utf-8").trim().toUpperCase();
            payload.status = rawStatus === "ACTIVE" ? PropertyStatus.ACTIVE : PropertyStatus.INACTIVE;
            break;
        }
      }
    }
    try {
      const updatedProperty = await Property.updateProperty(id, payload);
      return { code: 200, message: "Properti berhasil diperbarui!", data: updatedProperty };
    } catch (dbError) {
      return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: dbError.message || "Gagal memperbarui properti di database." });
    }
  } catch (error) {
    return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: error.message || "Internal Server Error" });
  }
});

const index_put$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_put$4
});

const status_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = (_a = event.context.auth) == null ? void 0 : _a.user;
  if (!user) {
    return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
  }
  const id = parseInt((_b = event.context.params) == null ? void 0 : _b.id);
  if (isNaN(id)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
  }
  const existingProperty = await Property.getPropertyById(id);
  if (!existingProperty) {
    return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
  }
  const body = await readBody(event);
  const rawStatus = (_c = body.status) == null ? void 0 : _c.trim().toUpperCase();
  if (!rawStatus || !Object.values(PropertyStatus).includes(rawStatus)) {
    return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
  }
  const updatedProperty = await Property.updatePropertyStatus(id, rawStatus);
  return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedProperty };
});

const status_patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: status_patch
});

const cities_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const citiesQuery = query.search;
    const { data, meta } = await Property.filterPropertiesByCity(citiesQuery, page, limit);
    return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const cities_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: cities_get
});

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const { data, meta } = await Property.getAllProperties(page, limit);
    return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const index_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const user = (_a = event.context.auth) == null ? void 0 : _a.user;
    if (!user) {
      return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User not authenticated." });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) {
      return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "No form data provided." });
    }
    const payload = {
      ownerId: user.id,
      name: "",
      description: "",
      address: "",
      city: "",
      price: 0,
      totalRooms: 1,
      availableRooms: 1,
      status: PropertyStatus.INACTIVE,
      images: ""
    };
    let uploadResult;
    for (const field of formData) {
      const { name, data, filename, type } = field;
      if (typeof name !== "string") continue;
      if (filename) {
        const fileBuffer = data;
        const fileName = `${filename.replace(/\s/g, "_")}_${Date.now()}`;
        try {
          uploadResult = await uploadFile({
            fileBuffer,
            filename: fileName,
            mimeType: type
          });
          if (!uploadResult || !uploadResult.secure_url) {
            throw new Error("Gagal mengupload gambar.");
          }
          payload.images = uploadResult.secure_url;
        } catch (uploadError) {
          return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: uploadError.message || "Gagal mengupload gambar." });
        }
      } else if (data) {
        switch (name) {
          case "name":
            payload.name = data.toString("utf-8").trim();
            break;
          case "description":
            payload.description = data.toString("utf-8").trim();
            break;
          case "address":
            payload.address = data.toString("utf-8").trim();
            break;
          case "city":
            payload.city = data.toString("utf-8").trim();
            break;
          case "price":
            payload.price = parseFloat(data.toString("utf-8").trim());
            break;
          case "totalRooms":
            payload.totalRooms = parseInt(data.toString("utf-8").trim(), 10);
            break;
          case "availableRooms":
            payload.availableRooms = parseInt(data.toString("utf-8").trim(), 10);
            break;
          case "status":
            const rawStatus = data.toString("utf-8").trim().toUpperCase();
            payload.status = rawStatus === "INACTIVE" ? PropertyStatus.INACTIVE : PropertyStatus.ACTIVE;
            break;
        }
      }
    }
    if (!payload.name || !payload.description || !payload.address || !payload.city || !payload.price) {
      return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Semua field wajib diisi!" });
    }
    try {
      const newProperty = await Property.createProperty(payload);
      return { code: 201, message: "Properti berhasil ditambahkan!", data: newProperty };
    } catch (dbError) {
      return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: dbError.message || "Gagal menyimpan properti ke database." });
    }
  } catch (error) {
    return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: error.message || "Internal Server Error" });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

const myProperties_get = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const { data, meta } = await Property.getMyProperties(userId, page, limit);
    return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const myProperties_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: myProperties_get
});

const search_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const searchQuery = typeof query.q === "string" ? query.q.trim() : "";
    if (!searchQuery || searchQuery.length < 1) {
      throw { statusCode: 400, statusMessage: "Query pencarian tidak boleh kosong." };
    }
    const { data, meta } = await Property.searchProperties(searchQuery, page, limit);
    return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const search_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: search_get
});

const index_delete$2 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const deletedUser = await User.deleteUser(id);
    return ResponseHandler.sendSuccess(event, "Pengguna berhasil dihapus!", deletedUser, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_delete$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_delete$2
});

const index_get$2 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const userById = await User.getUserById(id);
    return ResponseHandler.sendSuccess(event, "Pengguna ditemukan!", userById, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const index_put$2 = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt((_a = event.context.params) == null ? void 0 : _a.id);
    const data = await readBody(event);
    const updatedUser = await User.updateUser(id, data);
    return ResponseHandler.sendSuccess(event, "Pengguna berhasil diubah!", updatedUser, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_put$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_put$2
});

const index = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const { page, limit } = Pagination.getPagination(query);
    const total = await User.countUsers();
    const { data, meta } = await User.getAllUsers(page, limit);
    return ResponseHandler.sendSuccess(event, "Data user ditemukan!", data, 200, meta);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const index_delete = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const deletedProfile = await User.deleteUser(userId);
    return ResponseHandler.sendSuccess(event, "Pengguna berhasil dihapus!", deletedProfile, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_delete
});

const index_get = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const userById = await User.getUserById(userId);
    return ResponseHandler.sendSuccess(event, "Pengguna ditemukan!", userById, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const index_put = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const userId = (_b = (_a = event.context.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
    const data = await readBody(event);
    console.log(`\u{1F539} ID pengguna yang diupdate: ${userId}`);
    console.log(`\u{1F539} Data yang akan diupdate:`, data);
    const updatedUser = await User.updateUser(userId, data);
    return ResponseHandler.sendSuccess(event, "Pengguna berhasil diubah!", updatedUser, 200);
  } catch (error) {
    return ErrorHandler.handleError(event, error);
  }
});

const index_put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_put
});

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});
//# sourceMappingURL=index.mjs.map
