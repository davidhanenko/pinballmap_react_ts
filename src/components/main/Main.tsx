import Form from '../form/Form';
import List from '../list/List';
import styles from './Main.module.css';

const Main = () => {
  return (
    <main className={styles.mainContainer}>
      <Form />
      <List />
    </main>
  );
};

export default Main;
