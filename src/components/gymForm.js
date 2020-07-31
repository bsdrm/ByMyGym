import React, { Component, useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import firebase from "../firebase";
import "firebase/storage";
import ImageUpload from "./ImageUpload";
import Listing from "./Listing";
import FileUploader from "react-firebase-file-uploader";
import DragAndDrop from "./DragAndDrop";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import validate from './FormValidationRules';
import { IsEmpty, Map } from "react-lodash"
import validated from "./Validated";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    width: "15rem",
    height: "auto",
    color: "black",
    top: "50%",
    bottom: "auto",
    marginLeft: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1rem",
    fontFamily: "Arial",
  },
};

export default function gymForm() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // modal
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  // function openModal() {
  //   if (validate()) {
  //     setIsOpen(true);
  //   }
    
  // }
  // function closeModal() {
  //   setIsOpen(false);
  // }

  // const { register, handleSubmit, errors } = useForm();

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");

  const [userUID, setUserUID] = useState("");

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUserUID(user.uid);
    } else {
      console.log("nie pykło");
    }
  });

  // function handleValidation() {

  // }

  var storage = firebase.storage();
  const db = firebase.firestore();

  const ref = db.collection("gyms").doc();

  var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // if (obj == null) return true;


    // if (obj.length > 0)    return false;
    // if (obj.length === 0)  return true;

    // if (typeof obj !== "object") return true;


    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);



    console.log(validated(values));

    // if (typeof(errors) !== "object") {
    //   // console.log(isEmpty(errors));
    //   console.log("zero errors");
    // } else {
    //   // console.log(isEmpty(errors));
    //   console.log("errors");
    // }

    
    const uploadTask = storage
      .ref(`/photos/${imageAsFile.name}`)
      .put(imageAsFile);

    uploadTask
      .then((uploadTaskSnapshot) => {
        return uploadTaskSnapshot.ref.getDownloadURL();
      })
      .then((gymPhoto) => {
        setImageAsUrl(gymPhoto);
        db.collection("gyms")
          .add({
            gymName: values.gymName,
            // gymStreet,
            // gymCity,
            // gymZip,
            // gymURL,
            // gymEmail,
            // gymPhone,
            // gymPhoto,
            // gymDescription,
            // gymHeight,
            // gymWidth,
            // gymLength,
            // gymPrice,
            // audience,
            // changingRooms,
            // id: ref.id,
            // owner: userUID,
          })
          .then(() => {
            setGymName("");
          });
      });

      setErrors({});
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  // function onSubmit(e) {
  //   const uploadTask = storage
  //     .ref(`/photos/${imageAsFile.name}`)
  //     .put(imageAsFile);

  //   uploadTask
  //     .then((uploadTaskSnapshot) => {
  //       return uploadTaskSnapshot.ref.getDownloadURL();
  //     })
  //     .then((gymPhoto) => {
  //       setImageAsUrl(gymPhoto);
  //       db.collection("gyms")
  //         .add({
  //           gymName: values.gymName,
  //           gymStreet,
  //           gymCity,
  //           gymZip,
  //           gymURL,
  //           gymEmail,
  //           gymPhone,
  //           gymPhoto,
  //           gymDescription,
  //           gymHeight,
  //           gymWidth,
  //           gymLength,
  //           gymPrice,
  //           audience,
  //           changingRooms,
  //           id: ref.id,
  //           owner: userUID,
  //         })
  //         .then(() => {
  //           setGymName("");
  //         });
  //     });
  // }

  function login() {
    console.log('No errors, submit callback called!');
  }

  const [gymName, setGymName] = useState("");
  const [gymStreet, setGymStreet] = useState("");
  const [gymCity, setGymCity] = useState("");
  const [gymZip, setGymZip] = useState("");
  const [gymURL, setGymUrl] = useState("");
  const [gymEmail, setGymEmail] = useState("");
  const [gymPhone, setGymPhone] = useState("");
  const [gymPhoto, setGymPhoto] = useState("");
  const [gymDescription, setGymDescription] = useState("");
  const [gymHeight, setGymHeight] = useState("");
  const [gymWidth, setGymWidth] = useState("");
  const [gymLength, setGymLength] = useState("");
  const [gymPrice, setGymPrice] = useState("");
  const [audience, setAudience] = useState("");
  const [changingRooms, setChangingRooms] = useState("");

  return (
    <form onSubmit={handleSubmit} className="gymForm" noValidate>
      <div className="form-n-gallery">
        <div className="form-only">
          <h5>
            Uwaga! Sala dodaje się, tylko gdy jest załączone zdjęcie. To do
            poprawienia
          </h5>
          <div className="container-2">
            <label>Nazwa budynku</label>
            <div className="control">
                  <input autoComplete="off" className={`input ${errors.gymName && 'is-danger'}`} type="text" name="gymName" onChange={handleChange} value={values.gymName || ''} required />
                  {errors.gymName && (
                    <p className="help is-danger">{errors.gymName}</p>
                  )}
            </div>
            {/* <input
              type="text"
              value={gymName}
              name="gymName"
              onChange={(e) => setGymName(e.currentTarget.value)}
              ref={register}
              required
            /> */}
          </div>
          <div className="container-2">
            <label>Ulica</label>
            <div className="control">
                  <input autoComplete="off" className={`input ${errors.gymStreet && 'is-danger'}`} type="text" name="gymStreet" onChange={handleChange} value={values.gymStreet || ''} required />
                  {errors.gymStreet && (
                    <p className="help is-danger">{errors.gymStreet}</p>
                  )}
            </div>
            {/* <input
              type="text"
              value={gymStreet}
              name="gymStreet"
              onChange={(e) => setGymStreet(e.currentTarget.value)}
              ref={register}
              required
            /> */}
          </div>
          {/* <div className="container-2">
            <label>Miasto</label>
            <InputMask
              type="text"
              value={gymCity}
              name="gymCity"
              onChange={(e) => setGymCity(e.currentTarget.value)}
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Kod pocztowy</label>
            <InputMask
              type="text"
              value={gymZip}
              name="gymZip"
              pattern="^\d{2}-\d{3}$"
              mask="99-999"
              onChange={(e) => setGymZip(e.currentTarget.value)}
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Strona WWW</label>
            <InputMask
              type="text"
              value={gymURL}
              name="pageWWW"
              onChange={(e) => setGymUrl(e.currentTarget.value)}
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>E-mail</label>
            <InputMask
              type="text"
              value={gymEmail}
              name="pageWWW"
              onChange={(e) => setGymEmail(e.currentTarget.value)}
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Telefon</label>
            <InputMask
              type="text"
              value={gymPhone}
              name="pageWWW"
              onChange={(e) => setGymPhone(e.currentTarget.value)}
              ref={register}
              required
            />
          </div>

          <div className="container-2">
            <label>Wysokość</label>
            <input
              type="text"
              value={gymHeight}
              name="gymHeight"
              placeholder="w metrach"
              pattern="[0-9]+([\.,][0-9]+)?"
              onChange={(e) => setGymHeight(e.currentTarget.value)}
              min="1"
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Szerokość</label>
            <input
              type="text"
              value={gymWidth}
              name="gymWidth"
              placeholder="w metrach"
              pattern="[0-9]+([\.,][0-9]+)?"
              onChange={(e) => setGymWidth(e.currentTarget.value)}
              min="1"
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Długość</label>
            <input
              type="text"
              value={gymLength}
              name="gymLength"
              placeholder="w metrach"
              pattern="[0-9]+([\.,][0-9]+)?"
              onChange={(e) => setGymLength(e.currentTarget.value)}
              min="1"
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Ilość miejsc na widowni</label>
            <input
              type="number"
              value={audience}
              name="audience"
              onChange={(e) => setAudience(e.currentTarget.value)}
              min="0"
              ref={register}
            />
          </div>
          <div className="container-2">
            <label>Ilość szatń</label>
            <input
              type="number"
              value={changingRooms}
              name="changingRooms"
              onChange={(e) => setChangingRooms(e.currentTarget.value)}
              min="0"
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Cena</label>
            <input
              type="text"
              value={gymPrice}
              name="gymPrice"
              pattern="[0-9]+([\.,][0-9]{0,2})?"
              onChange={(e) => setGymPrice(e.currentTarget.value)}
              min="1"
              ref={register}
              required
            />
          </div>
          <div className="container-2">
            <label>Opis</label>
            <input
              type="text"
              value={gymDescription}
              name="gymDescription"
              onChange={(e) => setGymDescription(e.currentTarget.value)}
              min="1"
              ref={register}
              required
            />
          </div> */}
        </div>

        <div id="gallery">
          <input
            type="file"
            multiple="multiple"
            id="img_url"
            onChange={handleImageAsFile}
          ></input>
        </div>

        {/*<div id="gallery">
          <DragAndDrop id="img_url" onChange={handleImageAsFile} />
        </div>*/}
      </div>

      {/* <div className="container-3">
        <label>
          {" "}
          <b>Typ:</b>
        </label>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            boisko do piłki nożnej
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            boisko do siatkówki
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            boisko do koszykówki
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="option3"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox4">
            boisko do tenisa ziemnego
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox4"
            value="option4"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox5">
            sala do aerobiku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox5"
            value="option5"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox6">
            siłownia
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox6"
            value="option6"
          />
        </div>
      </div>

      <br />
      <div className="container-3">
        <label>
          {" "}
          <b>Udogodnienia:</b>
        </label>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            toaleta wewnątrz budynku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            TOJ TOJ na zewnątrz budynku
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            prysznice
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox3"
            value="option3"
          />
        </div>

        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox4">
            parking
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox4"
            value="option4"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox5">
            maszyny z jedzeniem
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox5"
            value="option5"
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox6">
            bufet/stołówka
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox6"
            value="option6"
          />
        </div>
      </div> */}

      <div></div>
      <div></div>
      <button className="form_button"> {/*onClick={openModal}>*/}
        DODAJ
      </button>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="dasds"
      >
        Sala została dodana<button onClick={closeModal}>x</button>
      </Modal> */}
    </form>
  );
}
