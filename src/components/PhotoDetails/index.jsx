import React, { useState } from "react";
import { Modal as ModalPhotoDetails, Tag } from "antd";
import clsx from "clsx";
import InnerImageZoom from "react-inner-image-zoom";
import ControlImages from "./controlImages";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import styles from "./photoDetails.module.scss";

const Modal = ({
  photoDetails,
  showModal,
  setShowModal,
  prevBtnDisabled,
  handlePrevImage,
  handleNextImage,
}) => {
  const [showAnimation, setShowAmination] = useState(false);

  const handleShowAmination = () => {
    setShowAmination(!showAnimation);
    setTimeout(() => setShowAmination(false), 400);
  };

  const isAmination = showAnimation ? styles.animationBlur : null;

  return (
    <div className={styles.wrappPhotoDetailsModal}>
      <ModalPhotoDetails
        title="Photo Details"
        centered
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(!showModal);
        }}
        width={700}
      >
        <div className={clsx(styles.modalContent)}>
          <>
            {photoDetails.map((detail, key) => {
              return (
                <div key={key}>
                  <InnerImageZoom
                    key={key}
                    zoomScale={2}
                    src={detail.full_picture}
                    zoomSrc={detail.full_picture}
                    alt="Details"
                    fadeDuration={150}
                  />
                  <div className={styles.details}>
                    <div className={styles.author}>
                      <p className={styles.title}>Author:</p>
                      <p>{detail.author}</p>
                    </div>
                    <div className={styles.camera}>
                      <p className={styles.title}>Camera:</p>
                      <p>{detail.camera}</p>
                    </div>
                  </div>
                  <ControlImages
                    id={detail.id}
                    prevBtnDisabled={prevBtnDisabled}
                    handleNextImage={handleNextImage}
                    handlePrevImage={handlePrevImage}
                    handleShowAmination={handleShowAmination}
                  />
                  <p
                    className={clsx(isAmination)}
                    style={{ marginBottom: "0" }}
                  ></p>
                </div>
              );
            })}
          </>
          <>
            {photoDetails[0]?.tags && (
              <div className={styles.tags}>
                <p className={styles.title}>Tags: </p>
                <p className={styles.tag}>
                  {photoDetails[0]?.tags
                    ?.trim()
                    .split(" ")
                    .map((tag, key) => {
                      return <Tag key={key}>{tag}</Tag>;
                    })}
                </p>
              </div>
            )}
          </>
        </div>
      </ModalPhotoDetails>
    </div>
  );
};

export default Modal;
