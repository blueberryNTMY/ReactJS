import React, { useEffect, useState } from "react";
import PageBody from "../PageBody";
import {
  deleteFeedBack,
  getFeedBackDictionary,
  getFeedBackInfo,
  getFeedBackList,
  getFeedBackStatuses,
  getFeedBackTopics,
  updateFeedBack
} from "../../api/feedbackAPI";
import FeedbackTable from "../../Components/Tables/FeedbackTable";
import {
  BASE_FEEDBACK_PROGRAMS_FILTER,
  BASE_PAGINATION, BASE_SORT,
  DEFAULT_PER_PAGE
} from "../../constants/global";
import { filterToQueryParams, getSort } from "../../utils/globalUtils";
import FeedBackModal from "./FeedBackModal";
import { useLocation } from "react-router-dom";

const FeedbackList = () => {
  const { pathname } = useLocation();
  const splitUrl = pathname.split("/");
  const page = splitUrl[splitUrl.length - 1];
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [requestFilter, setRequestFilter] = useState(
    BASE_FEEDBACK_PROGRAMS_FILTER + 0
  );
  const [topicsList, setTopicsList] = useState(null);
  const [dictionaryList, setDictionaryList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [pagination, setPagination] = useState(BASE_PAGINATION);
  const [sort, setSort] = useState(BASE_SORT);

  const onFilterChange = params => {
    setFilter(params);
    setRequestFilter(filterToQueryParams(params));
  };

  const openInfo = (id, edit) => {
    setModalData(null);
    setShowModal(true);

    getFeedBackInfo(id).then(res => {
      setModalData(res.data);
      setEditStatus(edit);
    });
  };

  useEffect(() => {
    getFeedBackStatuses()
      .then(res => {
        setStatuses(res.data);
        setSelectedStatus(res.data[0].key);
      })
      .catch(e => {
        console.log(e);
      });
    getFeedBackTopics()
      .then(res => {
        setTopicsList(res.data);
      })
      .catch(e => console.log(e));

    getFeedBackDictionary()
      .then(res => {
        setDictionaryList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    if (statuses && statuses.length > 0) {
      setRequestFilter(BASE_FEEDBACK_PROGRAMS_FILTER + statuses[0].key);
    }
  }, [statuses]);

  useEffect(() => {
    setLoading(true);
    getFeedBackList(pagination, requestFilter, sort)
      .then(res => {
        setTableData(res.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [requestFilter, updateForm, pagination, sort]);

  const onSubmit = data => {
    // setEditStatus(true);
    updateFeedBack(modalData.id, data).then(res => {
      setShowModal(false);
      // setEditStatus(false);
      setUpdateForm(!updateForm);
    });
  };

  const onDelete = id => {
    // eslint-disable-next-line no-restricted-globals
    let confirmResult = confirm("Удалить запись?");

    if (confirmResult) {
      setLoading(true);
      deleteFeedBack(id).then(res => {
        setShowModal(false);
        setUpdateForm(!updateForm);
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

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
    setEditStatus(false);
  };

  const onSortedChange = sort => {
    setSort(getSort(sort));
  };

  return (
    <PageBody title="Обратная связь">
      <FeedbackTable
        onSortedChange={onSortedChange}
        showDictionary={page === "feedback"}
        openInfo={openInfo}
        onDelete={onDelete}
        onEdit={id => openInfo(id, true)}
        onFilterChange={onFilterChange}
        topFilterData={statuses}
        activeTopFilter={selectedStatus}
        topFilterName="status"
        tableData={tableData}
        loading={loading}
        selectedFilters={filter}
        topicsList={topicsList}
        dictionaryList={dictionaryList}
        onPaginationChange={setPagination}
        defaultPerPage={DEFAULT_PER_PAGE}
      />
      <FeedBackModal
        customStyles={{
          width: "700px"
        }}
        editStatus={editStatus}
        onDelete={onDelete}
        onSubmit={onSubmit}
        closeModal={closeModal}
        showModal={showModal}
        modalData={modalData}
        statuses={statuses}
      />
    </PageBody>
  );
};

export default FeedbackList;
