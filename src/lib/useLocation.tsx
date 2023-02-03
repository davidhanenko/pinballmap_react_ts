import { useContext, createContext, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

export interface ILocations {
  id: number;
  street: string;
  city: string;
  name: string;
  distance: number;
  phone: string;
}

export type LocationContextType = {
  locations: ILocations[];
  latitude: number | string | null;
  longitude: number | string | null;
  range: number;
  setLocations: (locations: ILocations[]) => void;
  setLatitude: (latitude: number | string) => void;
  setLongitude: (longitude: number | string) => void;
  setRange: (range: number) => void;
};

const LocalStateContext =
  createContext<LocationContextType | null>(null);

const LocalStateProvider = LocalStateContext.Provider;

const LocationStateProvider: React.FC<Props> = ({
  children,
}) => {
  const [locations, setLocations] = useState<ILocations[]>(
    []
  );

  const [latitude, setLatitude] = useState<
    number | string | null
  >(null);
  const [longitude, setLongitude] = useState<
    number | string | null
  >(null);
  const [range, setRange] = useState<number>(5);

  const locationsCtx: LocationContextType = {
    locations,
    setLocations,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    range,
    setRange,
  };

  return (
    <LocalStateProvider value={locationsCtx}>
      {children}
    </LocalStateProvider>
  );
};

const useLocation = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { LocationStateProvider, useLocation };
