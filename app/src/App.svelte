<script lang="ts">
  import {onMount} from 'svelte';
  import {createSmartappDebugger, createAssistant} from '@sberdevices/assistant-client';
  import {setTheme} from './themes';
  import {logger} from "./utils";

  let assistant;
  let state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date(), vis: "visible", err: 0};
  let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwMTI4ZGNhOWNiYWRlOTIwMWMxOTllZTFjYTM2ZTNiNjE5ZDMyMzgyNzk4NmQ4MDFmZjVhYTFiNmJhMDMwOTUzYTUiLCJhdWQiOiJWUFMiLCJleHAiOjE2NTU0NTY3MjcsImlhdCI6MTY1NTM3MDMxNywiaXNzIjoiS0VZTUFTVEVSIiwidHlwZSI6IkJlYXJlciIsImp0aSI6IjEyNGJmNGQ3LWMyYzgtNGQ5NS1hNDcyLTM4NTc4ZjA4ZDQ3MCIsInNpZCI6ImY2N2U5NTMxLTE1ODktNDk3Zi1hMjJmLTc3ZmYxYjhjZTIyNCJ9.A1z92TenPDuuh-f6WZk02TsMOqc3tIxeWZsaWVhLeUZ9qgANSwKAmtCZzEY04YempbmmSgcFqcBjEPWll0e_7RBBHTjjtZ9iWi80-c8APb5zsz2ITZw_ulQvqHPps0dXvMxn2BiH_BIpA3P2pXQ-x-r1JgcwmLrfE89RXTeWRStm3ganXEZg24dF76oXYeVsMvDET_XQFt9Hf7xJu8M_GnhmSEeRdiM0EQ4MYtpzIqIEo-_iTwnubutNgmAvZZ89Fdb337jvsYTtMt9tzrdT1zrLB11hHdOudwHrLUUfoJ7HLLGF73n09fb8Rhipha1zChGO33WDR5vnm8Ns2XgKSuz1Asa-SjS3WPDG6NqjFGzhMkdWKz8cxV4H1c4fg1wTSNIUKv2JKJBEK1rWAXqvi8l1I4QsYSAT17_jIU7vKWOdfbRRDiSTbOr1svXGE79132VFHCwnJO5cbpJ0YSND6ExEKyWXyXB_b2Xk2bfwhvu_1OvSX4YYlhuShl8Li2D-WLrTsPNZDwguXuFsJgQgae6ptSHx6QAFxXahFvai1amARPfn7bmPJyMfV0i5n8rWlC8uYkioqWw6jgwZu3yQwWOpl6vvIvwtmi3dfL2ZQjjORV3aw7DupIC0zg88pQpTt8nzdKNxvob13p9NI1f-UdM5LpM-jl3Vu2vAu6cCz6A';
  let initPhrase = 'Активируй Тестовый апп';

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
      <cent on:click={handleAddWater} class = "cup big" style="outline: none;"> {state.waterCount} / {state.waterMax} <cent class="wave" style="top: calc((1 - {state.waterCount} / {state.waterMax}) * 100%);"></cent> </cent>
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
    -webkit-tap-highlight-color: transparent;
    background: var(--plasma-colors-gradient);
  }

  body {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  main {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    padding: 1em;
    margin: 0 auto;
  }

  .don {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .res {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    width: 10%;
    justify-content: space-around;
  }

  .cor {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-flow: row;
    justify-content:space-around;
    width: calc(100% - 2em);
    flex: 1 1 auto;
  }

  button {
    outline: none;
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--plasma-colors-accent);
    font-weight: 100;
    font-size: calc(5vmin);
  }

  .big{
    font-weight: 400;
    font-size: calc(7vmin);
  }

  .shadow {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 3px 20px rgba(0,0,0,.25), inset 0 2px 0 rgba(255,255,255,.6), 0 2px 0 rgba(0,0,0,.1), inset 0 0 20px rgba(0,0,0,.1);
  }
  
  .shadow:hover {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow: inset 0 0 20px rgba(0,0,0,.2), 0 2px 0 rgba(255,255,255,.4), inset 0 2px 0 rgba(0,0,0,.1);
  }

  .buttoncup{
    outline: none;
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
    transition-duration: .2s;
    box-shadow: inset 0 0 calc(1vmin) var(--plasma-colors-buttonFocused);
  }

/*
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
  */

  .cup{
    outline: none;
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
    animation: none;
  }

  .cup:active{
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition-duration: .2s;
    box-shadow: inset 0 0 calc(5vmin) var(--plasma-colors-buttonFocused);
  }
  
  .wave{
    outline: none;
    -webkit-tap-highlight-color: transparent;
    width: calc(80vmin);
    height: calc(80vmin);
    position: absolute;
    background: var(--plasma-colors-gradientDevice);
    border-radius:  33%;
    transition: all 1.4s linear;
    animation: waves 5s linear infinite;
  }

/*
  @media (min-width: 800px) {
    .up{ 
      outline: none;
    -webkit-tap-highlight-color: transparent;
    transform: translate(0%, calc(-0.5vmin)); 
    }
    .up1{ 
      outline: none;
    -webkit-tap-highlight-color: transparent;
    transform: translate(0%, calc(-0.3vmin));
    }
  }
*/

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
