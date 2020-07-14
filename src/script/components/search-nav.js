class SearchNav extends HTMLElement {
  connectedCallback() {
    this.setAttribute(
      'class',
      'flex sm:justify-around w-full sm:focus:shadow-outline shadow-outline rounded-lg sm:border-2 border-blue-200'
    );
    this.innerHTML = /*html*/ `<input
      id="search-nav"
      autofocus
      placeholder="Search movies..."
      class="hidden sm:block p-2 text-center rounded-l outline-none focus:shadow-outline text-gray-700 text-sm"
      type="text"
    />
    <button
      id="button-nav"
      class="w-full sm:w-1/4 text-white text-xl py-1 px-4 text-sm border-2 sm:border-none border-blue-200 focus:border-blue-300 hover:opacity-75 focus:outline-none rounded sm:rounded-l-none sm:rounded-r bg-blue-400"
    >
      <i class="fa fa-search"></i>
    </button>`;
  }
}

customElements.define('search-nav', SearchNav);
