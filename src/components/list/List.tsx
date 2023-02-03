import React from 'react';
import {
  LocationContextType,
  useLocation,
} from '../../lib/useLocation';
import styles from './List.module.css';

const List: React.FC = () => {
  const { locations } =
    useLocation() as LocationContextType;

  return (
    <section
      className={` ${styles.listContainer}
        ${
          locations && locations.length > 0
            ? styles.listContainerIsOpen
            : ''
        }`}
    >
      <ul>
        {locations &&
          locations.length > 0 &&
          locations.map(location => (
            <li
              className={styles.locationItem}
              key={location.id}
            >
              <p className={styles.locationItemLine}>
                {location.name}
              </p>
              <p className={styles.locationItemLine}>
                {location.city}
              </p>
              <p className={styles.locationItemLine}>
                {location.street}
              </p>
              <p className={styles.locationItemLine}>
                {location.phone}
              </p>
              <p className={styles.locationItemLine}>
                {location.distance}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default List;
