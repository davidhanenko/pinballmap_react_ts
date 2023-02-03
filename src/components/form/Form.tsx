import React, { useState } from 'react';

import styles from './Form.module.css';

const Form: React.FC = () => {
  return (
    <>
      <section className={styles.searchContainer}>
        <form className={styles.searchForm}>
          <div className={styles.inputFields}>
            <div>
              <input
                name='latitude'
                type='text'
                placeholder='Latitude'
                className={styles.inputField}
              />
              <input
                name='longitude'
                type='text'
                placeholder='Longitude'
                className={styles.inputField}
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
          >
            Use my location
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            aria-label='Submit'
          >
            Search
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
