import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PleaseSignIn = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </div>
        );
      }
      return children;
    }}
  </Query>
);

PleaseSignIn.defaultProps = {
  children: {},
};

PleaseSignIn.propTypes = {
  children: PropTypes.object,
};

export default PleaseSignIn;
