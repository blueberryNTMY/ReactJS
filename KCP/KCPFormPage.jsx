import React, { useContext, useEffect, useState } from "react";
import PageBody from "../PageBody";
import { useHistory, useParams } from "react-router-dom";
import KCPForm from "../../Components/Forms/BaseForms/KCPForm";
import { GlobalContext } from "../../Context/GlobalContext";
import { createKCP, editKCP, getKCPInfo } from "../../api/kcpAPI";
import { PATH } from "../../constants/routes";
import { mapKCPToForm } from "../../api/maps/mapKCPToForm";
import Spinner from "../../Components/Common/Spinner";
import { getSelectProgramsWithoutKcp } from "../../api/SelectionCommittee/educationProgramAPI";

const KCPFormPage = () => {
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
      KCPPlacePointTypeList,
      competitionTypeList,
      competitionPointTypeList
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
        trainingList.length &&
        KCPPlacePointTypeList.length &&
        competitionTypeList.length &&
        competitionPointTypeList.length
      ) {
        getKCPInfo(id, type).then(res => {
          const data = res.data;

          setIsEdit(true);

          setInitialData(
            mapKCPToForm({
              ...data,
              trainingList,
              KCPPlacePointTypeList,
              competitionTypeList,
              competitionPointTypeList
            })
          );
        });
      }
    } else {
      setInitialData({ type: +type });
    }
  }, [
    id,
    trainingList,
    KCPPlacePointTypeList,
    competitionTypeList,
    competitionPointTypeList
  ]);

  const onSubmit = values => {
    setSendingForm(true);

    if (id) {
      editKCP(id, values)
        .then(res => {
          setSendingForm(false);
          history.push(`${PATH.catalogs.kcp.view}/${type}/${res.data.id}`);
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
      createKCP(values)
        .then(res => {
          setSendingForm(false);
          history.push(`${PATH.catalogs.kcp.view}/${type}/${res.data.id}`);
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
    <PageBody title="Контрольные цифры приема">
      {initialData ? (
        <KCPForm
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
          KCPPlacePointTypeList={KCPPlacePointTypeList}
          competitionTypeList={competitionTypeList}
          competitionPointTypeList={competitionPointTypeList}
        />
      ) : (
        <div className="text-center">
          <Spinner />
        </div>
      )}
    </PageBody>
  );
};

export default KCPFormPage;
