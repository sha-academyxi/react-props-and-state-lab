import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleClick = () => {
    fetch('/api/pets')
      .then(resp => resp.json())
      .then(pets => {
        this.setState({
          pets,
        })
      })
  }

  adoptPet = (petIndex) => {
    this.state.pets[petIndex].isAdopted = true

    const petsCopy = [...this.state.pets]
    petsCopy[petIndex].isAdopted = true
    this.setState({
      pets: petsCopy,
    })
  }

  handleFilterChange = (type) => {
    this.setState({
      filters: {
        type,
      }
    })
  }

  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters handleClick={this.handleClick} handleFilterChange={this.handleFilterChange} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets.filter(pet => {
                if (this.state.filters.type === 'all') {
                  return true
                }

                return pet.type === this.state.filters.type
              })} adoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
