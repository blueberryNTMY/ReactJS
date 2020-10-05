import React, { useContext, useEffect, useState } from "react";
import PageBody from "../PageBody";
import { Form, Grid, Button } from "tabler-react";
import { Link, useHistory, useParams } from "react-router-dom";
import { TYPE_FACULTY } from "../../constants/global";
import TwoColumnsRow from "../../Components/Common/TwoColumnsRow";
import { GlobalContext } from "../../Context/GlobalContext";
import { PATH } from "../../constants/routes";
import Spinner from "../../Components/Common/Spinner";
import { getContestInfo, deleteContest } from "../../api/contestAPI";
import ContestTables from "../../Components/Common/ContestTables";

const ContestView = () => {
  const { id, type } = useParams();
  const [pageData, setPageData] = useState(null);
  const [{ trainingList }] = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    getContestInfo(id, type).then(res => {
      setPageData(res.data);

    });
  }, [id, type]);

  const onDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    let confirmResult = confirm("Удалить запись?");

    if (confirmResult) {
      deleteContest(id, type).then(res => {
        history.replace(PATH.catalogs.contest.index);
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

  return (
    <PageBody title="Конкурс">
      <>
        {pageData ? (
          <>
            <Grid>
              {pageData.type.key === TYPE_FACULTY ? (
                <>
                  <TwoColumnsRow name="Факультет" leftColWidth={3}>
                    <Form.StaticText>{pageData.faculty.name}</Form.StaticText>
                  </TwoColumnsRow>
                  <TwoColumnsRow name="Направление" leftColWidth={3}>
                    <Form.StaticText>
                      {pageData.direction_education.name}
                    </Form.StaticText>
                  </TwoColumnsRow>
                </>
              ) : (
                <>
                  <TwoColumnsRow
                    name="Образовательная программа"
                    leftColWidth={3}
                  >
                    <Form.StaticText>
                      {pageData.education_program.name}
                    </Form.StaticText>
                  </TwoColumnsRow>
                </>
              )}
            </Grid>
            <ContestTables data={pageData} trainingList={trainingList} />
            <div className="pt-3">
              <Button color="gray" className="mr-3" onClick={onDelete}>
                Удалить
              </Button>
              <Button
                RootComponent={Link}
                color="primary"
                to={`${PATH.catalogs.contest.edit}/${type}/${id}`}
              >
                Редактировать
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Spinner />
          </div>
        )}
      </>
    </PageBody>
  );
};

export default ContestView;
