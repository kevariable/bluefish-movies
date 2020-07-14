class CardItem extends HTMLElement {
  connectedCallback() {
    this.setAttribute('class','mt-5 shadow-lg');
  }

  set items(item) {
    this._item = item;
    this.render();
  }

  render() {
    const { Title, Year, Poster, imdbID } = this._item;
    this.innerHTML = /*html*/ `<img style="height: 32rem;" class="w-full object-cover" src="${Poster}" alt="" />
    <div class="p-6">
      <h4 class="text-2xl">${Title}</h4>
      <h5 class="mt-2 text-lg text-gray-600">${Year}</h5>
      <div class="mt-4 text-right">
        <button
          data-imdbid = "${imdbID}"
          class="buttonCard bg-blue-500 text-white py-1 px-3 rounded-lg hover:opacity-75 focus:shadow-outline focus:outline-none"
        >
          Read More
        </button>
      </div>
    </div>`;
  }
}

customElements.define('card-item', CardItem);
