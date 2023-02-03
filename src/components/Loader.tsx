import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = ({ loading }: any) => {
  return (
    <MagnifyingGlass
      visible={loading}
      height='60'
      width='60'
      ariaLabel='MagnifyingGlass-loading'
      wrapperStyle={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transition: 'translate(-50%, -50%)',
      }}
      wrapperClass='MagnifyingGlass-wrapper'
      glassColor='#c0efff'
      color='#f34708'
    />
  );
};

export default Loader;
