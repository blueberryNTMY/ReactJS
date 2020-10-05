import React from "react";
import TwoColumnsRow from "../../Components/Common/TwoColumnsRow";
import { Button, Form } from "tabler-react";
import { unixToDate } from "../../utils/dateUtils";

const FeedBackView = ({ data, setEdit, onDelete, statuses }) => (
  <div>
    <Form.Label className="mb-5 mt-3 text-center">
      <h3>{data.title}</h3>
    </Form.Label>
    <TwoColumnsRow name="ID справочника" leftColWidth={4}>
      {data.dictionary && data.dictionary.id}
    </TwoColumnsRow>
    <TwoColumnsRow name="Email пользователя" leftColWidth={4}>
      {data.user.email}
    </TwoColumnsRow>
    <TwoColumnsRow name="Текст сообщения" leftColWidth={4}>
      {data.text}
    </TwoColumnsRow>
    <TwoColumnsRow name="Название справочника" leftColWidth={4}>
      {data.dictionary && data.dictionary.name}
    </TwoColumnsRow>
    <TwoColumnsRow name="Дата и время создания" leftColWidth={4}>
      <div>{unixToDate(data.created_at, "DD.MM.YYYY HH:MM")}</div>
    </TwoColumnsRow>
    <TwoColumnsRow name="Статус" leftColWidth={4}>
      <div>
        {statuses &&
          statuses.find(status => +status.key === +data.status).label}
      </div>
    </TwoColumnsRow>
    <div className="text-right">
      <Button color="danger" className="mr-3" onClick={() => onDelete(data.id)}>
        Удалить
      </Button>
      <Button color="primary" onClick={setEdit}>
        Редактировать
      </Button>
    </div>
  </div>
);

export default FeedBackView;
