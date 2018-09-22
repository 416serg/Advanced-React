import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits! | Page {page} of {pages}
            </title>
          </Head>
          <Link prefetch href={{ pathname: 'items', query: { page: page - 1 } }}>
            <a aria-disabled={page <= 1}>&larr; Prev</a>
          </Link>
          <p className="prev">
            Page of {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link prefetch href={{ pathname: 'items', query: { page: page + 1 } }}>
            <a aria-disabled={page >= pages}>Next &rarr;</a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Pagination;
