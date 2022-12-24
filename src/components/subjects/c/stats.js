import { getStats, getSubjectsAndSubcategories, getYearsFrom } from "../common/utils";

const grades = ["a", "b+", "c+", "d+", "e+", "U"];

const years = getYearsFrom(2017);
const stats = getStats(years, "subjects/c");
const [subjects, subcategories] = getSubjectsAndSubcategories(years, stats);

function getAvailableSubcategories(subject) {
    return (subject in subcategories) ? subcategories[subject] : [];
}

export { grades, years, subjects, subcategories, stats, getAvailableSubcategories };
