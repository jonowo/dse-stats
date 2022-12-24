import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import SubjectsBForm from './Form';
import SubjectsBTable from './Table';
import SubjectsBChineseTable from './chineseTable';
import { candidateTypes, genders, getAvailableSubcategories, subjects, years } from './stats';
import { getAvailableSubcategories as getAvailableChineseSubcategories, subjects as chineseSubjects } from './chineseStats';

function searchParamsToState(params) {
    const state = {
        subject: "null",
        subcategory: "null",
        year: "null",
        gender: "null",
        candidateType: candidateTypes[0]
    };

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

function stateToSearchParams(state) {
    let params = {};
    if (state.subject !== "null") params.subject = state.subject;
    if (state.subcategory !== "null") params.subcategory = state.subcategory;
    if (state.year !== "null") params.year = state.year;
    if (state.gender !== "null") params.gender = state.gender;
    if (state.candidateType !== candidateTypes[0]) params.candidateType = state.candidateType;
    return params;
}

function SubjectsBView(props) {
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
            <SubjectsBForm handleChange={handleChange} params={state}
                availableSubcategories={chineseSubjects.includes(state.subject)
                    ? getAvailableChineseSubcategories(state.subject)
                    : getAvailableSubcategories(state.subject)} />

            {chineseSubjects.includes(state.subject)
                ? <SubjectsBChineseTable params={state} />
                : <SubjectsBTable params={state} />}
        </>
    );
}

export default SubjectsBView;
