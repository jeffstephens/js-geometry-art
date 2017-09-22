/*
 * Make the webpage interactive
 */

const renderStateKey = 'geomRenderState';

function render() {  
  // parameters for the whole deal
  const renderState = {
    shapeRadius: $("#shapeRadius").val(),
    numLayers: $("#numLayers").val(),
    numShapes: $("#numShapes").val(),
    numSides: $("#numSides").val(),
    circles: $("#circles").is(":checked")
  };

  if (renderState.circles) {
    $("#numSides, label[for='numSides']").fadeOut();
  } else {
    $("#numSides, label[for='numSides']").fadeIn();
  }

  doRender(
    renderState.numLayers,
    renderState.shapeRadius,
    renderState.numShapes,
    renderState.numSides,
    renderState.circles
  );

  saveState(renderState);
}

function saveState(renderState) {
  localStorage.setItem(renderStateKey, JSON.stringify(renderState));
}

function restoreState() {
  const savedState = JSON.parse(localStorage.getItem(renderStateKey));

  if (savedState !== null) {
    for (const savedKey in savedState) {
      const el = $(`#${savedKey}`);
      const inputType = el[0].type;

      if (inputType === 'text' || inputType === 'number' || inputType === 'range') {
        el.val(savedState[savedKey]);
      } else if (inputType === 'checkbox') {
        el.prop('checked', savedState[savedKey]);
      }
    }
  }
}

$("input").change(() => {
  render();
});

$("input").keyup(() => {
  render();
});

$(document).ready(() => {
  restoreState();
  render();
});
