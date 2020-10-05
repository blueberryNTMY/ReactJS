import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Icon } from "tabler-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Components/Common/Spinner";
import FeedBackView from "./FeedBackView";
import FeedBackAdminForm from "../../Components/Forms/FeedBackAdminForm";

const customStyles = {
  content: {
    width: "700px",
    top: "20%",
    bottom: "auto",
    left: "50%",
    transform: "translateX(-50%)"
  }
};

const FeedBackModal = ({
  closeModal,
  showModal,
  modalData,
  onSubmit,
  topicsList,
  statuses,
  editStatus,
  onDelete
}) => {
  const [edit, setEdit] = useState(editStatus);

  const close = () => {
    setEdit(false);
    closeModal();
  };

  useEffect(() => {
    setEdit(editStatus);
  }, [editStatus, showModal, modalData]);

  // console.log(pageData);
  // console.log(unitsSelectList);

  return (
    <ReactModal onRequestClose={close} isOpen={showModal} style={customStyles}>
      <div
        onClick={() => close()}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: 5,
          right: 10,
          zIndex: 999
        }}
      >
        <Icon prefix="fas" name="user" />
        <FontAwesomeIcon icon={faTimes} color="#467fcf" />
      </div>
      {!modalData ? (
        <div className="text-center mt-6 mb-6">
          <Spinner />
        </div>
      ) : (
        <>
          {edit ? (
            <FeedBackAdminForm
              formData={modalData}
              statuses={statuses}
              submitAction={onSubmit}
            />
          ) : (
            <FeedBackView
              data={modalData}
              topicsList={topicsList}
              statuses={statuses}
              setEdit={setEdit}
              onDelete={onDelete}
            />
          )}
        </>
      )}
    </ReactModal>
  );
};

export default FeedBackModal;
