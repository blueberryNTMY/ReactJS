import React, { useEffect, useState } from "react";
import PageBody from "../../../Pages/PageBody";
import { PATH } from "../../../constants/routes";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import AcceptancePage from "../../ModulesCildrenPages/AcceptancePage/AcceptancePage";
import { viewEducationProgram } from "../../../api/SelectionCommittee/educationProgramAPI";


const EducationProgramsView = () => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const splitUrl = pathname.split("/");
  const id = splitUrl[splitUrl.length - 1];
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    viewEducationProgram(id)
      .then(res => {
        setPageName(res.data.name_education_program);
      })
      .catch(e => {
        console.log(e.message);
      });
  }, []);

  return (
    <PageBody title="Образовательные программы - просмотр">
      <div className="page-title text-center mb-3">{pageName}</div>
      <div className="sub-menu mb-3">
        {/*<Button.List className="mb-3">
          {sumMenuItems.map((item, i) => (
            <NavLink
              className="btn"
              to={`${url}/${item.to}/${id}`}
              activeClassName="btn-primary"
              key={i}
            >
              {item.value}
            </NavLink>
          ))}
        </Button.List>*/}
        <Switch>
          <Route
            exact
            path={ `${url}/${PATH.catalogs.educationPrograms.view.children.acceptance}/:id`}
            component={AcceptancePage}
          />
        </Switch>
      </div>
    </PageBody>
  );
};

export default EducationProgramsView;
