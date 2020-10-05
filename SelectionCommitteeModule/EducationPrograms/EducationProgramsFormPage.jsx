import React, { useContext, useEffect, useState } from "react";
import PageBody from "../../../Pages/PageBody";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import EducationProgramsForm from "../../../Components/Forms/SelectionCommitteeForms/EducationProgramsForm/EducationProgramsForm";
import {
  educationProgramsList,
  GlobalContext
} from "../../../Context/GlobalContext";
import { EducationProgramsInitialData } from "../../../validation/SelectionCommitteeModule/EducationProgramFormValidation";
import {
  // eslint-disable-next-line no-unused-vars
  createEducationProgram,
  updateEducationProgram,
  viewEducationProgram
} from "../../../api/SelectionCommittee/educationProgramAPI";
import { PATH } from "../../../constants/routes";
import { mapEducationProgramsToForm } from "../../../api/maps/mapEducationProgramsToForm";

const EducationProgramsFormPage = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [baseUrl, setBaseUrl] = useState("");
  const [
    {
      facultyList,
      educationLevelList,
      languagesList,
      educationList,
      trainingList,
      subjectList,
      programsStatusesList
    },
    dispatch
  ] = useContext(GlobalContext);

  const [initialData, setInitialData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [serverErrors, setServerErrors] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setBaseUrl(url.split("edit"));
      setEdit(true);
      viewEducationProgram(id)
        .then(res => {
          setInitialData(mapEducationProgramsToForm(res.data));
        })
        .catch(e => {
          console.log(e.message);
        });
    } else {
      setBaseUrl(url.split("create"));
      setInitialData(EducationProgramsInitialData);
      console.log("new");
    }
  }, [id]);

  const onSubmitForm = values => {
    if (id) {
      updateEducationProgram(id, values)
        .then(res => {
          educationProgramsList(dispatch);
          history.replace(
            `${baseUrl[0]}${
              PATH.catalogs.educationPrograms.view.children.acceptance
            }/${id}`
          );
          console.log(res);
        })
        .catch(e => {
          if (e.response) {
            setServerErrors(e.response.data);
          } else {
            alert(`Ошибка сервера.`);
          }
        });
    } else {
      createEducationProgram(values)
        .then(res => {
          educationProgramsList(dispatch);
          history.replace(
            `${baseUrl[0]}${
              PATH.catalogs.educationPrograms.view.children.acceptance
            }/${res.data.id}`
          );
          console.log(res);
        })
        .catch(e => {
          if (e.response) {
            setServerErrors(e.response.data);
          } else {
            alert(`Ошибка сервера.`);
          }
        });
    }
  };

  return (
    <PageBody
      title={
        edit
          ? "Образовательные программы -редактирование"
          : "Образовательные программы - создание"
      }
    >
      <div className="d-flex justify-content-end mb-3">
        {initialData && (
          <EducationProgramsForm
            serverErrors={serverErrors}
            programsStatusesList={programsStatusesList}
            formData={initialData}
            facultySelect={facultyList}
            educationLevelList={educationLevelList}
            languagesList={languagesList}
            trainingList={trainingList}
            subjectList={subjectList}
            directionSelect={educationList}
            submitForm={values => onSubmitForm(values)}
          />
        )}
      </div>
    </PageBody>
  );
};

export default EducationProgramsFormPage;
