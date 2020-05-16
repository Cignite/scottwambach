import React, { useState, useContext } from 'react';
import IcomoonReact from 'icomoon-react';
import { Link } from 'gatsby';
import { SiteContext } from '../Layout';
import iconSet from '../../fonts/selection.json';
import PageLink from '../helpers/PageLink';
import { colors } from '../../styles/utilities/settings';

const Menu = ({ menuTitle, noSub }) => {
  const { menus } = useContext(SiteContext);

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <ul className="menu">
      {menus.map(
        ({ node: { title, items } }) =>
          title === menuTitle &&
          items.map(({ _key, link, subItems }, index) => (
            <li
              key={_key}
              onMouseLeave={() => {
                setActiveIndex(null);
              }}
              className={`${subItems.length !== 0 ? 'hasSub' : ''} ${
                activeIndex === index ? 'open' : ''
              }`}
            >
              {(link.page || link.url) === '#' ? (
                <span>{link.copy}</span>
              ) : (
                <>
                  {link.newTab ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onFocus={() =>
                        subItems.length !== 0
                          ? setActiveIndex(index)
                          : setActiveIndex(null)
                      }
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: link.copy,
                        }}
                      />
                    </a>
                  ) : (
                    <Link
                      onFocus={() =>
                        subItems.length !== 0
                          ? setActiveIndex(index)
                          : setActiveIndex(null)
                      }
                      to={link.url}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: link.copy,
                        }}
                      />
                    </Link>
                  )}
                </>
              )}

              {subItems.length !== 0 && !noSub && (
                <a
                  href={null}
                  onClick={() => {
                    setActiveIndex(activeIndex === index ? null : index);
                  }}
                  className="subToggle"
                >
                  <IcomoonReact
                    iconSet={iconSet}
                    color={colors.black}
                    size={20}
                    icon={activeIndex === index ? 'minus' : 'plus'}
                  />
                </a>
              )}
              {subItems.length !== 0 && (
                <ul>
                  {subItems.map(subItem => (
                    <li key={subItem._key}>
                      <PageLink content={subItem} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
      )}
    </ul>
  );
};

export default Menu;
