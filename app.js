const Header = (html) => () => html`<header class='Header'>
  <h1>🐉 Beyond D&D-Beyond</h1>
</header>`;

const BaseStat = (html) => ({ stat, score }) => html`<div>
  <span class="stat">${stat}</span>
  <span class="score">${score}</span>
</div > `;


const BaseStats = (html) => ({ attributes }) => {
  console.log(attributes)
  return html`<div class='base-attributes' >
  ${Object
      .entries(attributes)
      .map(([stat, score]) => html`<${BaseStat(html)} stat=${stat} score=${score} />`)
    }
</div>`
};


export const App = (html) => () => html`<div class='App'>
  <${Header(html)} />
  <${BaseStats(html)} attributes=${{
    str: 17,
    dex: 7,
    con: 12,
    int: 13,
    wis: 16,
    cha: 12
  }} />
</div > `;
