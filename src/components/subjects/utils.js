const maxYear = 2021;

const genders = ["male", "female", "total"];
const candidateTypes = ["daySchoolCandidates", "allCandidates"];

function getYearsFrom(start) {
    let years = [];
    for (let i = start; i <= maxYear; i++) {
        years.push(i.toString());
    }
    years.reverse();
    return years;
}

function getStats(years, basePath) {
    let stats = {};
    for (let year of years) {
        stats[year] = {};
        for (let candidateType of candidateTypes) {
            stats[year][candidateType] = require(
                `../../data/${year}/${basePath}/${candidateType}.json`
            );
        }
    }
    return stats;
}

function getSubjectsAndSubcategories(years, stats) {
    let subjectSet = new Set();
    let subcategories = {};
    for (let year of years) {
        for (let candidateType of candidateTypes) {
            for (let data of stats[year][candidateType]) {
                subjectSet.add(data.subject);
                if (data.subcategory) {
                    if (!(data.subject in subcategories)) {
                        subcategories[data.subject] = new Set();
                    }
                    subcategories[data.subject].add(data.subcategory);
                }
            }
        }
    }

    const subjects = Array.from(subjectSet);
    for (let subject in subcategories) {
        subcategories[subject] = Array.from(subcategories[subject]);
    }

    return [subjects, subcategories];
}

const initState = {
    subject: "null",
    subcategory: "null",
    year: "null",
    gender: "null",
    candidateType: candidateTypes[0]
};

function stateToSearchParams(state) {
    let params = {};
    if (state.subject !== "null") params.subject = state.subject;
    if (state.subcategory !== "null") params.subcategory = state.subcategory;
    if (state.year !== "null") params.year = state.year;
    if (state.gender !== "null") params.gender = state.gender;
    if (state.candidateType !== candidateTypes[0]) params.candidateType = state.candidateType;
    return params;
}

export { genders, candidateTypes, getYearsFrom, getStats, getSubjectsAndSubcategories, initState, stateToSearchParams };
