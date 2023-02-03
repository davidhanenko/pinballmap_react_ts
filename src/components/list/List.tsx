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
            <li key={location.id}>
              {location.city} {location.name}
            </li>
          ))}
      </ul>
    </section>
  );
};

export default List;
