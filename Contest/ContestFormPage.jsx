import React, { useContext, useEffect, useState } from "react";
import PageBody from "../PageBody";
import { useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { PATH } from "../../constants/routes";
import Spinner from "../../Components/Common/Spinner";
import { getSelectProgramsWithoutKcp } from "../../api/SelectionCommittee/educationProgramAPI";
import ContestForm from "../../Components/Forms/BaseForms/ContestForm";
import { createContest, editContest, getContestInfo } from "../../api/contestAPI";
import { mapContestToForm } from "../../api/maps/mapContestToForm";

const ContestFormPage = () => {
  const [initialData, setInitialData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const [error, setError] = useState(null);
  const [educationProgramsList, setEducationProgramsList] = useState([]);
  const [serverErrors, setServerErrors] = useState("");

  const [
    {
      facultyList,
      educationList,
      trainingList,
      contestPlacePointTypeList
    }
  ] = useContext(GlobalContext);

  const { id, type } = useParams();
  const history = useHistory();

  useEffect(() => {
    getSelectProgramsWithoutKcp().then(res => {
      setEducationProgramsList(res.data);
    });

    if (id) {
      if (
        trainingList && trainingList.length &&
        contestPlacePointTypeList && contestPlacePointTypeList.length
      ) {
        getContestInfo(id, type).then(res => {
          const data = res.data;
          
          setIsEdit(true);
          setInitialData(mapContestToForm(data, trainingList));
        });
      }
    } else {
      setInitialData({ type: +type });
    }
  }, [
    id,
    trainingList,
    contestPlacePointTypeList
  ]);

  const onSubmit = values => {
    setSendingForm(true);

    if (id) {
      editContest(id, values)
        .then(res => {
          setSendingForm(false);
          history.push(`${PATH.catalogs.contest.view}/${type}/${res.data.id}`);
        })
        .catch(e => {
          setSendingForm(false);
          setError(e.message);

          if (e.response) {
            setServerErrors(e.response.data);
          } else {
            alert(`Ошибка сервера.`);
          }
        });
    } else {
      createContest(values)
        .then(res => {
          setSendingForm(false);
          history.push(`${PATH.catalogs.contest.view}/${type}/${res.data.id}`);
        })
        .catch(e => {
          setSendingForm(false);
          setError(e.message);

          if (e.response) {
            setServerErrors(e.response.data);
          } else {
            alert(`Ошибка сервера.`);
          }
        });
    }
  };

  return (
    <PageBody title="Конкурс">
      {initialData ? (
        <ContestForm
          error={error}
          serverErrors={serverErrors}
          sendingForm={sendingForm}
          isEdit={isEdit}
          trainingList={trainingList}
          educationPrograms={educationProgramsList}
          facultySelect={facultyList}
          directionEducationSelect={educationList}
          formData={initialData}
          onSubmit={values => onSubmit(values)}
          contestPlacePointTypeList={contestPlacePointTypeList}
        />
      ) : (
        <div className="text-center">
          <Spinner />
        </div>
      )}
    </PageBody>
  );
};

export default ContestFormPage;
