import Table from 'react-bootstrap/table';
import { useTranslation } from 'react-i18next';
import { genders, grades, stats, years } from '../stats';
import CopyButton from './CopyButton';

function StatsTable(props) {
    const { t, i18n } = useTranslation();
    const { params } = props;

    if (params.subject === "null" && params.year === "null") {
        return (
            <>
                <h5 className="mb-3">{t("table.specify")}</h5>
                <p>
                    <a href="" onClick={
                        (e) => {
                            props.handleChanges({
                                subject: "Mathematics",
                                subcategory: "Compulsory Part",
                                year: "null",
                                gender: "total",
                                candidateType: "a"
                            });
                            e.preventDefault();
                        }
                    }>
                        {t("table.showExample")}
                    </a>
                </p>
            </>
        );
    }

    // Horrible code
    let hasAllCategoryASubjects = false;
    let rows = [];
    for (let year of years) {
        if (params.year !== "null" && params.year !== year) continue;

        const group = stats[year][params.candidateType];
        for (let i = 0; i < group.length; i++) {
            const data = group[i];
            if (params.subject !== "null" && params.subject !== data.subject) continue;
            if (params.subcategory !== "null" && params.subcategory !== data.subcategory) continue;

            if (data.subject === "All Category A subjects") {
                hasAllCategoryASubjects = true;
            }

            let subjectRowSpan = 0, subcategoryRowSpan = 0, subjectColSpan = 1;

            if (data.subcategory && params.subcategory === "null") {
                if (i === 0 || group[i - 1].subject !== data.subject) {
                    for (let j = i; j < group.length; j++) {
                        if (group[j].subject === data.subject) {
                            subjectRowSpan++;
                        } else {
                            break;
                        }
                    }
                }
            } else {
                subjectRowSpan = 1;
            }

            if (data.subcategory) {
                subcategoryRowSpan = 1;
            } else {
                subjectColSpan = 2;
            }

            if (params.gender === "null") {
                subjectRowSpan *= 3;
                subcategoryRowSpan *= 3;
            }

            for (let gender of (params.gender === "null" ? genders : [params.gender])) {
                let isLastRow = params.gender !== "null" || gender === genders[genders.length - 1];
                rows.push(
                    <tr key={`${year}.${data.subject}.${data.subcategory}.${gender}`}
                        className={isLastRow ? "bottom-border" : ""}>

                        {
                            subjectRowSpan
                                ? (
                                    <>
                                        <td rowSpan={subjectRowSpan.toString()}
                                            className="all-border text-center">{year}</td>
                                        <td rowSpan={subjectRowSpan.toString()}
                                            colSpan={subjectColSpan.toString()}
                                            className="all-border text-start">
                                            {t(data.subject)}
                                            {(data.subject === "All Category A subjects" ? <sup>#</sup> : "")}
                                        </td>
                                    </>
                                )
                                : ""
                        }
                        {
                            subcategoryRowSpan
                                ? <td rowSpan={subcategoryRowSpan.toString()}
                                    className="all-border text-start">{t(data.subcategory)}</td>
                                : ""
                        }
                        <td className="color-bg text-start">
                            {t(`gender.${gender}`)}
                        </td>
                        <td className="color-bg">{data[gender].noEntered.toString()}</td>
                        <td className="color-bg">{data[gender].noSat.toString()}</td>
                        <td className="color-bg text-center">
                            {
                                data[gender].chineseVersion !== null
                                    ? data[gender].chineseVersion.toFixed(1) + "%"
                                    : "-"
                            }
                        </td>

                        {
                            grades.map((g) =>
                                <td key={g} className="color-bg">
                                    {data[gender][g].toString()} <br />
                                    ({(data[gender][g] / data[gender].noSat * 100).toFixed(1)}%)
                                </td>
                            )
                        }
                    </tr>
                );

                subjectRowSpan = 0;
                subcategoryRowSpan = 0;
            }
        }
    }

    // When LS bey
    if (!rows) {
        return (
            <p>{"table.noResults"}</p>
        );
    }

    return (
        <>
            <CopyButton />
            <Table responsive bordered size="sm" id="stats-table"
                className={i18n.languages[0].startsWith("en") ? "" : "zh"}>
                <thead>
                    <tr>
                        <th rowSpan="2" width="4%">{t("heading.year")}</th>
                        <th rowSpan="2" colSpan="2">{t("heading.subject")}</th>
                        <th rowSpan="2" width="6%">{t("heading.gender")}</th>
                        <th rowSpan="2" width="6%">{t("heading.noEntered")}</th>
                        <th rowSpan="2" width="6%">{t("heading.noSat")}</th>
                        <th rowSpan="2" width="6%">{t("heading.chineseVersion")}</th>
                        <th colSpan="8">{t("heading.gradesAttained")}</th>
                    </tr>
                    <tr>
                        {
                            grades.map(g =>
                                <th key={g} width="5.3%">{g}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            {hasAllCategoryASubjects &&
                <p><small className="text-muted"># {t("table.mathPS")}</small></p>
            }
        </>
    );
}

export default StatsTable;
