import styles from './index.module.scss';

export default function MovieCard({ element }) {
    return <div className={styles.card}>{element.id}</div>;
}
