class Pokemon {
  constructor() {
    //Urls + UseUrls
    this.urls = [];
    this.count = 0;

    //Obtener ID's
    this.section = document.getElementById("section");
    this.btnNextPage = document.getElementById("btnNextPage");
    this.filtroPokemon = document.getElementById("filtro");

    // Eventos showMore / filtro
    this.showMoreBound = this.showMore.bind(this);
    this.btnNextPage.addEventListener("click", this.showMoreBound);
    this.filtroPokemon.addEventListener("keypress", this.filtro.bind(this));
    this.loadUrls();
  }

  //Cargar Urls
  async loadUrls() {
    let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12";

    for (let i = 1; i <= 109; i++) {
      const pokemonList = await fetch(url)
        .then((res) => res.json())
        .then((poke) => poke);

      this.urls.push(url);
      url = pokemonList.next;
    }
    this.showMore(this.urls);
  }

  // Obtener pack pokemons y sus detalles
  showMore() {
    this.getList(this.urls[this.count]);
    this.count++;
  }

  // Obtener informacion pokemons
  async getList(urls) {
    const pokemonList = await fetch(urls)
      .then((res) => res.json())
      .then((poke) => poke);
    const url = pokemonList.results.map((e) => e.url);

    url.forEach(async (e) => {
      const pokemon = await fetch(e)
        .then((res) => res.json())
        .then((poke) => poke);

      this.ArticleAndDialog(pokemon);
    });
  }

  // Establecer color a los tipos
  ArticleAndDialog(pokemon) {
    // Dar fondo a los types
    const colorType = () => {
      const tipoPrimario = pokemon.types[0].type.name;
      const tipoSecundario =
        pokemon.types.length > 1 ? pokemon.types[1].type.name : "";

      const tipoColor = {
        fire: "#FDA14CCC",
        water: "#5099E2CC",
        grass: "#5DBD57CC",
        bug: "#97BE2DCC",
        flying: "#98AEDECC",
        ice: "#76D5C3CC",
        dragon: "#096DCFCC",
        dark: "#5E5C69CC",
        fairy: "#F390E3CC",
        poison: "#B062CACC",
        ghost: "#596BB4CC",
        rock: "#C6BA8ACC",
        steel: "#528C9ECC",
        ground: "#D97B4FCC",
        normal: "#9698A4CC",
        electric: "#F6D54ACC",
        psychic: "#F77978CC",
        fighting: "#D1425ECC",
      };

      return {
        first: tipoColor[tipoPrimario],
        second: tipoColor[tipoSecundario],
      };
    };

    // Dar fondo a las cartas
    const bgType = () => {
      // Dar fondo segun el tipo
      const tipoColorPrimario = pokemon.types[0].type.name;
      const tipobg = {
        fire: "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/profile/210005_1.png?strip=all&quality=100",
        water:
          "https://gd-hbimg.huaban.com/5654b1f6a2d12b0d6b7259aa1288dfce83e76c7275bd7-2Mbi7w",
        grass: "https://pbs.twimg.com/media/FW9T4SJaAAAGz1v.png",
        bug: "https://paimonhelps.com/images/characters/namecards/collei-good-virtue.webp",
        flying:
          "https://genshindb.org/wp-content/uploads/2021/03/Eula-Namecard-Ice-Sealed.jpg",
        ice: "https://i.redd.it/467q4opofvz71.png",
        dragon:
          "https://genshindb.org/wp-content/uploads/2021/10/Arataki-Itto-Namecard-Oni-Face.jpg",
        dark: "https://genshindb.org/wp-content/uploads/2021/07/Kujou-Sara-Namecard-Tengu.png",
        fairy:
          "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/profile/210112_1.png?strip=all&quality=10",
        poison:
          "https://genshindb.org/wp-content/uploads/2022/03/Achievement-Namecard-Inazuma-Kujou-Insignia.jpg",
        ghost:
          "https://genshindb.org/wp-content/uploads/2021/01/Xiao-Namecard-Mask.png",
        rock: "https://64.media.tumblr.com/d2ce16b24821cf536e361dbcb778d111/ea32acf393e6a78c-a9/s1280x1920/76282124ea630589bb8399c21a50157c930e6c3b.png",
        steel:
          "https://64.media.tumblr.com/d0c03f61007f08df3e2ecbc568b9223f/bfbd868591ec4975-75/s1280x1920/ca3201ecbb8360e10dcdc126654a27df5477caea.png",
        ground:
          "https://genshindb.org/wp-content/uploads/2021/01/Zhongli-Namecard-Planet-Befall.png",
        normal:
          "https://genshindb.org/wp-content/uploads/2021/01/Tartaglia-Namecard-Childe-Foul-Legacy.png",
        electric:
          "https://genshindb.org/wp-content/uploads/2021/01/Ningguang-Namecard-Phoenix.png",
        psychic:
          "https://genshindb.org/wp-content/uploads/2022/03/Achievement-Namecard-Traversal.png",
        fighting:
          "https://genshindb.org/wp-content/uploads/2022/03/Achievement-Namecard-Challenger-I.png",
      };

      return tipobg[tipoColorPrimario];
    };

    // Creacion del card para el home
    const article = document.createElement("article");
    article.classList.add("artPoke");
    article.innerHTML = `
          <img src="${
            pokemon.sprites.other["official-artwork"].front_default
          }" alt="imgPokemon">
          <h2>${`${pokemon.name} #${pokemon.id}`}</h2>
      `;

    // Mostrar dialog
    article.addEventListener("click", () => {
      dialog.showModal();
      dialog.style.scale = "1";
      document.body.style.filter = "blur(2px)";
    });

    // Creacion del dialog e infoPokemon
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <article class="cardPoke" style="background-image: url('${bgType()}')">
          <div class="imgAndTypes">
            <img src="
            ${pokemon.sprites.other["official-artwork"].front_default}">
            </img>
            <div class="Types">
              ${pokemon.types
                .map(
                  (e) =>
                    `<span style="background: ${
                      e.slot == 2 ? colorType().second : colorType().first
                    }">${e.type.name}</span>`
                )
                .join("")}
            </div>
          </div>
          <div class="infAndStats">
            <div class="inf">
              <h2>${pokemon.name}</h2>
              <span>#${pokemon.id}</span>
            </div>
            <ul class="stats">
              ${pokemon.stats
                .map((e) => {
                  return `<li><span>${e.stat.name}:</span> ${e.base_stat}</li>`;
                })
                .join("")}
            </ul>
            <div class="btnsChange">
              <button onclick="poke.previous(this)"> < </button>
              <button onclick="poke.next(this)"> > </button>
            </div>
          </div>
        </article>
      `;

    // Cierre del dialog
    dialog.addEventListener("click", () => {
      dialog.style.scale = "0";

      setTimeout(() => {
        document.body.style.filter = "none";
        dialog.close();
      }, 210);
    });

    //Agregar elementos dialog
    this.section.appendChild(dialog);
    this.section.appendChild(article);
  }

  // Boton hacia adelante
  next(e) {
    const dialog = e.parentElement.parentElement.parentElement.parentElement;
    try {
      dialog.nextSibling.nextSibling.showModal();
      dialog.nextSibling.nextSibling.style.scale = "1";
    } catch {
      this.showMore();
      setTimeout(() => {
        dialog.nextSibling.nextSibling.showModal();
        dialog.nextSibling.nextSibling.style.scale = "1";
      }, 210);
    }
  }

  // Boton hacia atras
  previous(e) {
    const dialog = e.parentElement.parentElement.parentElement.parentElement;
    dialog.previousSibling.previousSibling.showModal();
    dialog.previousSibling.previousSibling.style.scale = "1";
  }

  // Buscador de pokemons
  async filtro(event) {
    if (event.keyCode === 13) {
      try {
        const pokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.filtroPokemon.value.toLowerCase()}`
        )
          .then((res) => res.json())
          .then((poke) => poke);

        this.restart();
        this.section.classList.add("sectionList");
        this.ArticleAndDialog(pokemon);

        // Desabilitar botones(next y previous) al buscar
        const btn =
          this.section.firstChild.firstElementChild.lastElementChild
            .lastElementChild.children;
        for (let i = 0; i < btn.length; i++) {
          btn[i].disabled = "true";
        }

        // Mostrar excepcion (pokemon no encontrado)
      } catch {
        this.restart();
        this.section.classList.remove("sectionList");
        this.section.innerHTML = `<div class="error404">POKEMON NO ENCONTRADO</div>`;
      }
    }
  }

  // Boton de reiniciar a la hora de buscar pokemons
  restart() {
    this.btnNextPage.removeEventListener("click", this.showMoreBound);
    this.btnNextPage.addEventListener("click", () => {
      location.href = location.href;
    });
    this.section.innerHTML = "";
    this.btnNextPage.textContent = "Reiniciar";
  }
}

// Llamada a la clase para generar info de pokemons
const poke = new Pokemon();