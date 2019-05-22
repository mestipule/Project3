import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Intersections extends Component {
  state = {
    intersections: [],
    address: "",
    city: "",
    State: "",
    rating: ""
  };

  componentDidMount() {
    this.loadIntersections();
  }

  loadIntersections = () => {
    API.getIntersections()
      .then(res => {
        this.setState({ intersections: res.data, address: "", city: "", State: "", rating: ""})
        console.log("Res");
        console.log(res)
      }
      )
      .catch(err => console.log(err));
  };

  deleteIntersection = id => {
    API.deleteIntersection(id)
      .then(res => this.loadIntersections())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.address && this.state.city && this.state.State) {
      API.saveIntersection({
        address: this.state.address,
        city: this.state.city,
        State: this.state.State,
        rating: this.state.rating
      })
        .then(res => this.loadIntersections())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add Dangerous Intersections</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="address (required)"
              />
              <Input
                value={this.state.city}
                onChange={this.handleInputChange}
                name="city"
                placeholder="city (required)"
              />
              <Input
                value={this.state.State}
                onChange={this.handleInputChange}
                name="State"
                placeholder="State (required)"
              />
              <Input
              value={this.state.Rating}
              onChange={this.handleInputChange}
              name="rating"
              placeholder="Rating (Optional)"
            />
              <FormBtn
                disabled={!(this.state.city && this.state.address)}
                onClick={this.handleFormSubmit}
              >
                Submit Intersection
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Dangerous Intersections List</h1>
            </Jumbotron>
            {this.state.intersections.length ? (
              <List>
                {this.state.intersections.map(intersection => (
                  <ListItem key={intersection._id}>
                    <Link to={"/intersections/" + intersection._id}>
                      <strong>
                        {intersection.address} by {intersection.city}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(intersection._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Intersections;

