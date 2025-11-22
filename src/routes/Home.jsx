import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div style={{padding:20}}>
      <h1>Academic Writing & Transcription (MVP)</h1>
      <p>Simple MVP: clients upload assignments or audio. Admin completes tasks and uploads final files.</p>
      <div style={{marginTop:20}}>
        <Link to="/place-order">Place Order</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
