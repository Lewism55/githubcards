import React from 'react';
import './App.css';
import axios from 'axios';

// const CardList = (props) => {
//   return (
//   <div>
//     {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
//   </div>
//   );
// };

class CardList extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.profiles.map(profile => <Card key={profile.id} {...profile} handleRemove={this.props.handleRemove}/>)}
        </div>
      </div>
    );
  }
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
    <div className="github-profile">
      <img src={profile.avatar_url} style={{width: "200px"}} alt="user"/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
      <div>
          <button onClick={() => {this.props.handleRemove(profile.id)}} > remove {profile.id}</button>
      </div>
    </div>
    );
  }
};

class Form extends React.Component {
  state = { userName: ''};

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await
    axios.get(`https://api.github.com/users/${this.state.userName}`) //note this returns a promise, hence we use an await
    this.props.onSubmit(resp.data); //.data changes an axios response into JSON
    this.setState({ userName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value})}
          placeholder="GitHub Username"
          required
        />
        <button>Add Card</button>
      </form>
    )
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  addNewProfile = (profileData) => {
    this.setState( (prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };

  handleRemove(profileId) {
      let newProfiles = this.state.profiles;
      console.log(newProfiles);
      newProfiles = newProfiles.filter(profile => profile.id !== profileId);
      console.log(newProfiles);
      this.setState({profiles: newProfiles});
  }

  render() {
    return (
    <div>
      <div>{this.props.title}</div>
      <Form onSubmit={this.addNewProfile} />
      <CardList profiles={this.state.profiles} handleRemove={this.handleRemove}/>
    </div>
    );
  }
}

export default App;