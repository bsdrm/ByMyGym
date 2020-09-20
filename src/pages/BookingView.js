import React, { Component, useState, useEffect } from "react";
import firebase from "firebase";
import "../theme/react-week-scheduler.css";
import { Link } from "react-router-dom";
const db = firebase.firestore();

// bookings

function ListItems(props) {
  const data = JSON.parse(props.value);
  const docId = data.docId;

  const [idItem, setidItem] = useState([]);

  function DeleteItemFromFirebase(e) {
    e.preventDefault();
    db.collection("reservation")
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
    db.collection("reservation")
      .doc(docId)
      .update({ title: "Zarezerwowane", bgColor: "#90EE90" })
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
              <td>Data dodania</td>
              <td>{data.reservation_date ? data.reservation_date : ""}</td>
            </tr>
            <tr>
              <td>Status rezerwacji</td>
              <td>{data.title}</td>
            </tr>
            <tr>
              <td>Czas rezerwacji</td>
              <td>
                {data.start} - {data.end}
              </td>
            </tr>
            <tr>
              <td>Budynek ID</td>
              <td>{data.gym_id}</td>
            </tr>
            <tr>
              <td>Rezerwacja ID</td>
              <td>{data.docId}</td>
            </tr>
            {/* <tr>
              <td>Dane</td>
              <td>{props.value}</td>
            </tr> */}
          </tbody>
        </table>
        <button style={{ margin: "10px" }} onClick={DeleteItemFromFirebase}>
          Usuń
        </button>
        <button style={{ margin: "10px" }} onClick={ChangeStatus}>
          Zmień status
        </button>
        <Link
          to={{
            pathname: `/gym_profile/${data.gym_id}`,
          }}
        >
          <button style={{ margin: "10px", color: "black" }}>
            Więcej informacji
          </button>
        </Link>
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
    db.collection("reservation")
      .orderBy("title")
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BookingView;
