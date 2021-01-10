import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./photoDetails.module.scss";

const ControlImages = ({
  id,
  handleNextImage,
  handlePrevImage,
  prevBtnDisabled,
  handleShowAmination,
}) => {
  return (
    <>
      <button
        onClick={() => {
          !prevBtnDisabled && handlePrevImage(id);
          handleShowAmination();
        }}
        className={`${styles.controlBtn} ${styles.controlBtnLeft}`}
      >
        <LeftOutlined />
      </button>

      <button
        onClick={() => {
          handleNextImage(id);
          handleShowAmination();
        }}
        className={`${styles.controlBtn} ${styles.controlBtnRight}`}
      >
        <RightOutlined />
      </button>
    </>
  );
};

export default ControlImages;
