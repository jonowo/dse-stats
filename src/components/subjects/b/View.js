import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
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
            <Row className="mb-3">
                <h3>{t("menu.subjectsB")}</h3>
                <SubjectsForm handleChange={handleChange}
                    params={state} subjects={subjects.concat(chineseSubjects)} years={years}
                    availableSubcategories={chineseSubjects.includes(state.subject)
                        ? getAvailableChineseSubcategories(state.subject)
                        : getAvailableSubcategories(state.subject)} />

                {chineseSubjects.includes(state.subject)
                    ? <SubjectsBChineseTable params={state} />
                    : <SubjectsBTable params={state} />}
            </Row>
        </>
    );
}

export default SubjectsBView;
