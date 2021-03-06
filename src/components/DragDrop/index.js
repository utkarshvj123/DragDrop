import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as Icon from "react-bootstrap-icons";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  findedNotAvailableName,
  findedNotAvailable,
  actionFunction
) => {
  let priorityTypeKey = "";
  if (droppableDestination.droppableId === "priorityLow") {
    priorityTypeKey = "1";
  } else if (droppableDestination.droppableId === "priorityMedium") {
    priorityTypeKey = "2";
  } else if (droppableDestination.droppableId === "priorityHigh") {
    priorityTypeKey = "3";
  }
  const sourceClone = Array.from(source);

  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, {
    ...removed,
    priority: priorityTypeKey,
  });

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  result[findedNotAvailableName] = findedNotAvailable;
  actionFunction({
    ...removed,
    priority: priorityTypeKey,
    due_date: new Date(removed.due_date),
    result,
  });
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

class DragDrop extends Component {
  state = {
    items: this.props.listOfAllTasks.low,
    selected: this.props.listOfAllTasks.medium,
    otherSelected: this.props.listOfAllTasks.high,
    completeData: this.props.listOfAllTasks.dueDatedArray,
  };
  static getDerivedStateFromProps(props, state) {
    if (
      props.listOfAllTasks.dueDatedArray.length >= 0 &&
      props.listOfAllTasks.low.length >= 0 &&
      props.listOfAllTasks.medium.length >= 0 &&
      props.listOfAllTasks.high.length >= 0
      // props.listOfAllTasks.length !== state.completeData.length
    ) {
      const filteredData = props.listOfAllTasks;
      return {
        completeData: filteredData.dueDatedArray,
        items: filteredData.low,
        selected: filteredData.medium,
        otherSelected: filteredData.high,
      };
    } else return { ...state };
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    priorityLow: "items",
    priorityMedium: "selected",
    priorityHigh: "otherSelected",
  };

  setOfAllData = ["priorityLow", "priorityMedium", "priorityHigh"];
  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "priorityMedium") {
        state = { selected: items };
      } else if (source.droppableId === "priorityHigh") {
        state = { otherSelected: items };
      }

      this.setState(state);
    } else {
      let setofCurrentSelected = [];
      setofCurrentSelected.push(source.droppableId);
      setofCurrentSelected.push(destination.droppableId);
      let findingNotAvaiable = this.setOfAllData.filter(
        (f) => !setofCurrentSelected.includes(f)
      );
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
        findingNotAvaiable[0],
        this.state[this.id2List[findingNotAvaiable[0]]],
        this.props.handleDragDrop
      );

      this.setState({
        items: result.priorityLow,
        selected: result.priorityMedium,
        otherSelected: result.priorityHigh,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let newSetData = [
      this.state.items,
      this.state.selected,
      this.state.otherSelected,
    ];
    return (
      <>
        {this.props.listOfAllTasks.dueDatedArray.length > 0 ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            {newSetData.map((valueData, indexValue) => (
              <Droppable
                key={indexValue}
                droppableId={
                  indexValue === 0
                    ? "priorityLow"
                    : indexValue === 1
                    ? "priorityMedium"
                    : "priorityHigh"
                }
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="draggable-inner-container"
                  >
                    <div className="heading">
                      {indexValue === 0
                        ? "Low Priority"
                        : indexValue === 1
                        ? "Medium priority"
                        : "High Priority"}{" "}
                    </div>
                    {valueData.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        className="inner-drop-down"
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="draggable-component"
                          >
                            <div
                              className="cross-button"
                              onClick={() => this.props.handlingRemoval(item)}
                            >
                              <Icon.ArchiveFill color="red" size={18} />
                            </div>
                            <div
                              className="detail-element"
                              onClick={() => this.props.handlingEdit(item)}
                            >
                              {item.message}
                            </div>
                            <div className="bottom-wrapper">
                              <div className="priority-wrapper">
                                <Icon.ArrowUp
                                  color={
                                    item.priority === "1"
                                      ? "green"
                                      : item.priority === "2"
                                      ? "yellow"
                                      : "red"
                                  }
                                  size={20}
                                />
                                <div className="text-styling">
                                  {item?.due_date?.toLocaleDateString()}
                                </div>
                              </div>
                              <div className="img-name-wrapper">
                                <div className="circular-name">
                                  <img
                                    src={item.picture}
                                    className="text-name"
                                  />
                                </div>
                                <div className="text-styling">
                                  {item?.assigned_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        ) : (
          <div>No data found</div>
        )}
      </>
    );
  }
}
export default DragDrop;
