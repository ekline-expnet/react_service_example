import { useState, useEffect } from 'react';
import { getCache, subscribeToCache } from './cache_service';

export function useCache(cacheName, defaultValue) {
  const [value, setValue] = useState(getCache, defaultValue);
  
  useEffect(()=>{
    const handleEvent = (val)=>{
      setValue(val);
    }
    return subscribeToCache(cacheName, handleEvent);
  });
  return value;
}