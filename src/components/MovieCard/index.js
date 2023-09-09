import Image from 'next/image';
import styles from './index.module.scss';
import { options } from '@/utils/api-config';
import Link from 'next/link';

export default function MovieCard({ element }) {
    return (
        <Link href={`movies/${element.id}`}>
            <div className={styles.card}>
                <div>
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
                        width={300}
                        height={300}
                    />
                </div>
                <b>{element.title}</b>
            </div>
        </Link>
    );
}
