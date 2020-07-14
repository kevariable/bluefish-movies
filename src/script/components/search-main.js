class SearchMain extends HTMLElement {
  connectedCallback() {
    this.setAttribute(
      'class',
      'hidden sm:hidden flex flex-col rounded-lg sm:flex-row sm:w-3/5 lg:w-2/5 w-4/5 justify-around items-stretch mx-auto mb-10 p-2 shadow-lg'
    );
    this.innerHTML = /*html*/ `<input
      id="search-main"
      placeholder="Search movies..."
      class="w-full sm:w-3/4 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none p-2 text-center sm:text-left outline-none focus:shadow-outline hover:border-blue-400 text-gray-700 text-lg"
      type="text"
    />
    <button
      id="button-main"
      class="w-full sm:w-1/4 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg text-white py-1 text-xl bg-blue-400 focus:shadow-outline focus:outline-none"
    >
      Search
    </button>`
  }
}

customElements.define('search-main', SearchMain);