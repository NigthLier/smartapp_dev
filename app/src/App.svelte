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

<main>
  <h2> Count: {state.waterCount} / {state.waterMax} </h2>
  <button on:click={handleAddWater}>Sip</button>
  <button on:click={handleAddMax}>+</button>
  <button on:click={handleSubMax}>-</button>
</main>

<style>
  :global(html) {
    background: var(--plasma-colors-gradient);
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  button {
    background: #14c07c;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 20px;
    padding: 20px;
  }


  h1 {
    color: #14c07c;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  h2 {
    color: #14c07c;
    font-weight: 100;
  }

  p {
    color: #f4f4f4;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  .cup{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 180px;
    border: 6px solid #fff;
    border-radius: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    transform: scale(2);
    box-shadow: 0 0 0 6px #fff 0 20px 35px rgba(0, 0, 0, .5) ;
  }
  .wave{
    width: 300px;
    height: 300px;
    position: absolute;
    left: -10%;
    bottom: -140%;
    background: var(--plasma-colors-gradientDevice);
    border-radius:  33%;
    transition: all 1.4s linear;
    animation: waves 2.4s linear infinite;
  }
  @keyframes waves{
    0%{
      transform: rotate(0);
      border-radius: 30%;
      bottom: -170px;
    }
    45%{
      border-radius: 39%;
    }
    100%{
      transform: rotate(360deg);
      border-radius: 30%;
      bottom: -80px;
    }
  }
</style>
