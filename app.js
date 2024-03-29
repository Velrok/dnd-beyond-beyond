import { useState, useEffect } from "https://esm.sh/preact/hooks";

const Header = (html) => () =>
  html`<header class="Header">
    <h1>🐉 Beyond D&D-Beyond</h1>
  </header>`;

const Wallet =
  (html) =>
    ({ money }) =>
      html`<div class="Wallet">
      <div class="denomination">
        <span class="denomination_icon"><div class="dot copper" /></span>
        <span class="denomination_value">${money.copper}</span>
      </div>

      <div class="denomination">
        <span class="denomination_icon"><div class="dot silver" /></span>
        <span class="denomination_value">${money.silver}</span>
      </div>

      <div class="denomination">
        <span class="denomination_icon"><div class="dot electrum" /></span>
        <span class="denomination_value">${money.electrum}</span>
      </div>

      <div class="denomination">
        <span class="denomination_icon"><div class="dot gold" /></span>
        <span class="denomination_value">${money.gold}</span>
      </div>

      <div class="denomination">
        <span class="denomination_icon"><div class="dot platinum" /></span>
        <span class="denomination_value">${money.platinum}</span>
      </div>
    </div>`;

const BaseStat =
  (html) =>
    ({ stat, score }) =>
      html`<div>
      <span class="stat">${stat}</span>
      <span class="score">${score}</span>
    </div> `;

const BaseStats =
  (html) =>
    ({ attributes }) => {
      console.log(attributes);
      return html`<div class="base-attributes">
      ${Object.entries(attributes).map(
        ([stat, score]) =>
          html`<${BaseStat(html)} stat=${stat} score=${score} />`
      )}
    </div>`;
    };

// Example char at:
// https://character-service.dndbeyond.com/character/v5/character/112248054?includeCustomItems=true

function useCharacter(id) {
  const [dndBeyondData, setDndBeyondData] = useState(undefined);
  useEffect(() => {
    const charUrl = `https://velrokxyyejrpt-container-modest-driscoll.functions.fnc.fr-par.scw.cloud/https://character-service.dndbeyond.com/character/v5/character/${id}?includeCustomItems=true`;
    console.log(charUrl);
    fetch(charUrl)
      .then((res) => res.json())
      .then(setDndBeyondData);
  }, [id]);
  return { dndBeyondData };
}

const CharPresentation =
  (html) =>
    ({ avatarUrl, name }) =>
      html`<div class="char-presentation">
      <img class="avatar" src="${avatarUrl}" />
      <h2>${name}</h2>
    </div>`;

const CharacterSheet =
  (html) =>
    ({ data }) => {
      const { cp, sp, ep, gp, pp } = data.currencies;
      const money = {
        copper: cp,
        silver: sp,
        electrum: ep,
        gold: gp,
        platinum: pp,
      };

      // TODO: look at data.modifiers.race (filter by type to get racial bonuses)
      const attributes = {
        str: data.stats[0].value,
        dex: data.stats[1].value,
        con: data.stats[2].value,
        int: data.stats[3].value,
        wis: data.stats[4].value,
        cha: data.stats[5].value,
      };

      console.log(attributes);

      return html`<div>
      <${CharPresentation(html)}
        name=${data.name}
        avatarUrl=${data.decorations.avatarUrl}
      />
      <${Wallet(html)} money=${money} />
      <${BaseStats(html)} attributes=${attributes} />
    </div>`;
    };

const Loading = (html) => () =>
  html`
    <div class="Loading">Loading...(first load might take a few seconds)</div>
  `;

export const App = (html) => () => {
  const rickyId = 112248054
  const evieId = 72337845
  const yoloId = 98296264
  const jennoraId = 110042771
  // const { dndBeyondData } = useCharacter(rickyId);
  const { dndBeyondData } = useCharacter(rickyId);
  console.log(dndBeyondData);

  return html`<div class="App">
    <${Header(html)} />
    <${dndBeyondData ? CharacterSheet(html) : Loading(html)}
      data=${dndBeyondData?.data}
    />
  </div>`;
};
