/* Search container*/
import "./../index.css";
import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Search = ({
  cityValue,
  cityChangeValue,
  cityListSuggestions,
  onClickItem,
  visibility,
  onSubmit,
}) => {
  return (
    <Row className="search-box">
      <Col>
        <div className="search-bar">
          <Form.Group>
            <Form.Control
              type="text"
              value={cityValue}
              onChange={cityChangeValue}
              onBlur={visibility}
              placeholder="Search weather by city"
            />
            <button onClick={onSubmit}>Search</button>
          </Form.Group>
        </div>
        {cityListSuggestions &&
          cityListSuggestions.map((s, i) => (
            <div
              key={i}
              className="search-bar-autocomplete"
              onClick={() =>
                onClickItem(
                  s.LocalizedName,
                  s.Country.LocalizedName,
                  s.Country.ID
                )
              }
            >
              {/*  {s.name ? s.name : "no match found"} */}
              {s.name},{s.LocalizedName},{s.Country.ID}
            </div>
          ))}
      </Col>
    </Row>
  );
};

Search.propTypes = {
  cityValue: PropTypes.string.isRequired,
  cityChangeValue: PropTypes.func.isRequired,
  cityListSuggestions: PropTypes.array.isRequired,
  onClickItem: PropTypes.func.isRequired,
  visibility: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default Search;
