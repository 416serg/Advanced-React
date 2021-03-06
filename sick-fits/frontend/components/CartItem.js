import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem: { quantity, id, item } }) => {
  // first check if that item exists
  if (!item)
    return (
      <CartItemStyles>
        <p>This item no longer exists</p>
        <RemoveFromCart id={id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img src={item.image} alt={item.title} width="100" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney(item.price * quantity)}
          {` - `}
          <em>
            {quantity} &times; {formatMoney(item.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
