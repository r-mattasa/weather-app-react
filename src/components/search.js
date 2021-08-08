/* Search container*/
import React from 'react';
import './../index.css';
import { Row, Col, Form } from 'react-bootstrap';

const Search = ({ cityValue, cityChangeValue, cityListSuggestions,visibility,onClickItem, onSubmit }) => {

  return (
    <Row className='search-box'>
      <Col>
        <div className="search-bar">
          <Form.Group>
            <Form.Control
              type="text"
              value={cityValue}
              onChange={cityChangeValue}
              onBlur={visibility}
              onKeyPress={onSubmit}
              placeholder="Enter City Name......" />
          </Form.Group>
        </div>
        {
          cityListSuggestions.map((s, i) =>
          <div key={i} className="search-bar-autocomplete" onClick={() => onClickItem(s.LocalizedName, s.Country.LocalizedName, s.Country.ID)}>
            {s.LocalizedName},{s.Country.LocalizedName},{s.Country.ID}
          </div>
          )
        }

      </Col>
    </Row>

  );
}

export default Search;
