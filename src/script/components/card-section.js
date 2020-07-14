class CardSection extends HTMLElement {
  connectedCallback() {
    this.setAttribute(
      'class',
      'grid grid-cols-1 mx-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    );
  }

  set section(Search) {
      this._Search = Search;
      this.render();
  }

  render() {
    this._Search.forEach((item) => {
      const cardItem = document.createElement('card-item');
      cardItem.items = item;
      this.appendChild(cardItem);
    });
  }
}

customElements.define('card-section', CardSection);
