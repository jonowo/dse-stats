import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import TextTooltip from './TextTooltip';

function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <Row className="mb-3">
                <h3>{t("availableStatistics.title")}</h3>
                <Col lg={4} md={6}>
                    <ListGroup>
                        <ListGroup.Item action onClick={() => navigate("/subjects/a")}>
                            {t("menu.subjectsA")}
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => navigate("/subjects/b")}>
                            {t("menu.subjectsB")}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <h3>{t("about.title")}</h3>
            <p>
                <Trans i18nKey="about.part1">
                    <TextTooltip text="Hong Kong Diploma of Secondary Education"></TextTooltip>
                    <TextTooltip text="Hong Kong Examinations and Assessment Authority"></TextTooltip>
                </Trans>
            </p>
            {/* <p>
                {t("about.part2")}
            </p> */}
            <p>
                <Trans i18nKey="about.part3">
                    <a href="https://t.me/jowonowo" target="_blank" rel="noreferrer"></a>
                </Trans>
            </p>
            <p>
                {t("about.part4")}
            </p>
            <p>
                {t("about.part5")}
                <a href="https://github.com/jonowo/dse-stats" target="_blank" rel="noreferrer">
                    jonowo/dse-stats
                </a>
                <br />
                {t("about.part6")}
                <a href="https://github.com/jonowo/dse-stats-json" target="_blank" rel="noreferrer">
                    jonowo/dse-stats-json
                </a>
            </p>
        </>
    );
}

export default Home;
