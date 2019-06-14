import React from "react";
import api from "./api";
import "semantic-ui-css/semantic.min.css";
import { Container, Grid, Header, Input, Icon, Card } from "semantic-ui-react";

class App extends React.Component {
  constructor() {
    super();
    this.usernameRef = React.createRef();
  }
  state = {
    repos: [],
    username: "",
    errorMessage: new Date().toLocaleDateString("de-DE")
  };

  getUserRepos = async () => {
    try {
      const { data } = await api.get(`users/${this.state.username}/repos`);
      this.setState({
        repos: data
      });
    } catch (error) {
      this.setState({
        errorMessage: `No repo found for user ${this.state.username}`
      });
    }
  };

  handleInput = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Search For Your Repo on Github</Header>

          <Input
            autoFocus
            onChange={this.handleInput}
            style={{ width: "400px" }}
            size="small"
            action="Search"
            action={{ content: "Search", onClick: this.getUserRepos }}
            placeholder="Search..."
            name="username"
            id="username"
            type="text"
          />
          <Grid divided stackable>
            <Grid.Column width={3}>
              <Card.Group>
                {this.state.repos.length ? (
                  <div style={{ textAlign: "center" }}>
                    {this.state.repos.map(repo => {
                      return (
                        <Card>
                          <Card.Content header={repo.name} />
                          <Card.Content description={repo.description} />
                          <Card.Content extra>
                            <Icon name="info" />
                            {repo.open_issues_count}
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
