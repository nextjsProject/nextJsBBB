import { useState } from 'react';
import LocationFinder from '@/components/LocationFinder';

export function useToggle(initialState) {
  const [value, setValue] = useState(initialState);
  const toggle = () => setValue((current) => !current);
  LocationFinder.showUserLocation;
  return [value, toggle, setValue];
}
