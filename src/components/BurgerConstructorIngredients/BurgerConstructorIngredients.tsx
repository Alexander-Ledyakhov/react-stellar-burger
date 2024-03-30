import styles from "./BurgerConstructorIngredients.module.css"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from 'react-dnd'
import { useRef, useCallback, FC, LegacyRef } from 'react'
import { REMOVE_INGREDIENT, CHANGE_ORDER_INGREDIENT} from '../../services/actions/constructorIngredients';
import { TBurgerConstructor } from "../../types/functionComponentType";
import { useAppDispatch } from "../../types/typesReact";

export const BurgerConstructorIngredients: FC<TBurgerConstructor> = ({ index, ingredient }) => {

  const ingredientID = ingredient.key
  const ingredientItem = ingredient.item

  const dispatch = useAppDispatch();
  const ref = useRef(null)

const removeIngredient = (item: string) => {
    dispatch({
        type: REMOVE_INGREDIENT,
        payload: { item },
    })
  }
  const changeOrderIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
        type: CHANGE_ORDER_INGREDIENT,
        payload: { dragIndex, hoverIndex }
    })
  }, [dispatch])



  const [{isDragging}, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { ingredientID, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? .3 : 1;

    
  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: {index: number}) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      changeOrderIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex
    }
  })

  const refDragDrop = drag(drop(ref)) as LegacyRef<HTMLLIElement> | undefined
    

  return (
      <li key={ingredientID} className={styles.constructor__item} style={{ opacity }} ref={refDragDrop}>
          <DragIcon type="primary" data-handler-id={handlerId} />
          <div className={`${styles.constructor__ingredient} ml-2`}>
              <ConstructorElement
                  text={`${ingredientItem.name} (начинка)`}
                  price={ingredientItem.price}
                  thumbnail={ingredientItem.image}
                  handleClose={() => {
                    removeIngredient(ingredientID)
                  }}/>
          </div>
      </li>
  )
}