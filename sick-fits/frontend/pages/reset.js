import PropTypes from 'prop-types';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => (
  <div>
    <Reset resetToken={query.resetToken} />
  </div>
);

ResetPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default ResetPage;
