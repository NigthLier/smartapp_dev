import { Dialute, SberRequest } from 'dialute';
import fetch from 'cross-fetch';

async function load(a: string){
  return await fetch(a).then(res => res.json());
}
async function upload(a: string, b: any){
    if(b.loaded) await fetch(a, { method: 'POST', body: JSON.stringify(b), headers: { 'Content-Type': 'application/json' }});
}

function numstring(a: string){
  if(a.indexOf('тысяч') != -1 || a.indexOf('тыщ') != -1 || a === 'литр' || a === 'литра' || a === 'литров')
    return 1000;
  if(a.indexOf('девятьсот') != -1)
    return 900;
  if(a.indexOf('восемьсот') != -1)
    return 800;
  if(a.indexOf('семьсот') != -1)
    return 700;
  if(a.indexOf('шестьсот') != -1)
    return 600;
  if(a.indexOf('пятьсот') != -1)
    return 500;
  if(a.indexOf('четыреста') != -1)
    return 400;
  if(a.indexOf('триста') != -1)
    return 300;
  if(a.indexOf('двести') != -1)
    return 200;
  if(a.indexOf('сто') != -1)
    return 100;
  if(a.indexOf('девяносто') != -1)
    return 90;
  if(a.indexOf('восемьдесят') != -1)
    return 80;
  if(a.indexOf('семьдесят') != -1)
    return 70;
  if(a.indexOf('шестьдесят') != -1)
    return 60;
  if(a.indexOf('пятьдесят') != -1)
    return 50;
  if(a.indexOf('сорок') != -1)
    return 40;
  if(a.indexOf('тридцать') != -1)
    return 30;
  if(a.indexOf('двадцать') != -1)
    return 20;
  if(a.indexOf('десять') != -1)
    return 10;
  if(a.indexOf('девять') != -1)
    return 9;
  if(a.indexOf('восемь') != -1)
    return 8;
  if(a.indexOf('семь') != -1)
    return 7;
  if(a.indexOf('шесть') != -1)
    return 6;
  if(a.indexOf('пять') != -1)
    return 5;
  if(a.indexOf('четыре') != -1)
    return 4;
  if(a.indexOf('три') != -1)
    return 3;
  if(a.indexOf('два') != -1 || a.indexOf('две') != -1)
    return 2;
  if(a.indexOf('один') != -1 || a.indexOf('одна') != -1)
    return 1;
  return 0;
}

function* script(r: SberRequest) {
  const rsp = r.buildRsp();
  const state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date().toLocaleString().substr(0,10)};
  rsp.data = state;
  rsp.msg = 'Здравствуй';
  yield rsp;

  const url = 'https://smartapp-code.sberdevices.ru/tools/api/data/webdbg_userid_7n3f5ey3ni04i3io6gfld';
  load(url).then(temp => { if (temp.waterMax === undefined) { state.loaded = true; upload(url, state); } else { if(state.date === temp.date) { state.waterCount += temp.waterCount; } state.waterMax += temp.waterMax - 2000; state.date = temp.date; state.loaded = true; }}).then(cur => upload(url, state));
  
  while (true) {
    if(r.type === 'SERVER_ACTION')
    {
      if (r.act?.action_id === 'AddWater') {
        state.waterCount += 200;
        if(state.waterCount > state.waterMax) { state.waterCount = state.waterMax; }
        upload(url, state);
        rsp.msg = 'Вы выпили 200 миллилитров, так держать!';
        yield rsp;
      }
      if (r.act?.action_id === 'AddMax') {
        state.waterMax += 200;
        if(state.waterMax > 4000) { state.waterMax = 4000; }
        upload(url, state);
        rsp.msg = 'Суточная норма увеличена на 200 миллилитров';
        yield rsp;
      }
      if (r.act?.action_id === 'SubMax') {
        state.waterMax -= 200;
        if(state.waterMax < 200){ state.waterMax = 200; }
        upload(url, state);
        rsp.msg = 'Суточная норма уменьшена на 200 миллилитров';
        yield rsp;
      }
    } else {
      var splitted = r.msg.toLowerCase().split(" ");
      var numbered = 0;
      splitted.forEach(function (value){ let n = numstring(value); if(n != NaN) { if(n === 1000) { numbered *= n; } else { numbered += n; }}})
      let f = false;

      if(splitted.filter(word => word.indexOf('суточн') != -1 || word.indexOf('норм') != -1).length > 0){
        if(splitted.filter(word => word.indexOf('увелич') != -1).length > 0 || splitted.filter(word => word.indexOf('добав') != -1).length > 0){
          if(numbered != 0){
            state.waterMax += numbered;
            if(state.waterMax > 4000) { state.waterMax = 4000; }
            upload(url, state);
            f = true;
            rsp.msg = 'Суточная норма увеличена на ' + numbered + ' ' + splitted.filter(word => word.indexOf('литр') != -1)[splitted.filter(word => word.indexOf('литр') != -1).length - 1];
            yield rsp;
          }
        }
        if(splitted.filter(word => word.indexOf('уменьш') != -1).length > 0 || splitted.filter(word => word.indexOf('отним') != -1).length > 0){
          if(numbered != 0){
            state.waterMax -= numbered;
            if(state.waterMax < 200){ state.waterMax = 200; }
            upload(url, state);
            f = true;
            rsp.msg = 'Суточная норма уменьшена на ' + numbered + ' ' + splitted.filter(word => word.indexOf('литр') != -1)[splitted.filter(word => word.indexOf('литр') != -1).length - 1];
            yield rsp;
          }
        }
        if(splitted.filter(word => word.indexOf('устан') != -1).length > 0 || splitted.filter(word => word.indexOf('пост') != -1).length > 0){
          if(numbered != 0){
            state.waterMax = numbered;
            if(state.waterMax < 200){ state.waterMax = 200; }
            if(state.waterMax > 4000) { state.waterMax = 4000; }
            upload(url, state);
            f = true;
            rsp.msg = 'Установлена суточная норма в ' + numbered + ' ' + splitted.filter(word => word.indexOf('литр') != -1)[splitted.filter(word => word.indexOf('литр') != -1).length - 1];
            yield rsp;
          }
        }
      }
      if(splitted.filter(word => word.indexOf('выпил') != -1 || word.indexOf('пью') != -1).length > 0){
        if(numbered != 0){
          if(r.msg.toLowerCase().indexOf('стакан') != -1){
            numbered *= 200;
            state.waterCount += numbered;
            if(state.waterCount > state.waterMax) { state.waterCount = state.waterMax; }
            upload(url, state);
            f = true;
            rsp.msg = 'Вы выпили ' + numbered + ' миллилитров , так держать!';
            yield rsp;
          } else {
            state.waterCount += numbered;
            if(state.waterCount > state.waterMax) { state.waterCount = state.waterMax; }
            upload(url, state);
            f = true;
            rsp.msg = 'Вы выпили ' + numbered + ' ' + splitted.filter(word => word.indexOf('литр') != -1)[splitted.filter(word => word.indexOf('литр') != -1).length - 1] + ', так держать!';
            yield rsp;
          }
        }
      }
      if(splitted.filter(word => word.indexOf('обнул') != -1).length > 0){
        state.waterCount = 0;
        state.waterMax = 2000;
        upload(url, state);
        f = true;
        rsp.msg = 'Обнулено';
        yield rsp;
      }
      if(!f){
        rsp.msg = 'Я вас не понимаю';
        yield rsp;
      }
    }
  }
}

Dialute.fromEntrypoint(script as GeneratorFunction).start();