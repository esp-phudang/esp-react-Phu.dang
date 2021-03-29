import React, { useState } from "react";
const TabBar = ({ setTab, handleAddTab, todoObject,currentTab }) => {
  const [tabName, setTabName] = useState();
  const chooseTab = (e) => {
    setTab(e);
  };
  const addTab = () => {
    const newObject = { ...todoObject };
    newObject[tabName] = [];
    handleAddTab(newObject);
    setTabName(" ");
  };

  return (
    <>
      <div className="tab-bar">
        <input
          onChange={(e) => {
            setTabName(e.target.value);
          }}
          value={tabName}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              document.getElementById("addTab").click();
            }
          }}
        />
        <div onClick={addTab} id="addTab">
          +
        </div>
      </div>
      <div className="tab-bar">
        {Object.keys(todoObject).map((tab, index) => {
          return (
            <div
              key={index}
              onClick={chooseTab}
              className={currentTab === tab ? "tab-bar-item-current" : "tab-bar-item"}
              value={tab}
            >
              {tab}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TabBar;
