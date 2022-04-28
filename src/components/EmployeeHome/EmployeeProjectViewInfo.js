import React, { useRef, useState } from "react";

import Default from "../../assets/no-image.png";
import "./EmployeeProjectView.scss";
import "./EmployeeProjectViewInfo.scss";
import EmployeeNote from "./EmployeeNote";
import EmptyNote from "./EmptyNote";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import uuid from "react-uuid";
import { useNavigate } from "react-router";

const EmployeeProjectViewInfo = (props) => {
  const [activeTab, setActiveTab] = useState("");

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  let scrl = useRef(null);

  const styleHeader = {
    borderBottom: "2px solid #987197",
  };

  const styleSection = {
    borderLeft: "2px solid #987197",
    borderRight: "2px solid #987197",
    borderBottom: "2px solid #987197",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
  };

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const handleTab = (index) => {
    setActiveTab(`category-${index}`);
  };
  const navigate = useNavigate();

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
                    ? "https://pm-app-bek.herokuapp.com" + props.logo
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
                    ? "https://pm-app-bek.herokuapp.com" +
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
                      ? "https://pm-app-bek.herokuapp.com" +
                        employee.attributes.profilePhoto.data.attributes.url
                      : Default
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="notes-view">
          <div className="notes-view__conteiner">
            <div className="header-conteiner">
              {scrollX !== 0 && (
                <button className="prev" onClick={() => slide(-100)}>
                  <BsFillCaretLeftFill className="left-arrow" />
                </button>
              )}
              <header
                style={activeTab ? styleHeader : null}
                ref={scrl}
                onScroll={scrollCheck}
              >
                {props.categories?.map((category, index) => {
                  return (
                    <div
                      className={
                        activeTab === `category-${index}` ? "active" : ""
                      }
                      onClick={() => {
                        props.setCategoryName(category.attributes.name);
                        handleTab(index);
                      }}
                    >
                      {category.attributes.name}
                    </div>
                  );
                })}
              </header>
              {!scrolEnd && (
                <button className="next" onClick={() => slide(+100)}>
                  <BsFillCaretRightFill className="right-arrow" />
                </button>
              )}
            </div>

            <section style={activeTab ? styleSection : null}>
              <div className="add-search-filter">
                <div>
                  <input
                    value={props.nameFilter}
                    onChange={props.searchByName}
                    type={"text"}
                    placeholder="Search"
                  />
                </div>
                <div>
                  {" "}
                  <select
                    onChange={(e) => props.setSortValue(e.target.value)}
                    name="value"
                    id="value-select"
                  >
                    <option value={"ASC"}>Sort by:</option>
                    <option value={"ASC"}>Oldest</option>
                    <option value={"DESC"}>Newest</option>
                  </select>
                </div>
                <div>
                  {/* <button className="add-project" onClick={changeFunction}> */}
                  <button>ADD NOTE</button>
                </div>
              </div>
              <div className="empty-note">
                {props.notes?.length < 1 ? <EmptyNote /> : null}
                {props.notes?.map((note) => {
                  return (
                    <EmployeeNote
                      name={note.attributes.title}
                      description={note.attributes.description}
                      photo={
                        note.attributes.profile.data?.attributes.profilePhoto
                          .data?.attributes.url
                      }
                      pmName={note.attributes.profile.data?.attributes.name}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        {/* <div className="employee-info__content">
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
        </div> */}
      </div>
    </>
  );
};

export default EmployeeProjectViewInfo;
