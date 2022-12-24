import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import CopyButton from '../../CopyButton';
import SubjectsForm from '../common/Form';
import SubjectsBTable from './Table';
import SubjectsBChineseTable from './chineseTable';
import { candidateTypes, genders, initState, stateToSearchParams } from '../common/utils';
import { getAvailableSubcategories, subjects, years } from './stats';
import { getAvailableSubcategories as getAvailableChineseSubcategories, subjects as chineseSubjects } from './chineseStats';

function searchParamsToState(params) {
    const state = Object.assign({}, initState);

    if (subjects.includes(params.get("subject"))) {
        state.subject = params.get("subject");
        if (getAvailableSubcategories(state.subject).includes(params.get("subcategory"))) {
            state.subcategory = params.get("subcategory");
        }
    } else if (chineseSubjects.includes(params.get("subject"))) {
        state.subject = params.get("subject");
        if (getAvailableChineseSubcategories(state.subject).includes(params.get("subcategory"))) {
            state.subcategory = params.get("subcategory");
        }
    }

    if (years.includes(params.get("year"))) {
        state.year = params.get("year");
    }
    if (genders.includes(params.get("gender"))) {
        state.gender = params.get("gender");
    }
    if (candidateTypes.includes(params.get("candidateType"))) {
        state.candidateType = params.get("candidateType");
    }

    return state;
}

function SubjectsBView(props) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(searchParamsToState(searchParams));

    useEffect(() => setState(searchParamsToState(searchParams)), [searchParams]);
    useEffect(() => setSearchParams(stateToSearchParams(state)), [state, setSearchParams]);

    function handleChange(key, value) {
        setState((prevState) => {
            let newState = {
                ...prevState,
                [key]: value
            };
            if (key === "subject") newState.subcategory = "null";
            return newState;
        });
    }

    return (
        <>
            <Row>
                <h3>{t("title.subjectsB")}</h3>
                <SubjectsForm handleChange={handleChange}
                    params={state} subjects={subjects.concat(chineseSubjects)} years={years}
                    availableSubcategories={chineseSubjects.includes(state.subject)
                        ? getAvailableChineseSubcategories(state.subject)
                        : getAvailableSubcategories(state.subject)} />

                {
                    (state.subject === "null" && state.year === "null")
                        ? (
                            <>
                                <h5 className="mb-3">{t("table.specify")}</h5>
                                <p>
                                    <Link to="?subject=Services&subcategory=Pâtisserie+and+Café+Operations&gender=total">
                                        {t("table.showExample")}
                                    </Link>
                                </p>
                            </>
                        )
                        : (
                            <>
                                <CopyButton />
                                {(subjects.includes(state.subject) || state.subject === "null")
                                    ? <SubjectsBTable params={state} />
                                    : ""}
                                {(chineseSubjects.includes(state.subject) || state.subject === "null")
                                    ? <SubjectsBChineseTable params={state} />
                                    : ""}
                            </>
                        )
                }
            </Row>
        </>
    );
}

export default SubjectsBView;
