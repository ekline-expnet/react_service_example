import { get, set } from 'lodash';
import { EventEmitter2 } from 'eventemitter2';


const Cache = {};

const CacheEvents = new EventEmitter2();

export const setCache = (cacheName, value) => {
  const ret = set(Cache, cacheName, value);
  CacheEvents.emit(cacheName, value);
  return ret;
}

export const getCache = (cacheName, defaultValue) => {
  return get(Cache, cacheName, defaultValue);
}



export const subscribeToCache = (cacheName, handleEvent) => {
  CacheEvents.on(cacheName, handleEvent);
  return ()=>{
    CacheEvents.off(cacheName, handleEvent);
  }
}