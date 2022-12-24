import React from 'react';
import Col from 'react-bootstrap/col';
import Form from 'react-bootstrap/form';
import Row from 'react-bootstrap/row';
import { useTranslation } from 'react-i18next';
import { candidateTypes, genders } from '../common/utils';

function SubjectsForm(props) {
    function handleChange(event) {
        props.handleChange(event.target.name, event.target.value);
    }

    const { t } = useTranslation();
    const { params, subjects, years, availableSubcategories } = props;

    return (
        <Form>
            <Row>
                <Col md={6} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("heading.subject")}</Form.Label>
                        <Form.Select name="subject" value={params.subject}
                            onChange={handleChange}>
                            <option value="null">-</option>
                            {
                                subjects.map((s) =>
                                    <option key={s} value={s}>{t(s)}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                    {availableSubcategories.length === 0 &&
                        <Form.Group className="mb-3">
                            <Form.Label>{t("heading.subcategory")}</Form.Label>
                            <Form.Select name="subcategory" value={params.subcategory}
                                onChange={handleChange} disabled>
                                <option value="null">-</option>
                            </Form.Select>
                        </Form.Group>
                    }
                    {availableSubcategories.length > 0 &&
                        <Form.Group className="mb-3">
                            <Form.Label>{t("heading.subcategory")}</Form.Label>
                            <Form.Select name="subcategory" value={params.subcategory}
                                onChange={handleChange}>
                                <option value="null">-</option>
                                {
                                    availableSubcategories.map((s) =>
                                        <option key={s} value={s}>{t(s)}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    }
                </Col>
                <Col md={6} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("heading.year")}</Form.Label>
                        <Form.Select name="year" value={params.year}
                            onChange={handleChange}>
                            <option value="null">-</option>
                            {
                                years.map((y) =>
                                    <option key={y.toString()} value={y.toString()}>{y}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("heading.gender")}</Form.Label>
                        <Form.Select name="gender" value={params.gender}
                            onChange={handleChange}>
                            <option value="null">-</option>
                            {genders.map((g) =>
                                <option key={g} value={g}>{t(`gender.${g}`)}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("heading.candidateType")}</Form.Label>
                        <Form.Select name="candidateType" value={params.candidateType}
                            onChange={handleChange}>
                            {candidateTypes.map((c) =>
                                <option key={c} value={c}>{t(`candidateType.${c}`)}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default SubjectsForm;
