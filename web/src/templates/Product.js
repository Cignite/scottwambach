// import React, { useEffect, useState } from 'react';
// import { graphql } from 'gatsby';
// import styled from 'styled-components';
// import Layout from '../components/Layout';
// import imageUrlFor, { buildImageObj } from '../js/imageUrlFor';
// import RichText from '../components/contentBlocks/RichText';
// import CustomFields from '../components/modules/CustomFields';
// import Wrapper from '../styles/utilities/Wrapper';
// import ImageCarouselThumbs, {
//   SImageCarouselThumbs,
// } from '../components/modules/ImageCarouselThumbs';
// import { breakpoints, misc, colors } from '../styles/utilities/settings';
// import RelatedProducts from '../components/modules/RelatedProducts';
// import Modal from '../components/modules/Modal';
// import SvgLoader from '../components/helpers/SvgLoader';
// import YouTubeVideo from '../components/helpers/YouTubeVideo';

// const Product = ({
//   pageContext: {
//     content: { relatedProducts },
//   },
//   data: {
//     product: {
//       title,
//       _id,
//       _rawSlug,
//       _rawMainImage,
//       _rawDescription,
//       _rawCustomFields,
//       _rawCategories,
//       _rawAdditionalImages,
//       youtubeId,
//       parentProduct,
//     },
//   },
// }) => {
//   const [images, setImages] = useState([_rawMainImage]);

//   useEffect(() => {
//     if (_rawAdditionalImages && _rawAdditionalImages.length !== 0) {
//       setImages([_rawMainImage].concat(_rawAdditionalImages));
//     }
//   }, []);

//   return (
//     <Layout
//       path={_rawSlug.current}
//       title={title}
//       pageImage={
//         _rawMainImage
//           ? imageUrlFor(buildImageObj(_rawMainImage))
//               .width(600)
//               .quality(90)
//               .url()
//           : null
//       }
//     >
//       <Wrapper>
//         <SProduct>
//           <h1>{title}</h1>
//           <ImageCarouselThumbs
//             width={600}
//             video={youtubeId}
//             slug={_rawSlug.current}
//             content={images}
//             additionalImages={_rawAdditionalImages}
//           />
//           <ProductContent>
//             <h3>Product Overview:</h3>
//             <RichText
//               noWrapper
//               content={{
//                 copy: _rawDescription || parentProduct._rawDescription,
//               }}
//             />

//             <h3>Product Attributes:</h3>
//             {parentProduct &&
//               parentProduct._rawCustomFields.fields.length !== 0 && (
//                 <CustomFields content={parentProduct._rawCustomFields} />
//               )}
//             {_rawCustomFields.fields.length !== 0 && (
//               <CustomFields content={_rawCustomFields} />
//             )}

//             {youtubeId && (
//               <Modal
//                 modalContent={
//                   <YouTubeVideo title="video" videoId={youtubeId} />
//                 }
//               >
//                 <SvgLoader name="play" color={colors.white} />
//                 <img
//                   src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
//                   alt={title}
//                 />
//               </Modal>
//             )}
//           </ProductContent>
//         </SProduct>
//         <RelatedProducts content={relatedProducts} current={_id} />
//       </Wrapper>
//     </Layout>
//   );
// };

// export default Product;

// export const ProductContent = styled.div`
//   @media screen and (min-width: ${breakpoints.ipadLand}px) {
//     padding-left: 30px;
//     width: calc(100% - 590px);
//   }
// `;

// export const SProduct = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   padding: ${misc.sectionMobileMargin}px 0;

//   h1 {
//     width: 100%;
//   }

//   h3 {
//     margin-top: ${misc.sectionMobileMargin}px;
//   }

//   ${SImageCarouselThumbs} {
//     @media screen and (min-width: ${breakpoints.ipadLand}px) {
//       padding-right: 30px;
//       width: 590px;
//       border-right: 1px solid ${colors.gray};
//     }
//   }
// `;

// export const query = graphql`
//   query ProductQuery($id: String!) {
//     product: sanityProduct(_id: { eq: $id }) {
//       title
//       _id
//       _rawSlug
//       _rawMainImage
//       _rawDescription
//       _rawCustomFields
//       _rawCategories
//       _rawAdditionalImages
//       price
//       productType
//       youtubeId
//       parentProduct {
//         _rawCustomFields
//         _rawDescription
//       }
//     }
//   }
// `;
