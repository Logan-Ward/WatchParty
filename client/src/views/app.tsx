import { Outlet, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { StyledBackgroundContainer } from '../styles';
import { UserContext } from '../context';
import SearchBar from './search/SearchBar';
import VoiceControl from './voiceControl/VoiceControl';

function App() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    axios
      .get('/api/user')
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get('/logout')
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledBackgroundContainer fluid>
      <Navbar expand="lg" style={{ height: '10vh' }}>
        <Container>
          <Navbar.Brand to="/" as={Link}>
            WatchParty
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link hidden={!user} to="/createParty" as={Link}>
                Create Party
              </Nav.Link>
              <Nav.Link to="/profile" as={Link}>
                Profile
              </Nav.Link>
              <Nav.Link to="/calendar" as={Link}>
                Calendar
              </Nav.Link>
              <Nav.Link to="/dm" as={Link}>
                DMs
              </Nav.Link>
              <Nav.Link to="/archive" as={Link}>
                Archives
              </Nav.Link>
              <Nav.Link hidden={user} href="/auth/google">
                Login
              </Nav.Link>
              <Nav.Link hidden={!user} onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
        </Container>
      </Navbar>
      <Outlet />
      <VoiceControl />
    </StyledBackgroundContainer>
  );
}
export default App;
