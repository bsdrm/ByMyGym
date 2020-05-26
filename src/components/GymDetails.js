import React, {Component} from "react";
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";
import GymName from './GymName'

class GymDetails extends Component {

  state = { Gyms: [] };

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .where('id', '==', 'F4fQlpqhN55cC6PuIkZn')
      .get()
      .then(querySnapshot => {
        const Gyms = [];

        querySnapshot.forEach(function(doc) {
          Gyms.push({
            gymName: doc.data().gymName,
            street: doc.data().street,
            zip: doc.data().zip,
            city: doc.data().city,
            height: doc.data().height,
            width: doc.data().width,
            length: doc.data().width,
            price: doc.data().price,
            audience: doc.data().audience,
            changingRooms: doc.data().changingRooms,
            id: doc.data().id
          });

        });
        
        this.setState({ Gyms });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    }

    render() {

    return (
      <div>
                
                {this.state.Gyms.map((gym) => {
                    return (
                        <div>
                            <div>
                                <div>
                                  <GymName title={gym.gymName}></GymName> 
                                  <div className="gym-info">                           
                                    <p>Adres: {gym.street}, {gym.city} {gym.zip}</p>
                                    <p>Wymiary: {gym.length}m x {gym.width}m x {gym.height}m</p>
                                    <p>Cena za godzinę: {gym.price}zł</p>
                                    <p>Szatnie: {gym.changingRooms}</p>
                                    <p>Ilość miejsc na widowni: {gym.audience}</p>
                                    <p>Parking: </p>
                                  </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
    
            </div>
    );
  }
};

export default GymDetails;