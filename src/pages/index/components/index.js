import React, { useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "@emotion/styled";

import "./styles.css"
import Card from './card';
import CalendarM from './calendarM';
import List from './list';

function DraggableDiv(props) {
    const [allObjects, setAllObjects] = props.children
      const [state, setState] = useState({ quotes: allObjects });
      useEffect(()=>{
        setState({ quotes: allObjects })
      },[allObjects])
      
      const grid = 8;
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
      
      const QuoteItem = styled.div`
        user-selectet: none;
        min-width: 220px;
        height: 100px;
        margin: 10px;
        margin-bottom: ${grid}px;
      `;
      //Verifica o tipo de Item
      function typeToShow(quote, index){
        if (quote.type === "card") {
            return (
                <Card 
                obj2={quote}
                i={index}
                allObjects={allObjects}
                setAllObjects={setAllObjects}
                />)
        }
        else if (quote.type === "calendarM") {
            return (
                <CalendarM
                obj2={quote}
                index={index}
                allObjects={allObjects}
                setAllObjects={setAllObjects}
                />)
        }
        else if (quote.type === "list") {
            return (
                <List
                obj2={quote}
                i={index}
                allObjects={allObjects}
                setAllObjects={setAllObjects}
                />)
        }
        else {
            return (
                <Card 
                obj={quote}
                i={index}
                receivedAllObjects={allObjects}
                setAllObjects2={setAllObjects}
                />)
        }
      } 
      
      function Quote({ quote, index }) {
        return (
          <Draggable draggableId={"id"+index} index={index}>
            {provided => (
            <QuoteItem
                    key={"card"+index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
              {typeToShow(quote, index)}
              </QuoteItem>
              )}
          </Draggable>
        );
      }
      
      const QuoteList = React.memo(function QuoteList({ quotes }) {
        return quotes.map((quote, index) => (
          <Quote quote={quote} index={index} key={"id"+index} />
        ));
      });
      
        function onDragEnd(result) {
          if (!result.destination) {
            return;
          }
      
          if (result.destination.index === result.source.index) {
            return;
          }
      
          const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index
          );
      
          setState({ quotes });
        }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" direction="horizontal" style={{display:"flex"}}>
              {provided => (
                <div className="droppableDiv" ref={provided.innerRef} {...provided.droppableProps}>
                  <QuoteList quotes={state.quotes} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
    )
}

export default DraggableDiv;


  