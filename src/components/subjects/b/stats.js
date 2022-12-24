import { getStats, getSubjectsAndSubcategories, getYearsFrom } from '../common/utils';

const grades = [
    "Attained with Distinction (II)",
    "Attained with Distinction (I) or above",
    "Attained or above",
    "Unattained"
];

// Attained with Distinction (I) & (II) was introduced in 2018
const years = getYearsFrom(2018);
const stats = getStats(years, "subjects/b");
const [subjects, subcategories] = getSubjectsAndSubcategories(years, stats);

function getAvailableSubcategories(subject) {
    return (subject in subcategories) ? subcategories[subject] : [];
}

export { grades, years, subjects, subcategories, stats, getAvailableSubcategories };
