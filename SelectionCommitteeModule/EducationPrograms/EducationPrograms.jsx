import React, { useContext, useEffect, useState } from "react";
import { PATH } from "../../../constants/routes";
import PageBody from "../../../Pages/PageBody";
import EducationProgramsTable from "../../../Components/Tables/SelectionCommittee/EducationProgramsTable";
import {
  BASE_EDUCATION_PROGRAMS_FILTER,
  BASE_PAGINATION,
  BASE_SORT,
  DEFAULT_PER_PAGE,
} from "../../../constants/global";
import {
  deleteEducationProgram,
  getEducationProgramList,
  getEducationProgramsSelect,
  getStatusBitrix,
} from "../../../api/SelectionCommittee/educationProgramAPI";
import { GlobalContext } from "../../../Context/GlobalContext";
import { filterToQueryParams, getSort } from "../../../utils/globalUtils";
import { ADMIN, SELECTION_COMMITTEE, getRole } from "../../../constants/roles";
import { Button } from "tabler-react";

const EducationPrograms = () => {
  const role = getRole();
  const [programsList, setProgramList] = useState([]);
  const [pagination, setPagination] = useState(BASE_PAGINATION);
  const [loading, setLoading] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [
    { educationLevelList, facultyList, educationList, programsStatusesList },
  ] = useContext(GlobalContext);
  const [filter, setFilter] = useState([]);
  const [requestFilter, setRequestFilter] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sort, setSort] = useState(BASE_SORT);
  const [topFilter, setTopFilter] = useState(null);
  const [educationProgramsList, setEducationProgramsList] = useState([]);

  // set default filter url

  useEffect(() => {
    if (educationLevelList && educationLevelList.length > 0) {
      setRequestFilter(
        BASE_EDUCATION_PROGRAMS_FILTER + educationLevelList[0].key
      );
      setActiveFilter(educationLevelList[0].key);
    }
  }, [educationLevelList]);
  // / set default filter url

  useEffect(() => {
    setLoading(true);

    if (requestFilter) {
      getEducationProgramList(pagination, requestFilter, sort)
        .then((res) => {
          setProgramList(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [requestFilter, deleteFlag, pagination, sort]);

  const onFilterChange = (params) => {
    setFilter(params);
    console.log(filter);
    setRequestFilter(filterToQueryParams(params));
  };

  useEffect(() => {
    getEducationProgramsSelect(topFilter ? topFilter : activeFilter).then(
      (res) => {
        setEducationProgramsList(res.data);
      }
    );
  }, [topFilter, activeFilter]);

  const onDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    let confirmResult = confirm("Удалить запись?");

    if (confirmResult) {
      setLoading(true);
      deleteEducationProgram(id)
        .then((res) => {
          setLoading(false);
          setDeleteFlag(!deleteFlag);
        })
        .catch((e) => {
          setLoading(false);

          if (e.response) {
            if (e.response.status === 500) {
              alert(`Ошибка сервера.`);
            } else {
              alert(`Не удалось удалить. ${e.response.data.error}.`);
            }
          }
        });
    }
  };

  const onSortedChange = (sort) => {
    setSort(getSort(sort));
  };

  const updateBitrix = () => {
    getStatusBitrix()
      .then((res) => {
        if (res.data.success === false) {
          alert(
            "В данный момент процесс обновления данных в Битрикс уже запущен. Пожалуйста, попробуйте позднее. Если ваши изменения были сделаны несколько минут назад, они уже обновляются в Битрикс!"
          );
        } else {
          alert("Обновление запущено!");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <PageBody
      title="Образовательные программы"
      titleRightBlock={
        <>
          {role === ADMIN || role === SELECTION_COMMITTEE ? (
            <>
              <Button color="primary" onClick={updateBitrix}>
                Обновить данные в Битрикс
              </Button>
            </>
          ) : null}
        </>
      }
    >
      <EducationProgramsTable
        onSetTopFiler={setTopFilter}
        educationProgramsList={educationProgramsList}
        onSortedChange={onSortedChange}
        activeTopFilter={activeFilter}
        directionEducationSelect={educationList}
        statusProgram={programsStatusesList}
        topFilterData={educationLevelList}
        selectedFilters={filter}
        onFilterChange={onFilterChange}
        showCreateButton
        createButtonLink={PATH.catalogs.educationPrograms.create}
        baseUrl={PATH.catalogs.educationPrograms}
        showInnerPage="acceptance"
        topFilterName="level_education_id"
        tableData={programsList}
        onPaginationChange={setPagination}
        loading={loading}
        facultySelect={facultyList}
        onDelete={(id) => onDelete(id)}
        defaultPerPage={DEFAULT_PER_PAGE}
      />
    </PageBody>
  );
};

export default EducationPrograms;
