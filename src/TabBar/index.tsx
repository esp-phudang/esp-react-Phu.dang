import React, { useState } from "react";
import { TodoItem } from "src/App";

export interface Props {
  setTab: (e: any) => void;
  handleAddTab: (obj: { [key: string]: TodoItem[] }) => void;
  todoObject: () => void;
  currentTab: string;
}

const TabBar = ({ setTab, handleAddTab, todoObject, currentTab }: Props) => {
  const [tabName, setTabName] = useState<string>("");
  const chooseTab = (e: any) => {
    setTab(e);
  };
  const addTab = () => {
    const newObject: any = { ...todoObject };
    newObject[tabName] = [];
    handleAddTab(newObject);
    setTabName(" ");
  };

  return (
    <div className="tab-bar">
      {Object.keys(todoObject).map((tab, index) => {
        return (
          <div
            key={index}
            onClick={chooseTab}
            className={
              currentTab === tab ? "tab-bar-item-current" : "tab-bar-item"
            }
          >
            {tab}
          </div>
        );
      })}
      <input
        placeholder="Add new todo List!"
        className="add-tab"
        onChange={(e) => {
          setTabName(e.target.value);
        }}
        value={tabName}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            // document.getElementById("addTab")?.click();
            document.getElementById("myInput")?.focus();
            addTab()
          }
        }}
      />
      {/* <div onClick={addTab} id="addTab">
        +
      </div> */}
    </div>
  );
};
export default TabBar;
