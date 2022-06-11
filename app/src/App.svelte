<script lang="ts">
  import {onMount} from 'svelte';
  import {createSmartappDebugger, createAssistant} from '@sberdevices/assistant-client';
  import {setTheme} from './themes';
  import {logger} from "./utils";

  let assistant;
  let state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date(), vis: "visible", err: 0};
  let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwMTI4ZGNhOWNiYWRlOTIwMWMxOTllZTFjYTM2ZTNiNjE5ZDMyMzgyNzk4NmQ4MDFmZjVhYTFiNmJhMDMwOTUzYTUiLCJhdWQiOiJWUFMiLCJleHAiOjE2NTQ4OTI4ODEsImlhdCI6MTY1NDgwNjQ3MSwiaXNzIjoiS0VZTUFTVEVSIiwidHlwZSI6IkJlYXJlciIsImp0aSI6Ijk0ZmU5OGNhLTFiNWUtNDE4ZC04OTZmLTQxMGFhY2Y1OWE1ZiIsInNpZCI6IjNhYTU0MjlkLTM4YjUtNGM5NS1iZjQ4LThmYThlM2MyZDdkMiJ9.izvezyB_YeK6PGVkrsJm44VIi2b17_T0SMm2SeE8Lf8n1gLQlAlRro2lzGs68zrsxSvpg9bbsjg3HDsbGiqc-ef3s9JmJz__khOJxDA4fDKCwabVqlZjzdIMSAGbEYIpQsHGz2ytYq_rq08gViZ8nPzhYMClFCHoFOnBuE6pit20FSsXRsr1vBFYMhueBUU83PIfBN-cc8Oj4kuUtBThDNm3hpNHCjEpYaEiOK4lYzl9VmHka7yJEODgC1FbfUV2B81dfqOrnHk1KEdipySuaX8xIGzvKjKP1lLrCfS68Iutim6e_tTL1CC4WotQVgQOHTGVXxJn53ifOdWqwRTfICzEaj1X2AFUIfsZMzd2R8fUZZ0wvRqLpt_lImww0DJN0-dzFwAV1UtSyTQM0oDMlGUCty6NWuhvoHG-uWjGJOvlmBkWqmnrSR_1AJIZAqGr2TPh2Jmx2rPB6N1f-za53suu5aDX4GrqJnIegLuyS_lf8_3KhKQetf1ep0V4fd5OsiCTzapsfhgmte2Bnj9Mq2yCddmCzKD5XXaOSy9s-m3ExFotL4tXUHVMKdSmbk9cVHpJ_BgxJDSXFYTXuCMXSgZ4xS6zCPeW73sTFNT6eAvr3YvEJ40gmJG3x54mledcQAzGhN5cxV3mA_w9xpnXrUBR8KOuZXQ9jFd07cPjHgw';
  let initPhrase = 'Активируй Трекер воды';

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
  function handleZero() {
    assistant.sendData({
      action: {
        action_id: 'Zero',
        data: {}
      }
    })
  }
  function handleHelp() {
    assistant.sendData({
      action: {
        action_id: 'Help',
        data: {}
      }
    })
  }
  
</script>

<body>
  <main class="cor">
    <main class="res" style="visibility: {state.vis};">
      <cent class = "h1"><cent on:click={handleAddMax} class = "buttoncup"><span class="up" style="outline: none;">+</span></cent></cent>
      <cent class = "h2"><cent on:click={handleSubMax} class = "buttoncup"><span class="up" style="outline: none;">-</span></cent></cent>
    </main>
    <main class="don">
      <cent on:click={handleAddWater} class = "cup" style="outline: none;"> {state.waterCount} / {state.waterMax} <cent class="wave" style="top: calc((1 - {state.waterCount} / {state.waterMax}) * 100%);"></cent> </cent>
    </main>
    <main class="res" style="visibility: {state.vis};">
      <cent class = "h3"><cent on:click={handleZero} class = "buttoncup" ><span class="up1" style="outline: none;">0</span></cent></cent>
      <cent class = "h4"><cent on:click={handleHelp} class = "buttoncup" ><span class="up1" style="outline: none;">?</span></cent></cent>
    </main>
  </main>
</body>

<style>
  :global(html) {
    outline: none;
    background: var(--plasma-colors-gradient);
  }

  body {
    outline: none;
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  main {
    outline: none;
    display: flex;
    padding: 1em;
    margin: 0 auto;
  }

  .don {
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .res {
    outline: none;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    width: 10%;
    justify-content: space-around;
  }

  .cor {
    outline: none;
    display: flex;
    flex-flow: row;
    justify-content:space-around;
    width: calc(100% - 2em);
    flex: 1 1 auto;
  }

  button {
    outline: none;
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
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--plasma-colors-accent);
    font-weight: 100;
    font-size: calc(5vmin);
  }

  .shadow {
    outline: none;
    box-shadow: 0 3px 20px rgba(0,0,0,.25), inset 0 2px 0 rgba(255,255,255,.6), 0 2px 0 rgba(0,0,0,.1), inset 0 0 20px rgba(0,0,0,.1);
  }
  
  .shadow:hover {
    outline: none;
    box-shadow: inset 0 0 20px rgba(0,0,0,.2), 0 2px 0 rgba(255,255,255,.4), inset 0 2px 0 rgba(0,0,0,.1);
  }

  .buttoncup{
    outline: none;
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    cursor: pointer;
    width: calc(5vmin);
    height: calc(5vmin);
    border: calc(0.1vmin) solid var(--plasma-colors-buttonAccent);
    background: var(--plasma-colors-buttonSecondary);
    border-radius: 50%;
    overflow: hidden;
    transform: scale(2);
    box-shadow: inset 0 0 calc(1vmin) rgba(0,0,0,.5);
  }

  .buttoncup:active{
    outline: none;
    transition-duration: .2s;
    box-shadow: inset 0 0 calc(1vmin) var(--plasma-colors-buttonFocused);
  }

  .h1:hover{
    outline: none;
    transition-duration: .2s;
    transform: translate(-5%, -5%);
  }
  .h2:hover{
    outline: none;
    transition-duration: .2s;
    transform: translate(-5%, +5%);
  }
  .h3:hover{
    outline: none;
    transition-duration: .2s;
    transform: translate(+5%, -5%);
  }
  .h4:hover{
    outline: none;
    transition-duration: .2s;
    transform: translate(+5%, +5%);
  }

  .cup{
    outline: none;
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    cursor: pointer;
    width: calc(40vmin);
    height: calc(40vmin);
    border: calc(0.7vmin) solid var(--plasma-colors-buttonAccent);
    background: var(--plasma-colors-buttonSecondary);
    border-radius: 50%;
    overflow: hidden;
    transform: scale(2);
    box-shadow: inset 0 0 calc(5vmin) rgba(0,0,0,.5);
    animation: hov 2.5s linear infinite;
  }

  .cup:hover{
    outline: none;
    animation: none;
  }

  .cup:active{
    outline: none;
    transition-duration: .2s;
    box-shadow: inset 0 0 calc(5vmin) var(--plasma-colors-buttonFocused);
  }
  
  .wave{
    outline: none;
    width: calc(80vmin);
    height: calc(80vmin);
    position: absolute;
    background: var(--plasma-colors-gradientDevice);
    border-radius:  33%;
    transition: all 1.4s linear;
    animation: waves 5s linear infinite;
  }

  .up{ 
    outline: none;
    transform: translate(0%, -8%); 
  }
  .up1{
    outline: none;
    transform: translate(0%, -5%);
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

  @media (max-width: 640px) {
    .up{ 
      outline: none;
      transform: translate(0%, -5%);
    }
    .up1{ 
      outline: none;
      transform: translate(0%, -3%);
    }
  }
</style>
