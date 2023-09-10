import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function MovieCard({
    element,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
}) {
    const [wishlist, setWishlist] = useState(isInWishlist);

    function handleWishlist() {
        wishlist ? removeFromWishlist(element.id) : addToWishlist(element.id);
        setWishlist(!wishlist);
    }

    return (
        <div className={styles.cardWrapper}>
            <Link href={`movies/${element.id}`}>
                <div className={styles.card}>
                    <div>
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
                            alt={element.title}
                            width={300}
                            height={300}
                        />
                    </div>
                    <b>{element.title}</b>
                </div>
            </Link>
            <button onClick={handleWishlist}>
                {wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>
        </div>
    );
}
