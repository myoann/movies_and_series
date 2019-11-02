import React, { Component } from "react";

import "./index.scss";

class ListTest extends Component {
  state = { isFullScreen: false };
  //modal action stuffs
  /*openFSM = event => {
    const this = event.currentTarget;
    position = this.getBoundingClientRect();
    size = {
      width: window.getComputedStyle(this).width,
      height: window.getComputedStyle(this).height,
    };

    $fsmActual.style.position = "absolute";
    $fsmActual.style.top = position.top + "px";
    $fsmActual.style.left = position.left + "px";
    $fsmActual.style.height = size.height;
    $fsmActual.style.width = size.width;
    $fsmActual.style.margin = $this.style.margin;

    setTimeout(function() {
      $fsmActual.innerHTML = $this.innerHTML;
      var classes = $this.classList.value.split(" ");
      for (var i = 0; i < classes.length; i++) {
        $fsmActual.classList.add(classes[i]);
      }
      $fsmActual.classList.add("growing");
      $fsmActual.style.height = "100vh";
      $fsmActual.style.width = "100vw";
      $fsmActual.style.top = "0";
      $fsmActual.style.left = "0";
      $fsmActual.style.margin = "0";
    }, 1);

    setTimeout(function() {
      $fsmActual.classList.remove("growing");
      $fsmActual.classList.add("full-screen");
    }, 1000);
  };

  closeFSM = event => {
    var $this = event.currentTarget;

    $this.style.height = size.height;
    $this.style.width = size.width;
    $this.style.top = position.top + "px";
    $this.style.left = position.left + "px";
    $this.style.margin = "0";
    $this.classList.remove("full-screen");
    $this.classList.add("shrinking");

    setTimeout(function() {
      while ($this.firstChild) $this.removeChild($this.firstChild);
      var classList = $this.classList;
      while (classList.length > 0) {
        classList.remove(classList.item(0));
      }
      $this.style = "";
    }, 1000);
  };*/

  render() {
    // JS available on https://github.com/colinlohner/FSM-JS

    /* const fsmActual = document.createElement("div");
    fsmActual.setAttribute("id", "fsm_actual");
    document.body.appendChild(fsmActual);
    var $fsmActual = document.querySelector("#fsm_actual");
    $fsmActual.style.position = "absolute";

    var position = {};
    var size = {};
*/
    const { isFullScreen } = this.state;
    return (
      <div>
        <h1>Fullscreen Expanding Div</h1>

        <div id="fsm_container" class="fsm-container">
          <div
            class={`fsm apple ${isFullScreen ? "full-screen" : ""}`}
            onClick={() => {
              this.setState({ isFullScreen: !isFullScreen });
            }}
          >
            <i class="fa fa-apple">A</i>
            <h1 class="modal-content">Apple</h1>
          </div>
          <div class="fsm pied">
            <i class="fa fa-pied-piper"></i>
            <h1 class="modal-content">Pied Piper</h1>
          </div>
          <div class="fsm codepen">
            <i class="fa fa-codepen"></i>
            <h1 class="modal-content">CodePen</h1>
          </div>
          <div class="fsm google">
            <i class="fa fa-google"></i>
            <h1 class="modal-content">Google</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTest;
