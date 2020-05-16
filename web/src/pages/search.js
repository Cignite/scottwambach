import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Link } from 'gatsby';
import styled from 'styled-components';
import sanityClient from '@sanity/client';
import Layout from '../components/Layout';
import Wrapper from '../styles/utilities/Wrapper';
import { misc, colors, font } from '../styles/utilities/settings';
import { Input, Submit } from '../styles/modules/Inputs';
import Form from '../styles/modules/Form';
import ImageLoader from '../components/helpers/ImageLoader';
import Loader from '../components/helpers/Loader';

const { GATSBY_SANITY_ID } = process.env;
const { GATSBY_SANITY_DATASET } = process.env;
const { GATSBY_SANITY_TOKEN } = process.env;

const ListItem = ({ searchItem }) => (
  <div key={searchItem._id}>
    <Link to={searchItem.slug.current} className="search-item">
      <div className="image">
        <div style={{ width: '80px', height: '80px' }}>
          <ImageLoader
            src={searchItem.mainImage}
            width={80}
            height={80}
            visible
            alt={searchItem.title}
          />
        </div>
      </div>
      <div className="content">
        <h3>{searchItem.title}</h3>
        <p>{searchItem.metaDescription && searchItem.metaDescription}</p>
        <sub>{searchItem.slug.current}</sub>
      </div>
    </Link>
  </div>
);

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const fuzzy = input => {
    setLoading(true);

    const options = {
      keys: ['title', 'slug.current', 'metaDescription'],
      threshold: 0.5,
    };

    const client = sanityClient({
      projectId: GATSBY_SANITY_ID,
      dataset: GATSBY_SANITY_DATASET,
      token: GATSBY_SANITY_TOKEN,
      useCdn: true,
    });

    const query = '*[_type in ["post", "page"]]';

    client.fetch(query).then(data => {
      const fuse = new Fuse(data, options);
      setSearchResults(fuse.search(input));
      setLoading(false);
    });
  };

  useEffect(() => {
    fuzzy(global.localStorage.getItem('searchTerm'));
  }, []);

  return (
    <Layout title="Search">
      {loading && <Loader bg />}
      <div
        style={{
          textAlign: 'center',
          margin: `${misc.sectionMargin / 2}px 0`,
        }}
      >
        <h1>Search</h1>
      </div>
      <Wrapper narrow>
        <Form
          onSubmit={e => {
            e.preventDefault();
            fuzzy(global.localStorage.getItem('searchTerm'));
          }}
          className="singleSubmit"
        >
          <Input
            type="search"
            placeholder="What are you looking for?"
            onChange={e => {
              if (typeof window !== 'undefined') {
                global.localStorage.setItem('searchTerm', e.target.value);
              }
            }}
          />
          <Submit type="submit" value="Search" />
        </Form>
        {searchResults && (
          <SearchList>
            <h4>
              {`${
                searchResults.length !== 0 ? 'Showing' : 'No'
              } results for: ${global.localStorage.getItem('searchTerm')}`}
            </h4>
            {searchResults.map(searchItem => (
              <ListItem searchItem={searchItem} key={searchItem._id} />
            ))}
          </SearchList>
        )}
      </Wrapper>
    </Layout>
  );
};

export default SearchPage;

const SearchList = styled.li`
  margin: 50px 0 ${misc.sectionMargin}px;
  list-style: none;

  li {
    + li {
      margin-top: 30px;
    }
  }

  a {
    display: flex;
    text-decoration: none;
  }

  h3 {
    font-size: 18px;
    font-family: ${font.secondary};
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${colors.gray};
  }

  p {
    font-size: 14px;
    margin-bottom: 0px;
  }

  sub {
    font-size: 10px;
    color: ${colors.green};
  }

  .image {
    padding-right: 20px;
  }
`;
