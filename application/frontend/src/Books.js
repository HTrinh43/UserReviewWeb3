import React from "react";
import "./App.css";
import { Data } from "./data";

export const Books = () => {

  const Toggle = async (key, value) => {
    // Solution for task 11 here
    var el = document.getElementById(key)
    var element = document.getElementById(value)
    if (element.style.display === "none") {
        const data = await fetch(`reviews?key=${value}`)
        const template = await data.text()

        el.innerHTML += template
        element.style.display = "block";
    } else {
        element.style.display = "none";
        el.innerHTML = ""
    }
  }

  const Submit = async (key, bookKey) => {
    // Solution for task 12 here
    const id1 = bookKey + key;
    let element = document.getElementById(id1)
    const value = element.value
    const data = await fetch(`add?key=${bookKey}&value=${value}`)
    if (await data.text()) {
        var el = document.getElementById(key)
        el.innerHTML = ""
        element.value = ""
        const info = await fetch(`reviews?key=${bookKey}`)
        const template = await info.text()

        el.innerHTML += template
    } else {
        <h1>There was an error while saving your review</h1>
    }
    }

  return (
    <>
    {
        Data.map((bks, key) => {
            const id1 = bks.title + key;
            return (
                <div className={"container mt-5"}>
                    <div className={"card mb-3"} style={{maxWidth: 1500}}>
                    <div className={"row g-0"}>
                        <div className={"col-lg-4"}>
                            <img src={ bks.img } className={"m-2 text-center rounded-start img-responsive"} alt="Cover" />
                        </div>
                        <div className={"col-lg-8"}>
                        <div className={"card-body"}>
                            <h3 className={"card-title"}><td>{ bks.title }</td></h3>
                            <p className={"card-subtitle text-muted"}>{ bks.author }</p><br></br>
                            <p className={"card-text fs-5"}>{ bks.overview }</p>
                            </div>
                            <div id={bks.title} value={bks.title} style={{display: 'none'}}>
                            <div className={"ml-4"}>
                                <div><h4>Book Reviews</h4></div>
                                <div className={"mt-2 ml-5"} id={key}></div>
                                <div><br></br><label>Add a review: <input id={id1} type="text" name="review" /></label></div>            
                            </div>
                            <button className={"mb-3 ml-5 card-text btn btn-md btn-primary"} onClick={() => Submit(key, bks.title)}>Submit</button>
                            </div>
                            <br></br>
                            <button className={"mb-2 ml-3 card-text btn btn-lg btn-primary"} value={bks.title} onClick={() => Toggle(key, bks.title)}>Show/Hide Reviews</button>
                        </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    </>
  );
};