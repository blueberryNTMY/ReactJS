import React, { useContext, useEffect, useState } from "react";
import PageBody from "../PageBody";
import { Button } from "tabler-react";
import { PATH } from "../../constants/routes";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  BASE_PAGINATION,
  BASE_SORT,
  DEFAULT_PER_PAGE,
  TYPE_FACULTY,
  TYPE_PROGRAM
} from "../../constants/global";
import { mapPagination } from "../../api/maps/mapPrices";
import { filterToQueryParams, getSort } from "../../utils/globalUtils";
import ContestTable from "../../Components/Tables/ContestTable";
import ContestTableProgram from "../../Components/Tables/ContestTableProgram";
import { getContest, deleteContest } from "../../api/contestAPI";

const Contest = () => {
  const [{ facultyList, educationList }] = useContext(GlobalContext);
  const [loadingFaculty, setLoadingFaculty] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [facultyContest, setFacultyContest] = useState([]);
  const [educationalProgramsContest, setEducationalProgramsContest] = useState([]);

  const [filterFaculty, setFilterFaculty] = useState([]);
  const [requestFilterFaculty, setRequestFilterFaculty] = useState(null);
  const [filterProgram, setFilterProgram] = useState([]);
  const [requestFilterProgram, setRequestFilterProgram] = useState(null);
  const [educationProgramsList, setEducationProgramsList] = useState([]);

  const [paginationProgram, setPaginationProgram] = useState(BASE_PAGINATION);
  const [paginationFaculty, setPaginationFaculty] = useState(BASE_PAGINATION);

  const [sortFaculty, setSortFaculty] = useState(BASE_SORT);
  const [sortProgram, setSortProgram] = useState(BASE_SORT);

  const getTableFaculty = () => {
    setLoadingFaculty(true);
    getContest(TYPE_FACULTY, paginationFaculty, requestFilterFaculty, sortFaculty)
      .then(res => {
        setFacultyContest({
          pagination: mapPagination(res.data),
          items: res.data.data
        });
        setLoadingFaculty(false);
      })
      .catch(e => {
        setLoadingFaculty(false);
      });
  };

  const getTableProgram = () => {
    setLoadingPrograms(true);
    getContest(TYPE_PROGRAM, paginationProgram, requestFilterProgram, sortProgram)
      .then(res => {
        setEducationalProgramsContest({
          pagination: mapPagination(res.data),
          items: res.data.data
        });
        setLoadingPrograms(false);
      })
      .catch(e => {
        setLoadingPrograms(false);
      });
  };

  useEffect(() => {
    getTableFaculty();
  }, [paginationFaculty, requestFilterFaculty, sortFaculty]);

  useEffect(() => {
    getTableProgram();
  }, [paginationProgram, requestFilterProgram, sortProgram]);

  useEffect(() => {
    getContest(TYPE_PROGRAM, "?perPage=-1&page=1", "", "").then(res => {
      setEducationProgramsList(
        res.data.data.map(el => ({
          label: el.education_program.name,
          key: el.education_program.id
        }))
      );
    });
  }, []);

  const onDeleteItem = item => {
    // eslint-disable-next-line no-restricted-globals
    let confirmResult = confirm("Удалить запись?");

    if (confirmResult) {
      if (item.type.key === TYPE_FACULTY) {
        setLoadingFaculty(true);
      } else {
        setLoadingPrograms(true);
      }

      deleteContest(item.id, item.type).then(res => {
        if (item.type.key === TYPE_FACULTY) {
          getTableFaculty();
        } else {
          getTableProgram();
        }

        setLoadingFaculty(false);
        setLoadingPrograms(false);
      }).catch(e => {
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

  const onFilterChangeFaculty = params => {
    const filters = params.filter(el => typeof el.value !== "undefined");

    setFilterFaculty(filters);
    setRequestFilterFaculty(filterToQueryParams(filters));
  };

  const onFilterChangeProgram = params => {
    const filters = params.filter(el => typeof el.value !== "undefined");

    setFilterProgram(filters);
    setRequestFilterProgram(filterToQueryParams(filters));
  };

  const onSortedChangeFaculty = sort => {
    setSortFaculty(getSort(sort));
  };

  const onSortedChangeProgram = sort => {
    setSortProgram(getSort(sort));
  };

  return (
    <PageBody title="Конкурс">
      <div className="d-flex justify-content-between mb-3">
        <div className="page-title">Конкурс на факультеты</div>
        <Button
          color="primary"
          RootComponent={Link}
          to={`${PATH.catalogs.contest.create}/${TYPE_FACULTY}`}
        >
          Добавить
        </Button>
      </div>
      <ContestTable
        onSortedChange={onSortedChangeFaculty}
        onPaginationChange={setPaginationFaculty}
        onDeleteItem={onDeleteItem}
        tableData={facultyContest}
        loading={loadingFaculty}
        directionEducationSelect={educationList}
        facultySelect={facultyList}
        facultyList={facultyList}
        defaultPerPage={DEFAULT_PER_PAGE}
        selectedFilters={filterFaculty}
        onFilterChange={onFilterChangeFaculty}
      />
      <div className="d-flex justify-content-between mb-3 mt-5">
        <div className="page-title">
            Конкурс на образовательные программы
        </div>
        <Button
          color="primary"
          RootComponent={Link}
          to={`${PATH.catalogs.contest.create}/${TYPE_PROGRAM}`}
        >
          Добавить
        </Button>
      </div>
      <ContestTableProgram
        onSortedChange={onSortedChangeProgram}
        onPaginationChange={setPaginationProgram}
        onDeleteItem={onDeleteItem}
        tableData={educationalProgramsContest}
        loading={loadingPrograms}
        defaultPerPage={DEFAULT_PER_PAGE}
        selectedFilters={filterProgram}
        educationProgramsList={educationProgramsList}
        onFilterChange={onFilterChangeProgram}
      />
    </PageBody>
  );
};

export default Contest;
