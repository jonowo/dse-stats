import { getStats, getSubjectsAndSubcategories, getYearsFrom } from '../common/utils';

const grades = ["5**", "5*+", "5+", "4+", "3+", "2+", "1+", "U"];

const years = getYearsFrom(2017);
const stats = getStats(years, "subjects/a");
const [subjects, subcategories] = getSubjectsAndSubcategories(years, stats);

function getAvailableSubcategories(subject) {
    return (subject in subcategories) ? subcategories[subject] : [];
}

export { grades, years, subjects, subcategories, stats, getAvailableSubcategories };
