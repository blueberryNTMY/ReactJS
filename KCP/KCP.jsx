import React, { useContext, useEffect, useState } from "react";
import PageBody from "../PageBody";
import { Button } from "tabler-react";
import { PATH } from "../../constants/routes";
import { Link } from "react-router-dom";
import KCPTable from "../../Components/Tables/KCPTable";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  BASE_PAGINATION,
  BASE_SORT,
  DEFAULT_PER_PAGE,
  TYPE_FACULTY,
  TYPE_PROGRAM
} from "../../constants/global";
import { mapPagination } from "../../api/maps/mapPrices";
import { deleteKCP, getKCP } from "../../api/kcpAPI";
import KCPTableProgram from "../../Components/Tables/KCPTableProgram";
import { filterToQueryParams, getSort } from "../../utils/globalUtils";

const KCP = () => {
  const [{ facultyList, educationList }] = useContext(GlobalContext);
  const [loadingFaculty, setLoadingFaculty] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [facultyKCP, setFacultyKCP] = useState([]);
  const [educationalProgramsKCP, setEducationalProgramsKCP] = useState([]);

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
    getKCP(TYPE_FACULTY, paginationFaculty, requestFilterFaculty, sortFaculty)
      .then(res => {
        setFacultyKCP({
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
    getKCP(TYPE_PROGRAM, paginationProgram, requestFilterProgram, sortProgram)
      .then(res => {
        setEducationalProgramsKCP({
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
    getKCP(TYPE_PROGRAM, "?perPage=-1&page=1", "", "").then(res => {
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

      deleteKCP(item.id, item.type).then(res => {
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
    <PageBody title="Контрольные цифры приема">
      <div className="d-flex justify-content-between mb-3">
        <div className="page-title">Контрольные цифры приема на факультеты</div>
        <Button
          color="primary"
          RootComponent={Link}
          to={`${PATH.catalogs.kcp.create}/${TYPE_FACULTY}`}
        >
          Добавить
        </Button>
      </div>
      <KCPTable
        onSortedChange={onSortedChangeFaculty}
        onPaginationChange={setPaginationFaculty}
        onDeleteItem={onDeleteItem}
        tableData={facultyKCP}
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
          Контрольные цифры приема на образовательные программы
        </div>
        <Button
          color="primary"
          RootComponent={Link}
          to={`${PATH.catalogs.kcp.create}/${TYPE_PROGRAM}`}
        >
          Добавить
        </Button>
      </div>
      <KCPTableProgram
        onSortedChange={onSortedChangeProgram}
        onPaginationChange={setPaginationProgram}
        onDeleteItem={onDeleteItem}
        tableData={educationalProgramsKCP}
        loading={loadingPrograms}
        defaultPerPage={DEFAULT_PER_PAGE}
        selectedFilters={filterProgram}
        educationProgramsList={educationProgramsList}
        onFilterChange={onFilterChangeProgram}
      />
    </PageBody>
  );
};

export default KCP;
