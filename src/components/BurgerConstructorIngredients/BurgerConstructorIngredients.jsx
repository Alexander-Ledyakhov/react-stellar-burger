import styles from "./BurgerConstructorIngredients.module.css"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from 'react-dnd'
import { useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT, CHANGE_ORDER_INGREDIENT} from '../../services/actions/constructorIngredients';
import { ingredientObjectPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";


export function BurgerConstructorIngredients({ index, ingredient }) {

  const ingredientID = ingredient.key
  const ingredientItem = ingredient.item

  const dispatch = useDispatch();
  const ref = useRef(null)


  const removeIngredient = (item) => {
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
    hover(item) {
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

  const refDragDrop = drag(drop(ref))
    

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


BurgerConstructorIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    item: PropTypes.shape(ingredientObjectPropType.isRequired).isRequired, 
    key: PropTypes.string
  }).isRequired
}