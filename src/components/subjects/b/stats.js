const grades = ["Attained with Distinction (II)", "Attained with Distinction (I) or above", "Attained or above", "Unattained"];
const genders = ["male", "female", "total"];
const candidateTypes = ["daySchoolCandidates", "allCandidates"];

// Attained with Distinction (I) & (II) was introduced in 2018
let years = [];
for (let i = 2018; i <= 2021; i++) {
    years.push(i.toString());
}
years.reverse();

let stats = {};
for (let year of years) {
    stats[year] = {};
    for (let candidateType of candidateTypes) {
        stats[year][candidateType] = require(
            `../../../data/${year}/subjects/b/${candidateType}.json`
        );
    }
}

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

function getAvailableSubcategories(subject) {
    if (subject in subcategories) {
        return subcategories[subject];
    } else {
        return [];
    }
}

export { grades, genders, candidateTypes, years, subjects, subcategories, stats, getAvailableSubcategories };
