import React from "react";
import "./style.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import ModalWrapper from "../ModalWrapper";

const CardContainer = styled.div`
  ${(props) => props.styleCss}
`;

const CardBody = styled.div`
  ${(props) => props.styleBody}
`;

const Cards = React.memo(({ cardBody, styleCss, cardMapping, data }) => {
  return (
    <React.Fragment>
      {data.map((obj, index) => (
        <CardContainer className="card" key={obj.id} styleCss={styleCss}>
          <div className="card-body">
            <CardBody className="row" styleBody={cardBody}>
              <div>Name :</div>
              <div>{obj.real_name}</div>
            </CardBody>
            <CardBody className="row" styleBody={cardBody}>
              <div>TImezone :</div>
              <div>{obj.tz}</div>
            </CardBody>
          </div>
          <cardMapping.type
            className={cardMapping.class}
            onClick={() => {
              cardMapping.click(obj, index);
            }}
          >
            {cardMapping.name}
          </cardMapping.type>
        </CardContainer>
      ))}

    </React.Fragment>
  );
});

Cards.defaultProps = {
  styleCss: {
    margin: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,.1)",
    borderRadius: "10px",
    minWidth: "200px",
  },
  cardMapping: {},
  data: [{ id: 0, tz: "ind", real_name: "default" }],
  cardBody: {
    fontSize: "medium",
    fontWeight: 600,
    margin: "3% 2% !important",
    justifyContent: "space-around",
  },
};
Cards.propTypes = {
  cardBody: PropTypes.object,
  data: PropTypes.array,
  cardMapping: PropTypes.object,
  styleCss: PropTypes.object,
};

export default Cards;