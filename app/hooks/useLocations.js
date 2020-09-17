import {useEffect, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';

export function useLocations() {
  const [locationsData, setLocationsData] = useState([]);
  const auth = useSelector((state) => state.auth);
  const locations = !isEmpty(auth.user.locations) ? auth.user.locations : [];
  useEffect(() => {
    let _locationsData = locations.map((l) => {
      return {
        label: l.name,
        value: l.id,
      };
    });
    setLocationsData(_locationsData);
  }, [locations]);

  return locationsData;
}
