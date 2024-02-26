import styles from './iconFeed.module.css';

const IconFeed = ({image, name}) => {

    return (
        <div className={styles.iconFeed_imgBorder}>
            <div className={styles.iconFeed_imgBackground}>
                <img className={styles.iconFeed_img} src={image} alt={`иконка ингридиента "${name}"`}/>
            </div>
        </div>
    )
}

export default IconFeed