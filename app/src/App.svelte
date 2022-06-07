<script lang="ts">
  import {onMount} from 'svelte';
  import {createSmartappDebugger, createAssistant} from '@sberdevices/assistant-client';
  import {setTheme} from './themes';
  import {logger} from "./utils";

  let assistant;
  let state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date()};
  let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwMTI4ZGNhOWNiYWRlOTIwMWMxOTllZTFjYTM2ZTNiNjE5ZDMyMzgyNzk4NmQ4MDFmZjVhYTFiNmJhMDMwOTUzYTUiLCJhdWQiOiJWUFMiLCJleHAiOjE2NTQ2MzE2NTIsImlhdCI6MTY1NDU0NTI0MiwiaXNzIjoiS0VZTUFTVEVSIiwidHlwZSI6IkJlYXJlciIsImp0aSI6ImFiZjU5ZTllLTgyOWMtNGJkMS1hNWFjLWQ1MzU4MjA2YzNiNiIsInNpZCI6Ijk3Y2NmNTdiLThkMmMtNDAyZS05MWQ1LTQzY2M4MTJkMzc0NiJ9.iRG1hiAwTeEogFRK5AVYJCbVNnkDGDWo61STp7j-UYmwVtBbrjpdMKp2RXfS3Kadqjtr0kYeIRLd18mnrTt609DYzLwyEURcxpDRxu5DIClsD5NJISbz5UWn_W1lumkfwuC6WMr9Sd7NleGZ1UdredriCZnr6c-P7fkkpxs7UQjhpqggS0vll0q8um0xO6eDhOBNaG5rMzcPXNXbrkQSMQTXH-bSlkXta8J9pbMpw4gZTdeIlM0vIsc0WYmGZvNlMjIz5JwwROJnxF58OwRy_hSLgIkbmRCaIL3LXG4BxQwPQTMqUisCPRhFbirre4ZU_iu9GDBr49HW-o-skaEAJOxaGX8DDK7ECG2Tqexf2Sgip5ctMhSX1LmET7FgWer9LZN16hHWr88bQvQjr8MIISkRppwvQCZabawnj09cARvQpAvhOj3K5G85RzrYuQSgOf8SMbSLl-DE0NqO7JPSkUUIpNmZOrIiHpFWppNnAaPDeuHyFydUANYA0sPUZCXesLkmcJSjo4TkfTEJet9K4AkJyoSJ1UQ--BPA_VjGNqBseXiRZsXKyzeQsq5NZu0Ad5aVQ7sOzjAPiRT5rkNeEHPS8U9QqLVrpdBbrWOqs1phFnuScVTzDv5583NXQrXKQXTaNpBwzPEz2CPPG7oX4EyYjgIDf1RgiJL4A1NIhSQ';
  let initPhrase = 'запусти Счетчик воды';

  let character = 'sber';
  $: setTheme(character);
  onMount(() => {
    function getState() {
      return {}
    }

    const init = (): any => {
      if (process.env.NODE_ENV === 'production') {
        return createAssistant({getState});
      }
      return createSmartappDebugger({
        token,
        initPhrase,
        getState,
      });
    };
    assistant = init();

    assistant.on('start', () => {
      logger.log('SmartApp started');
    });

    assistant.on('data', event => {
      if (!event.type) {
        return;
      }
      if (event.type === 'character') {
        character = event.character.id;
        setTheme(character);
      }
      if (event.type === 'smart_app_data') {
        state = event.smart_app_data;
      }
      logger.log('data event:', event);
    });
  });

  function handleAddWater() {
    assistant.sendData({
      action: {
        action_id: 'AddWater',
        data: {}
      }
    })
  }
  function handleAddMax() {
    assistant.sendData({
      action: {
        action_id: 'AddMax',
        data: {}
      }
    })
  }
  function handleSubMax() {
    assistant.sendData({
      action: {
        action_id: 'SubMax',
        data: {}
      }
    })
  }
  
</script>

<body>
  <main class="don">
    <cent on:click={handleAddWater} class = "cup"> {state.waterCount} / {state.waterMax} <cent class="wave" style="top: calc((1 - {state.waterCount} / {state.waterMax}) * 100%);"></cent> </cent>
  </main>
</body>

<style>
  :global(html) {
    background: var(--plasma-colors-gradient);
  }

  body {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  main {
    display: flex;
    width: calc(100% - 2em);
    padding: 1em;
    margin: 0 auto;
  }

  .don {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }

  button {
    display: flexbox;
    background: var(--plasma-colors-buttonAccent);
    border: none;
    color: white;
    cursor: pointer;
    max-width: fit-content;
    max-height: fit-content;
    border-radius: 50%;
    padding: 20px;
  }

  cent {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--plasma-colors-accent);
    font-weight: 100;
    font-size: calc(5vmin);
  }

  .shadow {
    box-shadow: 0 3px 20px rgba(0,0,0,.25), inset 0 2px 0 rgba(255,255,255,.6), 0 2px 0 rgba(0,0,0,.1), inset 0 0 20px rgba(0,0,0,.1);
  }
  
  .shadow:hover {
  box-shadow: inset 0 0 20px rgba(0,0,0,.2), 0 2px 0 rgba(255,255,255,.4), inset 0 2px 0 rgba(0,0,0,.1);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  
  .cup{
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    cursor: pointer;
    width: calc(40vmin);
    height: calc(40vmin);
    border: 6px solid var(--plasma-colors-buttonAccent);
    background: var(--plasma-colors-buttonSecondary);
    border-radius: 50%;
    overflow: hidden;
    transform: scale(2);
    box-shadow: inset 0 0 calc(5vmin) rgba(0,0,0,.5);
    animation: hov 2.5s linear infinite;
  }

  .cup:hover{
    animation: none;
  }

  .cup:active{
    transition-duration: .2s;
    box-shadow: inset 0 0 calc(5vmin) var(--plasma-colors-buttonFocused);
  }
  
  .wave{
    width: calc(80vmin);
    height: calc(80vmin);
    position: absolute;
    background: var(--plasma-colors-gradientDevice);
    border-radius:  33%;
    transition: all 1.4s linear;
    animation: waves 5s linear infinite;
  }

  @keyframes hov{
    0%{}
    50%{ transform: scale(1.95); }
    100%{}
  }

  @keyframes waves{
    0%{
      transform: rotate(0);
      border-radius: 30%;
    }
    45%{
      border-radius: 39%;
    }
    100%{
      transform: rotate(360deg);
      border-radius: 30%;
    }
  }
</style>
