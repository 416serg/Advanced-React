import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>👇🏼</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserPermissions key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    // eslint-disable-next-line
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let { permissions } = this.state;
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      permissions.push(checkbox.value);
    } else {
      permissions = permissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions });
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ permissions, userId: user.id }}>
        {(updatePermissions, { loading, error }) => (
          <React.Fragment>
            {error && (
              <tr>
                <td colSpan="9">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                  Updat
                  {loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
