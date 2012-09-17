var readline = require('readline'),
    cl       = console.log,
    thyHit   = 5,
    slime    = 3,
    name;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

cl('\033[2J');
cl("\nWelcome to Dragon Wario!\n");

rl.question('What is your name?\n> ',function(answer){
  name = cleanStr(answer,true);
  if (answer == '') name = 'derp';
  start();
});

function start() {
  cl('\033[2J');
  if (name == 'Wario' || name == 'wario') {
    cl("Yes, it's-a you, Wario!\n\n");
  }
  cl('Ye Kinge: Greetings, '+name+'. Thou hast arrived in mine kingdom at a grave '+
    'time indeed. The Slime Army of Westmere hath decimated mine trewps unto '+
    'oblivione. If thou wouldst not protest too much methinks it goode if '+
    'thou wouldst assist us with thy blade. Should you accept, thou shalt be '+
    'most handsomely rewarded with garments and jewels, indeed.');
  rl.question('\nDo you [a]ccept the Kinge\'s offer or [l]eave abruptly?\n> ',
    function(ans){
    ans = cleanStr(ans);
    switch(ans){
      case 'a':
      case 'accept':
        cl('\033[2J');
        cl('Thou leavest ye Kinge\'s castle and traveleth unto yon field of battle.\n')
        cl('\nA Slime draws near!');
        fightLoop();
        break;
      case 'l':
      case 'leave':
        cl('\033[2J');
        cl('Ye Kinge: Begone, foul knave!');
        alternate();
        break;
      default: start();
    }
  })
}

function fightLoop() {
  if (thyHit < 1) {
    gameOver();
    process.exit(0);
  }
  else if (slime < 1) {
    cl('\nThou hast done well in defeating the Slime.'+
    '\nThy experience increases by 1.'+
    '\nThy GOLD increases by 1.');
    interlude();
  } else {
    cl('\n[f]ight, [s]tatus, [r]un');
    rl.question('Command?\n> ', function(ans){
      ans = cleanStr(ans);
      switch(ans){
        case 'f':
        case 'fight':
          cl('\033[2J');
          cl('\n'+name+" attacks!\nThe slime's Hit Point have been reduced by 1.\n");
          slime--;
          cl("The Slime attacks!\nThy Hit decreased by 1.");
          thyHit--;
          fightLoop();
          break;
        case 's':
        case 'status':
          cl('\033[2J');
          cl('\nThou hast ' + thyHit + ' Hit.');
          cl('The Slime hath ' + slime + ' Hit Point.');
          fightLoop();
          break;
        case 'i':
        case 'item':
          cl('\033[2J');
          cl('\nThat cannot be used in battle.');
          fightLoop();
          break;
        case 'r':
        case 'run':
          cl('\033[2J');
          cl('\n'+name+' started to run away.\nBut was blocked from the front.');
          cl('The Slime attacks!\nThy Hit decreased by 2.');
          thyHit--;
          fightLoop();
          break;
        default:
          cl('\nChoose an real answer thou blaggard.');
          fightLoop();
      }
    });
  }
}

function interlude() {
  cl('\nAfter an arduous duel with the vile Slime, you returnst to yon '+
    'castle. But woe! It is burnt. It is no more.');
  rl.question('Do you [s]earch the rubble for signs of life '+
    'or [f]lee to safety?\n> ', function(ans){
      ans = cleanStr(ans);
      switch(ans){
        case 's':
        case 'search':
          cl('\033[2J');
          endgame();
          break;
        case 'f':
        case 'flee':
          cl('\033[2J');
          cl('\nThy cowardly attempt to flee is thwarted when a Minotaur '+
            'appears. Thou spontaneously combust from fear.');
          gameOver();
          process.exit(0);
          break;
        default:
          cl('\033[2J');
          cl('\nChoose an real answer thou blaggard.');
          interlude();
      }
  })
}

function endgame() {
  cl('\nUnder an rock thou findst the Kinge. He is dead. You take his '+
    'crown. Thou art now the Kinge.\n'+
    'A princess draws near!\n');
  rl.question('Dost thou [m]arry her or [p]anic?\n> ', function(ans){
    ans = cleanStr(ans);
    if (ans == 'm' || ans == 'marry') {
      cl('\033[2J');
      cl('Suddenly, thou art married and the Kinge. A winner is '+name+'.\n\n');
      cl('\n\nTHE END\n\n');
      process.exit(0);
    } else if (ans == 'p' || ans == 'panic') {
      cl('\033[2J');
      cl('Thou hast escapt the peril of a loveless marriage. Several years later '+
        'thou sellst the Kinge\'s crowne for some prime beachfront property.');
      cl('\nThou art retired. Congratulations, '+name+'. Thou hast survived '+
        '"The Most Dangerous Game" and lived to tell the tale.');
      cl('\n\nTHE END\n\n');
      process.exit(0);
    } else {
      cl('\033[2J');
      cl('Thou hast failed to act in time. An errant meteor strikes you in '+
        'the phlegmatic humour.');
      gameOver();
      process.exit(0);
    }
  })
}

function alternate() {
  cl('\nYou travel the land in search of a worthy quest, but alas, most of '+
    'them are boring and you are not qualified enough for the rest. After '+
    'talking about it with your parents you decide to get an associate\'s '+
    'degree in accounting. Two years pass by and you find yourself in the '+
    'employ of a vast banking conglomerate. Several more years pass by and '+
    'you find yourself in middle management. You are sent out to Westmere on '+
    'a company retreat to increase synergy in the company.');
  cl('\nAs you exit the terminal and attempt to hail a taxi, '+
    'a Slime draws near!');
  fightLoop();
}

function gameOver() {
  cl('\n     Thou art dead.');
  cl(""+
    "        _______\n"+
    "     .-\"       \"-.\n"+
    "    /             \\\n"+
    "   /               \\\n"+
    "   |   .--. .--.   |\n"+
    "   | )/   | |   \\( |\n"+
    "   |/ \\__/   \\__/ \\|\n"+
    "   /      /^\      \\\n"+
    "   \\__    '='    __/\n"+
    "     |\\         /|\n"+
    "     |\\'\"VUUUV\"'/|\n"+
    "     \\ `\"\"\"\"\"\"\"` /\n"+
    "      `-._____.-'");
  cl('\n       GAME OVER\n\n');
}

function cleanStr(str, upper){
  if (upper) return (str + '').trim();
  return (str + '').trim().toLowerCase();
}
