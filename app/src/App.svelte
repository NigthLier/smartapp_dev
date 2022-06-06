<script lang="ts">
  import {onMount} from 'svelte';
  import {createSmartappDebugger, createAssistant} from '@sberdevices/assistant-client';
  import {setTheme} from './themes';
  import {logger} from "./utils";

  let assistant;
  let state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date()};
  let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwMTI4ZGNhOWNiYWRlOTIwMWMxOTllZTFjYTM2ZTNiNjE5ZDMyMzgyNzk4NmQ4MDFmZjVhYTFiNmJhMDMwOTUzYTUiLCJhdWQiOiJWUFMiLCJleHAiOjE2NTQ1NDIwMTgsImlhdCI6MTY1NDQ1NTYwOCwiaXNzIjoiS0VZTUFTVEVSIiwidHlwZSI6IkJlYXJlciIsImp0aSI6Ijg5NWEyZTkwLTVjMGEtNGZlNS04NmRiLWRlNzQ1OWU1MjUwNCIsInNpZCI6ImJmMzI4NGNmLTAwZDQtNDJhYS1iNDVmLTQyM2QyNGY1ZmUyNCJ9.WNjjyaBQmK7V_rAT2tQveuXdInjA-ydCg1BWMErY8pzimjmimTVUtK4ZMr601r2v7amTsYybhvxNxrpP4pRUyElwb-TIGwwf89Ri8fqA7gADmyJt6oiDGNKh-ed3bLP0g0T3cYx4DQgW5gHDB1JMU5aW6DE_YQrt18LdzTTZphN5YWWTUivAeQb7QSLOWwBLYOsaCVNtgjgAruAulXgVZ1-8buiwHCVjYgnpdAgiruBchFBJEUVAcRdQ4EzXpSxyC0A3yoc6YeEcPZT90Rd1Sj_Z2a-z15qjjqji2-d1tn1SaJVgfGZwTfzekkUmnIE42h1lN2sDPoCFByOjVOPKBF_S1yJreaTrRjXP-_A1KXxsmXVmGFD4CAQZK1ef-f58gteB2LnelKi8j2IpkhiAjSf4H-xezvaS4V2ofk74iQ6WmoSu8O4vlX4KkuyxOjHdBaHXlx95o6vG0YWOcJIYiBKb6lcH5AanaqZFuuDE5P3NUkZBKJoepMlb3dMV5jv3U_fiy94QdpeLNcYhgJykVojhJJkFfkLmmgXQXUxDbS-hGWGyln7i1iiGgy1LlBRVAoORWw84EHCfkiqlY1823BuxX7ybIG7t_f5kFTxoWekt8Os1GsfpC81tLNgqVeUxm55waqGalT5g_KF1LEHWkgZJjmY-TGbnxQTTkKi2lI4';
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
  
  //let timerId = setInterval(() => handledel(), 5000);
  //setTimeout(() => { clearInterval(timerId); handledel();}, 100000);
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
