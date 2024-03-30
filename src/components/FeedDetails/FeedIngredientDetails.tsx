import styles from "./feedDetails.module.css"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconFeed from '../IconFeed/IconFeed'
import { FC } from "react";
import { TFeedIngredientDetails } from "../../types/functionComponentType";

export const FeedIngredientDetails:FC<TFeedIngredientDetails> = ({ingredientsItems, ingredientsObj}): JSX.Element => {
    
    const marginRight = ingredientsItems!.length > 4 ? '24px' : '0px';

    return (
        <>
                {ingredientsItems &&
                        <ul 
                            className={`mt-6 ${styles.feedDetails__ingredients} custom-scroll`} 
                        >
                                {ingredientsItems.map((ingredient) => (
                                    <li  style={{ marginRight }} key={ingredient._id} className={`${styles.feedDetails__ingredient}`} >
                                        <div className={styles.feedDetails_description}>
                                            <IconFeed image={ingredient!.image} name={ingredient!.name} key={ingredient._id}/>
                                            <p className="ml-4 text text_type_main-default">{ingredient!.name}</p>
                                        </div>
                                        <div className={styles.feedDetails_description}>
                                            <p className="mr-2 text text_type_digits-default">{(ingredientsObj) && ingredientsObj[ingredient!._id]} x {ingredient!.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </li>
                                ))}
                        </ul>
                }
        </>
    );
}
