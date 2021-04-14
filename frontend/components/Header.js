import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => (
    <div style={{ transform: 'skew(-0.1deg)' }}>
        <Navbar expand="lg">
            <Navbar.Brand href="/">
                <img src="/favicon2.ico" width="25" height="25" alt=""/>
            </Navbar.Brand>
            <Navbar.Brand href="/" style={{ color: 'white'}}>All About Harry Potter</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="navText">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/series">Series</Nav.Link>
                    <Nav.Link href="/character">Character</Nav.Link>
                    <NavDropdown title="Activity" id="basic-nav-dropdown" > 
                        <NavDropdown.Item href="/novel" >Random Novel</NavDropdown.Item>
                        <NavDropdown.Item href="/balance">Balance Game</NavDropdown.Item>
                        <NavDropdown.Item href="/deathEaters">DeathEaters Test</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
)

export default Header;