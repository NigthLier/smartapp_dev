import { Dialute, SberRequest } from 'dialute';
import e from 'express';

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

function mil(a: number){
  if(a % 10 == 1)
    return " миллилитр";
  else if(a % 10 == 2 || a % 10 == 3 || a % 10 == 4)
      return " миллилитрa";
  else
    return " миллилитров";
}

function vi_1(a: string){
  if(a == "Сбер")
    return "Возможно, вы хотели изменить суточную норму, но я не понял вас. Попробуйте ещё раз или попросите справку.";
  if(a == "Афина")
    return "Возможно, вы хотели изменить суточную норму, но я не поняла вас. Попробуйте ещё раз или попросите справку.";
  if(a == "Джой")
    return "Возможно, ты хотел изменить суточную норму, но я не поняла тебя. Попробуй ещё раз или попроси справку.";
}

function vi_2(a: string){
  if(a == "Сбер")
    return "Возможно, вы хотели изменить суточную норму, но я не понял вас. Попробуйте ещё раз или попросите справку.";
  if(a == "eva")
    return "Возможно, вы хотели изменить суточную норму, но я не поняла вас. Попробуйте ещё раз или попросите справку.";
  if(a == "Джой")
    return "Возможно, ты хотел изменить суточную норму, но я не поняла тебя. Попробуй ещё раз или попроси справку.";
}

function vi_3(a: string){
  if(a == "Сбер")
    return "Я не понимаю, что вы хотите сказать. Попробуйте ещё раз или попросите справку.";
  if(a == "Афина")
    return "Я не понимаю, что вы хотите сказать. Попробуйте ещё раз или попросите справку.";
  if(a == "Джой")
    return "Я не понимаю, что ты хочешь сказать. Попробуй ещё раз или попроси справку.";
}

function vi_help(a: string, b: number){
  if(a == "Сбер")
    if(b == 0)
      return 'Справка: Данное приложение позволяет отслеживать количество выпитой воды. Чтобы увеличить значение счетчика нажмите на центр экрана или произнесите: "Я выпил/выпила столько-то миллилитров". Чтобы изменить максимум нажмите на кнопки плюс или минус или произнесите: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров". Для возврата к начальным значениям нажмите на кнопку 0 или произнесите: "Обнулить значения". Чтобы вызвать справку нажмите на кнопку вопрос или скажите "Информация". Чтобы переключить интерфейс скажите "Показать/Спрятать кнопки".';
    if(b == 1)
      return 'Чтобы изменить максимум нажмите на кнопки плюс или минус или произнесите: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров"';
    if(b == 2)
      return 'Чтобы увеличить значение счетчика нажмите на центр экрана или произнесите: "Я выпил/выпила столько-то миллилитров"';
    if(b == 3)
      return 'Для возврата к начальным значениям нажмите на кнопку 0 или произнесите: "Обнулить значения"';
    if(b == 4)
      return 'Чтобы переключить интерфейс скажите "Показать/Спрятать кнопки"';
  if(a == "Афина")
    if(b == 0)
      return 'Справка: Данное приложение позволяет отслеживать количество выпитой воды. Чтобы увеличить значение счетчика нажмите на центр экрана или произнесите: "Я выпил/выпила столько-то миллилитров". Чтобы изменить максимум нажмите на кнопки плюс или минус или произнесите: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров". Для возврата к начальным значениям нажмите на кнопку 0 или произнесите: "Обнулить значения". Чтобы вызвать справку нажмите на кнопку вопрос или скажите "Информация". Чтобы переключить интерфейс скажите "Показать/Спрятать кнопки".';
    if(b == 1)
      return 'Чтобы изменить максимум нажмите на кнопки плюс или минус или произнесите: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров"';
    if(b == 2)
      return 'Чтобы увеличить значение счетчика нажмите на центр экрана или произнесите: "Я выпил/выпила столько-то миллилитров"';
    if(b == 3)
      return 'Для возврата к начальным значениям нажмите на кнопку 0 или произнесите: "Обнулить значения"';
    if(b == 4)
      return 'Чтобы переключить интерфейс скажите "Показать/Спрятать кнопки"';
  if(a == "Джой")
    if(b == 0)
      return 'Справка: Данное приложение позволяет отслеживать количество выпитой воды. Чтобы увеличить значение счетчика нажми на центр экрана или произнеси: "Я выпил/выпила столько-то миллилитров". Чтобы изменить максимум нажми на кнопки плюс или минус или произнеси: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров". Для возврата к начальным значениям нажми на кнопку 0 или произнеси: "Обнулить значения". Чтобы вызвать справку нажми на кнопку вопрос или скажи "Информация". Чтобы переключить интерфейс скажи "Показать/Спрятать кнопки".';
    if(b == 1)
      return 'Чтобы изменить максимум нажми на кнопки плюс или минус или произнеси: "Увеличить/Уменьшить/Установить суточную норму на столько-то миллилитров"';
    if(b == 2)
      return 'Чтобы увеличить значение счетчика нажми на центр экрана или произнеси: "Я выпил/выпила столько-то миллилитров"';
    if(b == 3)
      return 'Для возврата к начальным значениям нажми на кнопку 0 или произнеси: "Обнулить значения"';
    if(b == 4)
      return 'Чтобы переключить интерфейс скажи "Показать/Спрятать кнопки"';
}

function vi_hello(a: string){
  if(a == "Сбер")
    return "Здравствуйте";
  if(a == "Афина")
    return "Здравствуйте";
  if(a == "Джой")
    return "Привет";
}

function* script(r: SberRequest) {
  const rsp = r.buildRsp();
  const state = { loaded: false, waterCount: 0, waterMax: 2000, date: new Date().toLocaleString().substr(0,10), vis: "visible", err: 0};
  rsp.data = state;
  
  while (true) {
    if(r.type === 'SERVER_ACTION')
    {
      if (r.act?.action_id === 'AddWater') {
        state.waterCount += 200;
        if(state.waterCount > state.waterMax) { state.waterCount = state.waterMax; }
        rsp.msg = 'Выпито 200 миллилитров, так держать!';
        yield rsp;
      }
      if (r.act?.action_id === 'AddMax') {
        state.waterMax += 200;
        if(state.waterMax > 4000) { state.waterMax = 4000; }
        rsp.msg = 'Установлена суточная норма в  ' + state.waterMax + mil(state.waterMax);
        yield rsp;
      }
      if (r.act?.action_id === 'SubMax') {
        state.waterMax -= 200;
        if(state.waterMax < 200){ state.waterMax = 200; }
        rsp.msg = 'Установлена суточная норма в  ' + state.waterMax + mil(state.waterMax);
        yield rsp;
      }
      if (r.act?.action_id === 'Zero') {
        state.waterCount = 0;
        state.waterMax = 2000;
        rsp.msg = 'Значения обнулены';
        yield rsp;
      }
      if (r.act?.action_id === 'Help') {
        rsp.msg = vi_help(r.charName, 0);
        yield rsp;
      }
    } 
    else {
      var splitted = r.msg.toLowerCase().split(" ");
      var numbered = 0;
      splitted.forEach(function (value){ let n = numstring(value); if(n != NaN) { if(n === 1000) { numbered *= n; } else { numbered += n; }}})

      if(splitted.filter(word => word.indexOf('справк') != -1 || word.indexOf('помо') != -1 || word.indexOf('инф') != -1 || word.indexOf('help') != -1 || word.indexOf('как') != -1 ).length > 0){
        if(splitted.filter(word => word.indexOf('суточн') != -1 || word.indexOf('дневн') != -1 || word.indexOf('норм') != -1).length > 0)
          rsp.msg = vi_help(r.charName, 1);
        else if(splitted.filter(word => word.indexOf('пил') != -1 || word.indexOf('пью') != -1 || word.indexOf('пить') != -1).length > 0)
          rsp.msg = vi_help(r.charName, 2);
        else if(splitted.filter(word => word.indexOf('обнул') != -1).length > 0)
          rsp.msg = vi_help(r.charName, 3);
        else if(splitted.filter(word => word.indexOf('показ') != -1 || word.indexOf('покаж') != -1 || word.indexOf('прят') != -1 || word.indexOf('пряч') != -1).length > 0)
          rsp.msg = vi_help(r.charName, 4);
        else
          rsp.msg = vi_help(r.charName, 0);
        state.err = 0;
        yield rsp;
      } 
      else if(splitted.filter(word => word.indexOf('суточн') != -1 || word.indexOf('дневн') != -1 || word.indexOf('норм') != -1).length > 0){
        if(state.err > 1){
          rsp.msg =  vi_1(r.charName);
          state.err = 0;
        }
        else {
          rsp.msg = '';
          state.err++;
        }
        if(numbered != 0){
          if(r.msg.toLowerCase().indexOf('стакан') != -1) {  numbered *= 200; }
          if(splitted.filter(word => word.indexOf('увелич') != -1 || word.indexOf('добав') != -1 || word.indexOf('прибав') != -1).length > 0) {
            state.waterMax += numbered;
            if(state.waterMax > 4000) { state.waterMax = 4000; }
            rsp.msg = 'Установлена суточная норма в  ' + state.waterMax + mil(state.waterMax);
            state.err = 0;
          }
          if(splitted.filter(word => word.indexOf('уменьш') != -1 || word.indexOf('отн') != -1).length > 0) {
            state.waterMax -= numbered;
            if(state.waterMax < 200){ state.waterMax = 200; }
            if(state.waterMax < state.waterCount){ state.waterCount = state.waterMax; }
            rsp.msg = 'Установлена суточная норма в  ' + state.waterMax + mil(state.waterMax);
            state.err = 0;
          }
          if(splitted.filter(word => word.indexOf('устан') != -1 || word.indexOf('пост') != -1).length > 0) {
            state.waterMax = numbered;
            if(state.waterMax < 200) { state.waterMax = 200; }
            if(state.waterMax > 4000) { state.waterMax = 4000; }
            if(state.waterMax < state.waterCount) { state.waterCount = state.waterMax; }
            rsp.msg = 'Установлена суточная норма в  ' + state.waterMax + mil(state.waterMax);
            state.err = 0;
          }
        }
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('пил') != -1 || word.indexOf('пью') != -1 || word.indexOf('пить') != -1).length > 0) {
        if(state.err > 1){
          rsp.msg =  vi_2(r.charName);
          state.err = 0;
        }
        else {
          rsp.msg = '';
          state.err++;
        }
        if(numbered != 0){
          if(r.msg.toLowerCase().indexOf('стакан') != -1){ numbered *= 200;}
          state.waterCount += numbered;
          if(state.waterCount > state.waterMax) { state.waterCount = state.waterMax; }
          rsp.msg = 'Выпито ' + numbered + mil(numbered) + ', так держать!';
          state.err = 0;
        }
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('обнул') != -1).length > 0){
        state.waterCount = 0;
        state.waterMax = 2000;
        rsp.msg = 'Значения обнулены';
        state.err = 0;
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('показ') != -1 || word.indexOf('покаж') != -1).length > 0){
        state.vis = 'visible';
        rsp.msg = 'Кнопки показаны';
        state.err = 0;
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('прят') != -1 || word.indexOf('пряч') != -1).length > 0){
        state.vis = 'hidden';
        rsp.msg = 'Кнопки спрятаны';
        state.err = 0;
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('водяной баланс') != -1 || word.indexOf('трекер воды') != -1 || word.indexOf('счетчик воды') != -1).length > 0) {
        rsp.msg = vi_hello(r.charName);
        state.err = 0;
        yield rsp;
      }
      else if(splitted.filter(word => word.indexOf('стоп') != -1 || word.indexOf('хватит') != -1 || word.indexOf('выход') != -1 || word.indexOf('выйти') != -1).length > 0){
        state.err = 0;
      }
      else {
        if(state.err > 1){
          rsp.msg = vi_3(r.charName);
          state.err = 0;
        } 
        else{
          rsp.msg = ''
          state.err++;
        }
        yield rsp;
      }
    }
  }
}

Dialute.fromEntrypoint(script as GeneratorFunction).start();