import React, { useState, useEffect } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";


const Patrons = ({ patrons, onRemove }) => {
  const [patronData, updatePatronData] = useState([])

  const patronStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'cyan'
  }

  useEffect(() => {
    updatePatronData(patrons)
  }, [patrons])

  return (
    <Container>
    <Row className="vh-90 d-flex justify-content-center align-items-center">
      <Col md={8} lg={6} xs={12}>
        <div className="patron-list">
          {patronData.map(patron => (
          <Card className="shadow">
            <Card.Body>
            <div
              className="patron"
              key={patron.id}
              style={{
                backgroundColor: parseFloat(patron.alcoholSaturation) > 0.08 ? 'red' : 'transparent',
                color: parseFloat(patron.alcoholSaturation) > 0.08 ? 'white' : 'black',
              }}
            >
              <div className="id">{patron.id}</div>
              <div className="name">{patron.name}</div>
              <div className="alcoholSaturation">{patron.alcoholSaturation}</div>
              <a href="#" onClick={() => onRemove(patron.id)} className="remove-link">Remove</a>
            </div>
          </Card.Body>
          </Card>
          ))}
        </div>
      </Col>
      </Row>
    </Container>
  );
}

export default Patrons
