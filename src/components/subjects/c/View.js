import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import SubjectsCForm from './Form';
import SubjectsCTable from './Table';
import { getAvailableSubcategories, subjects, years } from './stats';
import { candidateTypes, genders, initState, stateToSearchParams } from '../utils';

function searchParamsToState(params) {
    const state = Object.assign({}, initState);

    if (subjects.includes(params.get("subject"))) {
        state.subject = params.get("subject");
        if (getAvailableSubcategories(state.subject).includes(params.get("subcategory"))) {
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

function SubjectsCView(props) {
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
                <h3>{t("menu.subjectsC")}</h3>
                <SubjectsCForm handleChange={handleChange} params={state}
                    availableSubcategories={getAvailableSubcategories(state.subject)} />
                <SubjectsCTable params={state} />
            </Row>
        </>
    );
}

export default SubjectsCView;
