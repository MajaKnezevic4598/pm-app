import React, { useEffect } from 'react';

import Default from '../../assets/no-image.png';
import './EmployeeProjectView.scss';
import './EmployeeProjectViewInfo.scss';
import EmployeeNote from './EmployeeNote';
import EmptyNote from './EmptyNote';

const EmployeeProjectViewInfo = (props) => {
  useEffect(() => {
    console.log(props.notes);
  }, [props.notes]);

  const Image = React.memo(function Image({ src }) {
    return (
      <img
        src={src}
        className="employee-info__left__picture"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Default;
        }}
        alt="SomePhoto"
      />
    );
  });
  return (
    <>
      <div className="employee">
        <div className="emp__description">
          <div className="flex-container">
            <div className="header-logo">
              <Image
                src={
                  props.logo
                    ? 'https://pm-app-bek.herokuapp.com' + props.logo
                    : Default
                }
              />
            </div>
            <div className="employee__description__left">
              <div>{props.name}</div>
              <div>{props.description}</div>
            </div>
          </div>
          <div className="emp__description__right">
            <div className="manager">{props.projectManagerName}</div>
            <div className="emp__description__right__pmlogo">
              <Image
                src={
                  props.projectManagerPhoto
                    ? 'https://pm-app-bek.herokuapp.com' +
                      props.projectManagerPhoto
                    : Default
                }
              />
            </div>
          </div>
          <div className="emp__description__toright">
            <p>Employees</p>
            {props.employees.map((employee) => {
              return (
                <Image
                  src={
                    employee.attributes.profilePhoto.data
                      ? 'https://pm-app-bek.herokuapp.com' +
                        employee.attributes.profilePhoto.data.attributes.url
                      : Default
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="employee-info__content">
          <header style={{ display: 'flex', overflowX: 'scroll' }}>
            {props.categories?.map((category) => {
              return (
                <section
                  style={{
                    backgroundColor:
                      props.categoryName === category.attributes.name
                        ? '#f8f8f8'
                        : '#62929e',
                    padding:
                      props.categoryName === category.attributes.name
                        ? '2rem 1rem'
                        : '2rem 1rem',
                    color:
                      props.categoryName === category.attributes.name
                        ? 'black'
                        : 'white',
                    //   border:
                    //     props.categoryName === category.attributes.name
                    //       ? '1px solid gray'
                    //       : 'none',

                    borderRadius:
                      props.categoryName === category.attributes.name
                        ? '0px 0px 1px 1px'
                        : '5px',
                  }}
                  onClick={() =>
                    props.setCategoryName(category.attributes.name)
                  }
                >
                  {category.attributes.name}
                </section>
              );
            })}
          </header>
          <section
            className="section__body"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              maxWidth: '960px',
              justifyContent: 'center',
              paddingBottom: '1rem',
              paddingTop: '1rem',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignContent: 'center',
                flexWrap: 'wrap',
              }}
              className="employee__content"
            >
              <input
                value={props.nameFilter}
                onChange={props.searchByName}
                type={'text'}
                placeholder="Search"
              />
              <select
                onChange={(e) => props.setSortValue(e.target.value)}
                name="value"
                id="value-select"
              >
                <option value={'ASC'}>Sort by:</option>
                <option value={'ASC'}>Oldest</option>
                <option value={'DESC'}>Newest</option>
              </select>
            </div>
            <div>
              {props.notes?.length < 1 ? <EmptyNote /> : null}
              {props.notes?.map((note) => {
                return (
                  <EmployeeNote
                    name={note.attributes.title}
                    description={note.attributes.description}
                    photo={
                      note.attributes.profile.data?.attributes.profilePhoto.data
                        ?.attributes.url
                    }
                    pmName={note.attributes.profile.data?.attributes.name}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default EmployeeProjectViewInfo;
