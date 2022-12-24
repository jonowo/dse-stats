import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import SubjectsAView from './components/subjects/a/View';
import SubjectsBView from './components/subjects/b/View';

function ToggleLanguage(props) {
    const { i18n } = useTranslation();
    if (i18n.languages[0].startsWith("en")) {
        return (
            <Navbar.Text {...props}>
                <a className="change-lang" onClick={() => i18n.changeLanguage("zh")}>中文</a>
            </Navbar.Text>
        );
    } else {
        return (
            <Navbar.Text {...props}>
                <a className="change-lang" onClick={() => i18n.changeLanguage("en")}>English</a>
            </Navbar.Text>
        );
    }
}

function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <Toaster />

            <Navbar variant="dark" expand="lg">
                <Container>
                    <div>
                        <LinkContainer to="/">
                            <Navbar.Brand onClick={() => navigate("/")}>{t("menu.title")}</Navbar.Brand>
                        </LinkContainer>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="subjects/a">
                                <Nav.Link>{t("menu.subjectsA")}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="subjects/b">
                                <Nav.Link>{t("menu.subjectsB")}</Nav.Link>
                            </LinkContainer>
                            <ToggleLanguage className="d-block d-lg-none" />
                        </Nav>
                    </Navbar.Collapse>
                    <div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <ToggleLanguage className="d-none d-lg-block" />
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

function App() {
    return (
        <>
            <Header />

            <Container className="mt-2">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="subjects">
                        <Route path="a" element={<SubjectsAView />}></Route>
                        <Route path="b" element={<SubjectsBView />} />
                    </Route>
                </Routes>
            </Container>
        </>
    );
}

export default App;
