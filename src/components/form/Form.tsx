import React, { useState } from 'react';
import axios from 'axios';
import { LocationContextType } from '../../lib/useLocation';
import { useLocation } from '../../lib/useLocation';
import Loader from '../Loader';
import styles from './Form.module.css';

const Form: React.FC = () => {
  const [alert, setAlert] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setLocations,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    range,
    setRange,
  } = useLocation() as LocationContextType;

  const geolocationAPI = navigator.geolocation;

  // get current location
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setAlert(
        'Geolocation API is not available in your browser!'
      );
    } else {
      setAlert('');
      setLatitude('');
      setLongitude('');
      setLocations([]);
      setLoading(true);
      geolocationAPI.getCurrentPosition(
        position => {
          const { coords } = position;
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
          setLoading(false);
        },
        error => {
          setAlert(
            'Something went wrong getting your position!'
          );
        }
      );
    }
  };

  // search for locations
  const handleSubmit = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    setLocations([]);
    setLoading(true);
    const res = await axios.get(
      `https://pinballmap.com/api/v1/locations/closest_by_lat_lon?lat=${latitude}&lon=${longitude}&max_distance=${range}&send_all_within_distance=${range}.json`
    );

    setLocations(res?.data?.locations);
    setAlert('');
    setLoading(false);

    if (
      (!loading && !res?.data?.locations) ||
      (!loading && res?.data?.locations.length === 0)
    ) {
      setAlert('Nothing found, please try again');
    }
  };

  // clear all inputs and list of locations
  const handleClear = () => {
    setAlert('');
    setLocations([]);
    setLatitude('');
    setLongitude('');
    setLoading(false);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <h1>PinBallMap</h1>
        <p className={styles.alert}>{alert}</p>
        <form
          onSubmit={handleSubmit}
          className={styles.searchForm}
        >
          <button
            className={styles.clearBtn}
            type='button'
            aria-label='Clear'
            onClick={handleClear}
          >
            Clear &times;
          </button>
          <div className={styles.inputFields}>
            <div>
              <input
                name='latitude'
                type='text'
                placeholder='Latitude'
                className={styles.inputField}
                value={latitude !== null ? latitude : ''}
                onChange={e => setLatitude(e.target.value)}
              />
              <input
                name='longitude'
                type='text'
                placeholder='Longitude'
                className={styles.inputField}
                value={longitude !== null ? longitude : ''}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
            <fieldset className={styles.rangeSelect}>
              <label htmlFor='range-select'>
                Range &nbsp;
              </label>
              <div>
                <select
                  id='range-select'
                  className={styles.rangeSelectInput}
                  onChange={e => setRange(+e.target.value)}
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                </select>
                &nbsp;
                <span>mi</span>
              </div>
            </fieldset>
          </div>

          <button
            type='button'
            value='Use my location'
            className={styles.locationBtn}
            aria-label='Use my location'
            disabled={loading}
            onClick={getUserCoordinates}
          >
            Use my location
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            aria-label='Submit'
            disabled={!latitude || !longitude || loading}
          >
            Search
          </button>
        </form>
      </div>
      <Loader loading={loading} />
    </>
  );
};

export default Form;
