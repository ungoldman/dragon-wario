var readline = require('readline')
  , colors = require('colors')
  , print = console.log
  , thyHit = 5
  , slime = 3
  , experience = 0
  , gold = 0
  , name
  , rl;

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

clr();
print('\nWelcome to '.white.bold+'Dragon Wario'.cyan.bold.underline+'!\n');

rl.question('What is your name?\n\n'+'> '.green, function(answer){
  name = cleanStr(answer,true);
  if (answer == '') name = 'Derp';
  start();
});

function start() {
  clr();
  if (name == 'Wario' || name == 'wario') {
    name = 'Wario'.rainbow.bold;
    print('Yes, it\'s-a you, '.bold+name+'!\n\n'.bold);
  } else {
    name = name.green.bold;
  }
  print('Kinge\'s Castle.\n'.underline.bold);
  print('Ye Kinge:'.magenta.bold+' \n\n'+
    '"Greetings, '+name+'. \n\nThou hast arrived in mine kingdom at a grave time indeed. \n'+
    'The '+'Slime'.red.bold+' Army of Westmere hath decimated mine trewps unto oblivione. \n'+
    'If thou wouldst not protest too much methinks it goode if thou wouldst \n'+
    'assist us with thy blade. Should you accept, thou shalt be most \n'+
    'handsomely rewarded with garments and jewels, indeed."');
  pause(function(){
    rl.question('\n\nDo you '+
      '['.red+'a'.green+']'.red+'ccept the '+'Kinge'.magenta.bold+'\'s offer or '+
      '['.red+'l'.green+']'.red+'eave abruptly?\n\n'+'> '.green,
      function(ans){
      ans = cleanStr(ans);
      switch(ans){
        case 'a':
        case 'accept':
          clr();
          print('Field of Battle.\n'.underline.bold);
          print('Thou leavest ye '+'Kinge'.magenta.bold+'\'s castle and traveleth unto yon field of battle.');
          print('A '+'Slime'.red.bold+' draws near!\n'.bold);
          fightLoop();
          break;
        case 'l':
        case 'leave':
          clr();
          print('Ye Kinge: \n'.magenta.bold+'"Begone, foul knave!"\n');
          alternate();
          break;
        default:
          print('\nChoose an real answer thou blaggard.'.red);
          start();
      }
    });
  });
}

function fightLoop() {
  if (thyHit < 1) {
    print('Thou hast been defeated...');
    pause(gameOver);
  }
  else if (slime < 1) {
    print('\nThou hast done well in defeating the '+'Slime'.red.bold+'.'+
    '\nThy experience increases by '+'1'.green+'.'+
    '\nThy '+'GOLD'.yellow.bold+' increases by '+'1'.green+'.\n');
    experience++;
    gold++;
    pause(interlude);
  } else {
    print('Do you '+
      '['.red+'f'.green+']'.red+'ight the '+'Slime'.red.bold+', '+
      'check your '+'['.red+'s'.green+']'.red+'tatus, '+
      'or attempt to '+'['.red+'r'.green+']'.red+'un?');
    rl.question('\n'+'> '.green, function(ans){
      ans = cleanStr(ans);
      switch(ans){
        case 'f':
        case 'fight':
          clr();
          print('\n'+name+' attacks!\nThe '+'slime'.red.bold+'\'s Hit Point have been reduced by '+'1'.red+'.\n');
          slime--;
          print('The '+'Slime'.red.bold+' attacks!\nThy Hit decreased by '+'1'.red+'.');
          thyHit--;
          pause(fightLoop);
          break;
        case 's':
        case 'status':
          clr();
          print('\nThou hast ' + String(thyHit).green + ' Hit.');
          print('The '+'Slime'.red.bold+' hath ' + String(slime).green + ' Hit Point.');
          pause(fightLoop);
          break;
        case 'i':
        case 'item':
          clr();
          print('\nThat cannot be used in battle.');
          pause(fightLoop);
          break;
        case 'r':
        case 'run':
          clr();
          print('\n'+name+' started to run away.\nBut was blocked from the front.');
          print('The '+'Slime'.red.bold+' attacks!\nThy Hit decreased by '+'2'.red+'.');
          thyHit--;
          pause(fightLoop);
          break;
        default:
          clr();
          print('\nChoose an real answer thou blaggard.\n'.red);
          fightLoop();
      }
    });
  }
}

function interlude() {
  print('Kinge\'s Castle.\n'.underline.bold);
  print('After an arduous duel with the vile '+'Slime'.red.bold+', you returnst to yon castle.')
  print('But woe! It is '+'burnt'.red+'. It is no more.\n');
  rl.question('Do you '+
    '['.red+''+'s'.green+']'.red+'earch the rubble for signs of life or '+
    '['.red+''+'f'.green+']'.red+'lee to safety?\n\n'+'> '.green, function(ans){
      ans = cleanStr(ans);
      switch(ans){
        case 's':
        case 'search':
          clr();
          endgame();
          break;
        case 'f':
        case 'flee':
          clr();
          print('\nThy cowardly attempt to flee is thwarted when a Minotaur appears. \n'+
          'Thou spontaneously combust from fear.');
          pause(gameOver);
          break;
        default:
          clr();
          print('\nChoose an real answer thou blaggard.'.red);
          interlude();
      }
  })
}

function endgame() {
  print('\nUnder an rock thou findst the '+'Kinge'.magenta.bold+'. He is dead. You take his '+
    'crown. Thou art now the '+'Kinge'.magenta.bold+'.\n'+
    'A princess draws near!\n');
  rl.question('Dost thou [m]arry her or [p]anic?\n\n'+'> '.green, function(ans){
    ans = cleanStr(ans);
    if (ans == 'm' || ans == 'marry') {
      clr();
      print('Suddenly, thou art married and the '+'Kinge'.magenta.bold+'.'+
        'A winner is '.bold+name+'.\n'.bold);
      print('THE END'.underline.bold+'\n\n');
      process.exit(0);
    } else if (ans == 'p' || ans == 'panic') {
      clr();
      print('Thou hast escapt the peril of a loveless marriage. Several years later '+
        'thou sellst the '+'Kinge'.magenta.bold+'\'s crowne for some prime beachfront property.\n');
      pause(function(){
        print('Beachfront Property.\n'.underline.bold);
        print('Thou art retired. Congratulations, '+name+'. Thou hast survived '+
          '"The Most Dangerous Game"'.bold+' and lived to tell the tale.');
        print('\n\n'+'THE END'.underline.bold+'\n\n');
        process.exit(0);
      });
    } else {
      clr();
      print('Thou hast failed to act in time. An errant meteor strikes you in '+
        'the phlegmatic humour.');
      pause(gameOver);
    }
  })
}

function alternate() {
  print('The Land.\n'.underline.bold);
  print('You travel the land in search of a worthy quest, but alas, most of \n'+
    'them are boring and you are not qualified enough for the rest. After \n'+
    'talking about it with your parents you decide to get an associate\'s \n'+
    'degree in accounting. After two years of studying you find yourself in \n'+
    'the employ of a vast banking conglomerate. Several more meaningless \n'+
    'years pass by imperceptibly and you find yourself in middle management. \n\n')
  print('Conglomo Headquarters.\n'.underline.bold);
  print('You are sent out to Westmere on a company retreat \n'+
    'to increase '+'synergy'.yellow.bold+' in the company.\n\n');
  print('Westmere International Airport.\n'.underline.bold);
  print('As you exit the terminal and attempt to hail a taxi, \n'+
    'a '+'Slime'.red.bold+' draws near!');
  fightLoop();
}

function gameOver() {
  print('\n     '+'Thou art dead.'.underline.bold);
  print(""+
    "        _______\n".red+
    "     .-\"       \"-.\n".red+
    "    /             \\\n".red+
    "   /               \\\n".red+
    "   |   .--. .--.   |\n".red+
    "   | )/   | |   \\( |\n".red+
    "   |/ \\__/   \\__/ \\|\n".red+
    "   /      /^\      \\\n".red+
    "   \\__    '='    __/\n".red+
    "     |\\         /|\n".red+
    "     |\\'\"VUUUV\"'/|\n".red+
    "     \\ `\"\"\"\"\"\"\"` /\n".red+
    "      `-._____.-'".red);
  print('\n       GAME OVER\n\n'.red.bold);
  process.exit(0);
}

function clr() {
  print('\033[2J');
}

function pause(cb) {
  rl.question('\n[ press enter to continue ]'.grey, function(ans){
    clr();
    cb();
  });
}

function cleanStr(str, upper){
  if (upper) return (str + '').trim();
  return (str + '').trim().toLowerCase();
}
