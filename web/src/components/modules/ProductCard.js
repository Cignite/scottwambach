import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../styles/utilities/settings';
import { button, alertButton } from '../../styles/utilities/elements';
import ImageCarousel from './ImageCarousel';
import YouTubeVideo from '../helpers/YouTubeVideo';
import Modal, { ModalTrigger } from './Modal';

const ProductCard = ({
  content: {
    price,
    _rawSlug,
    title,
    _rawMainImage,
    _rawAdditionalImages,
    youtubeId,
  },
}) => {
  const [images, setImages] = useState([_rawMainImage]);

  useEffect(() => {
    if (_rawAdditionalImages && _rawAdditionalImages.length !== 0) {
      setImages([_rawMainImage, ..._rawAdditionalImages]);
    }
  }, []);

  return (
    <SProductCard>
      <Link to={_rawSlug.current}>
        <h3>{title}</h3>
      </Link>
      <ImageCarousel
        width={300}
        slug={_rawSlug.current}
        content={images}
        simple
      />
      <ProductButton href="/">Buy Now</ProductButton>
      {youtubeId && (
        <Modal
          modalContent={<YouTubeVideo title="video" videoId={youtubeId} />}
        >
          <span>Play Video</span>
        </Modal>
      )}
      <p>{`$${(price / 100).toFixed(2)}`}</p>
    </SProductCard>
  );
};

export default ProductCard;

const ProductButton = styled.a``;

export const SProductCard = styled.div`
  border: 1px solid ${colors.gray};
  padding: 20px;

  a {
    text-decoration: none;
    color: ${colors.text};
  }

  h3 {
    margin-bottom: 0;
  }

  ${ProductButton} {
    ${button};
    padding: 0;
    width: 100%;
    margin: 30px auto 10px;
  }

  ${ModalTrigger} {
    margin-bottom: 10px;
    span {
      ${alertButton};
      padding: 0;
      width: 100%;
    }
  }
`;
