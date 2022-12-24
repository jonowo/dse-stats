import { getStats, getSubjectsAndSubcategories } from '../common/utils';
import { years } from './stats';

const grades = [
    "Attained with Distinction",
    "Attained or above",
    "Unattained"
];

const stats = getStats(years, "subjects/b-chinese");
const [subjects, subcategories] = getSubjectsAndSubcategories(years, stats);

{
    // Put All as the final subcategory
    let subject = "Applied Learning Chinese (for non-Chinese speaking students)";
    subcategories[subject].splice(subcategories[subject].indexOf("All"), 1);
    subcategories[subject].push("All");
}

function getAvailableSubcategories(subject) {
    return (subject in subcategories) ? subcategories[subject] : [];
}

export { grades, years, subjects, subcategories, stats, getAvailableSubcategories };
