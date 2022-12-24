import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import SubjectsForm from '../common/Form';
import SubjectsATable from './Table';
import { getAvailableSubcategories, subjects, years } from './stats';
import { candidateTypes, genders, initState, stateToSearchParams } from '../common/utils';

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

function SubjectsAView(props) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(searchParamsToState(searchParams));

    // Update state if search params changed (from example or nav link)
    useEffect(() => setState(searchParamsToState(searchParams)), [searchParams]);
    // Update search params if state changed (from form update)
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
                <h3>{t("menu.subjectsA")}</h3>
                <SubjectsForm handleChange={handleChange}
                    params={state} subjects={subjects} years={years}
                    availableSubcategories={getAvailableSubcategories(state.subject)} />
                <SubjectsATable params={state} />
            </Row>
        </>
    );
}

export default SubjectsAView;
