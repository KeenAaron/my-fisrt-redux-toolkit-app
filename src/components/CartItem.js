import { ChevronDown, ChevronUp} from '../icons'
import { removeItem, increase, decrease, updateAmount } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
const CartItem = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch()
    
    return (
        <article className='cart-item'>
            <image src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className='item-price'>${price}</h4>
                <button 
                    className='remove-btn'
                    onClick={ () => {
                        dispatch(removeItem(id));
                    }}
                >
                    remove
                    </button>
            </div>
            <div>
                <button 
                    className='amount-btn'
                    onClick={ () => {
                        //dispatch(increase({id}));
                        dispatch(updateAmount({id, amount: 1}));
                    }}
                >
                    <ChevronUp />
                </button>
                <p className='amount'>{amount}</p>
                <button className='amount-btn'
                    onClick={ () => {
                        if (amount === 1) {
                            dispatch(removeItem(id));
                            return;
                        }
                        //dispatch(decrease({id}));
                        dispatch(updateAmount({id, amount: -1}));
                    }}
                >
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem;