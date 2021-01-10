import React from "react";
import { Skeleton } from "antd";

import styles from "./galleryPhotos.module.scss";

const GalleryPhotos = ({ imagesData, loading, handlePhotoDetails }) => {
  return (
    <main className={styles.wrappGalleryPhotos}>
      {imagesData && !loading ? (
        <>
          {imagesData.map((photo, key) => {
            return (
              <div
                className={styles.photoContent}
                key={key}
                onClick={() => {
                  handlePhotoDetails(photo.id);
                }}
              >
                <img
                  src={photo.cropped_picture}
                  alt="galleryPhoto"
                  id={photo.id}
                  className={styles.photo}
                />
                <p className={styles.info}>View More</p>
              </div>
            );
          })}
        </>
      ) : (
        <div className={styles.wrappSkeleton}>
          <Skeleton.Input
            active
            loading={loading}
            className={styles.skeleton}
            size="Large"
          />
        </div>
      )}
    </main>
  );
};

export default GalleryPhotos;
