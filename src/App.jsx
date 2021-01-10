import React, { useState, useEffect } from "react";
import { GalleryPhotos, Button, Header, PhotoDetailsModal } from "components";

import { getToken, getImages, getPhotoDetails } from "services";

import styles from "style/app.module.scss";

const App = () => {
  const [countPage, setCountPage] = useState(1);
  const [imagesData, setImagesData] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);

  useEffect(() => {
    getToken().then((res) => {
      if (res.token) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    getImages(countPage).then((res) => {
      if (res.pictures) {
        setImagesData([...imagesData, ...res.pictures]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countPage]);

  const handlePhotoDetails = (id) => {
    getPhotoDetails(id).then((res) => {
      setPhotoDetails([{ ...res }]);
      setShowModal(!showModal);
    });
  };

  let handleNextImage = (id) => {
    const index = imagesData.findIndex((el) => el.id === id);
    const nextId = imagesData.find((el, key) => key === index + 1);

    if (nextId === undefined) {
      setCountPage(countPage + 1);
    } else {
      getPhotoDetails(nextId.id).then((res) => {
        setPhotoDetails([{ ...res }]);
      });
    }
  };

  let handlePrevImage = (id) => {
    const index = imagesData.findIndex((el) => el.id === id);
    const prevId = imagesData.find((el, key) => key === index - 1);

    if (prevId === undefined) {
      setPrevBtnDisabled(true);
    } else {
      getPhotoDetails(prevId.id).then((res) => {
        setPhotoDetails([{ ...res }]);
      });
    }
  };

  const loadMoreImage = () => {
    setCountPage(countPage + 1);
  };

  return (
    <div className={styles.viewingPhotos}>
      <Header />
      {imagesData ? (
        <>
          <GalleryPhotos
            imagesData={imagesData}
            loading={loading}
            handlePhotoDetails={handlePhotoDetails}
          />
          <PhotoDetailsModal
            setShowModal={setShowModal}
            showModal={showModal}
            photoDetails={photoDetails}
            prevBtnDisabled={prevBtnDisabled}
            handleNextImage={handleNextImage}
            handlePrevImage={handlePrevImage}
          />
          <Button className={styles.loadBtn} onClick={() => loadMoreImage()} />{" "}
        </>
      ) : (
        <h1 className={styles.warningTitle}>Please, reload page</h1>
      )}
    </div>
  );
};

export default App;
