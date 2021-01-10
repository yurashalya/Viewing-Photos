import React from "react";
import { Button as Btn } from "antd";

import styles from "./button.module.scss";

const Button = ({ onClick, className }) => {
  return (
    <div className={styles.wrappBtn}>
      <Btn type="primary" onClick={onClick} className={className}>
        Load More
      </Btn>
    </div>
  );
};

export default Button;
