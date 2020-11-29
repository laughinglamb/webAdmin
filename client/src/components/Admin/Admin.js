import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Col, Row, Button } from 'react-bootstrap'

const Admin = ({ auth: {user}, logout}) => {
  const [targetUser, setTargetUser] = useState('');
  const [value, setValue] = useState('');
  const [userData, setUser] = useState([]);
  // eslint-disable-next-line
  useEffect(async function() {
    try {
      const res = await axios.get('/api/users');
      setUser(res.data.filter(a => a.role !== 'Admin'));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ role: value });
    await axios.put(`/api/users/${targetUser}`, body, config);
  };

  return (
    <>
      <h2>Admin Dashboard</h2>
      <Container>
        <Row>
          <Col>
            <p>
              <Link to='/Manage-User-Accounts' className='btn btn-primary my-1'>
                Manage User Accounts
              </Link>
            </p>
            <p>
              <Link to='/Help-Desk' className='btn btn-primary my-1'>
                Help Desk
              </Link>
            </p>
          </Col>
          <Col md={{ span: 8, offset: 1}}>
            <form onSubmit={handleSubmit}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map(u => (
                    <tr>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{
                display: 'flex',
                justifyContent: 'spaces-between'
              }}>
                <h5>Select role of </h5>
                <select
                  value={value}
                  onChange={handleChange}
                  className='browser-default'
                  name='role'
                  required
                >
                  <option value=''>Select</option>
                  <option value='Admin'>Admin</option>
                  <option value='Finance Admin'>{' '}Finance Admin</option>
                  <option value='Sales Admin'>Sales Admin</option>
                  <option value='HR Admin'>HR Admin</option>
                  <option value='Tech Admin'>Tech Admin</option>
                  <option value='none'>None</option>
                </select>
                <h5> for user </h5>
                  <select
                      value={targetUser}
                      onChange={e => setTargetUser(e.target.value)}
                      className='browser-default'
                      name='role'
                      required
                  >
                      <option value=''>Select</option>
                      {userData.map(u => (
                          <option value={u._id}>{u.email}</option>
                      ))}
                  </select>
                  <div className='input-field col s12'></div>
                  <Button
                    variant='secondary'
                    className='btn waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Submit
                  </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(Admin);
