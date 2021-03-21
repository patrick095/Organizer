import React, { useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "@emotion/styled";

import "./styles.css"
import Card from './card';
import CalendarM from './calendarM';
import List from './list';

function DraggableDiv(props) {
    // -------------------
      var initial = [
        {id: "id-0", content: "Quote 0", type: "card"},
        {id: "id-1", content: "Quote 1", type: "card"},
        {id: "id-2", content: "Quote 2", type: "card"}
      ]
      const [state, setState] = useState({ quotes: props.allObjects });
      
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
      
      function Quote({ quote, index }) {
        function typeToShow(provided){
            if (quote.type === "card") {
                return (<QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card 
                    obj={quote}
                    i={index}
                    receivedAllObjects={props.allObjects}
                    />
                </QuoteItem>)
            }
            else if (quote.type === "calendarM") {
                return (<QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <CalendarM
                    obj={quote}
                    index={index}
                    receivedAllObjects={props.allObjects}
                    />
                </QuoteItem>)
            }
            else if (quote.type === "list") {
                return (<QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <List
                    obj={quote}
                    i={index}
                    receivedAllObjects={props.allObjects}
                    />
                </QuoteItem>)
            }
            else {
                return (<QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card 
                    obj={quote}
                    i={index}
                    receivedAllObjects={props.allObjects}
                    />
                </QuoteItem>)
            }
        } 
        return (
          <Draggable draggableId={quote.id} index={index}>
            {provided => typeToShow(provided)}
          </Draggable>
        );
      }
      
      const QuoteList = React.memo(function QuoteList({ quotes }) {
        return quotes.map((quote: QuoteType, index: number) => (
          <Quote quote={quote} index={index} key={quote.id} />
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


    // ----------------
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


  