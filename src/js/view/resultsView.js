import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe found. Please try another keyword!";
  _message = "";

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();