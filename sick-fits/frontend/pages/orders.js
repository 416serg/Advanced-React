import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import Orders from '../components/Orders';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
