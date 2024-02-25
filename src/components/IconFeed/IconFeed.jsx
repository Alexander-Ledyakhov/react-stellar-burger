import styles from './iconFeed.module.css';

const IconFeed = ({ingredients}) => {

    return (
        <div className={styles.iconFeed_imgBorder}>
            <div className={styles.iconFeed_imgBackground}>
                <img className={styles.iconFeed_img} src={ingredients.image} alt={`иконка ингридиента "${ingredients.name}"`}/>
            </div>
        </div>
    )
}

export default IconFeed