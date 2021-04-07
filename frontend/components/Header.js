import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => (
    <div>
        <Navbar expand="lg">
            <Navbar.Brand href="/">
                <img src="/favicon2.ico" width="25" height="25" alt=""/>
            </Navbar.Brand>
            <Navbar.Brand href="/" style={{ color: 'white'}}>All About Harry Potter</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/series">해리포터 시리즈 분석</Nav.Link>
                    <Nav.Link href="/character" >해리포터 캐릭터 분석</Nav.Link>
                    <NavDropdown title="유저상호작용" id="basic-nav-dropdown" > 
                        <NavDropdown.Item href="/letter" >랜덤편지</NavDropdown.Item>
                        <NavDropdown.Item href="/balance">밸런스 게임</NavDropdown.Item>
                        <NavDropdown.Item href="#">친구찾기</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
)

export default Header;