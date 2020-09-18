import React, { Component, useState, useEffect } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
const db = firebase.firestore();

function ListItems(props) {
  const data = JSON.parse(props.value);
  const docId = data.docId;

  const [idItem, setidItem] = useState([]);

  function DeleteItemFromFirebase(e) {
    e.preventDefault();
    db.collection("bookings")
      .doc(docId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted! Doc: " + docId);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    // window.location.reload(false);
  }

  function ChangeStatus(e) {
    e.preventDefault();
    console.log("change status run");
    db.collection("bookings")
      .doc(docId)
      .update({ title: "Zarezerwowane" })
      .then(function () {
        console.log("Status successfully changed! Doc: " + docId);
      })
      .catch(function (error) {
        console.error("Error changing status: ", error);
      });
  }

  return (
    <>
      <div style={{ border: "2px solid var(--darkOrange)" }}>
        <table style={{ width: "100%", margin: "10px" }}>
          <tbody>
            <tr>
              <td>Nazwa budynku</td>
              <td></td>
            </tr>
            <tr>
              <td>Status rezerwacji</td>
              <td></td>
            </tr>
            <tr>
              <td>Data dodania</td>
              <td></td>
            </tr>
            <tr>
              <td>Rezerwacja ID</td>
              <td>{data.docId}</td>
            </tr>
            <tr>
              <td>Dane</td>
              <td>{props.value}</td>
            </tr>
          </tbody>
        </table>
        <button style={{ margin: "10px" }} onClick={DeleteItemFromFirebase}>
          Usuń
        </button>
        <button style={{ margin: "10px" }} onClick={ChangeStatus}>
          Zmień status
        </button>
      </div>
      <br />
    </>
  );
}

class BookingView extends Component {
  constructor(props) {
    super(props);
    this.state = { bookingItems: [] };
  }

  componentDidMount() {
    db.collection("bookings")
      // .orderBy("gymName")
      .get()
      .then((items) => {
        const bookingItems = items.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        this.setState({ bookingItems: bookingItems });
        this.bookingItems = bookingItems;
        // console.log(
        //   "Show booking items: " + JSON.stringify(bookingItems, null, 4)
        // );
      });
  }

  render() {
    return (
      <div>
        <div id="pls"></div>

        <div className="admin-page">
          <h1 style={{ textAlign: "center", color: "var(--darkOrange)" }}>
            Zarządzaj rezerwacją
          </h1>
          {this.state.bookingItems.map((item, index) => (
            <ListItems
              key={index}
              // key={this.state.bookingItems.docId}
              value={JSON.stringify(item, null, 4)}
              gymName={JSON.stringify(item.gymName)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BookingView;
