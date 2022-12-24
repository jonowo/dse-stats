import { genders, candidateTypes, years } from './stats';

const grades = ["Attained with Distinction", "Attained or above", "Unattained"];

let stats = {};
for (let year of years) {
    stats[year] = {};
    for (let candidateType of candidateTypes) {
        stats[year][candidateType] = require(
            `../../../data/${year}/subjects/b-chinese/${candidateType}.json`
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

    // Put All as the final subcategory
    subcategories[subject].splice(subcategories[subject].indexOf("All"), 1);
    subcategories[subject].push("All");
}

function getAvailableSubcategories(subject) {
    if (subject in subcategories) {
        return subcategories[subject];
    } else {
        return [];
    }
}

export { grades, genders, candidateTypes, years, subjects, subcategories, stats, getAvailableSubcategories };
