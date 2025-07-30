const btn = document.getElementById('btn');
const content = document.getElementById('content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  else if (hour < 18) return "Good afternoon!";
  else return "Good evening!";
}

function processCommand(cmd) {
  cmd = cmd.toLowerCase();  // make it case-insensitive

  if (cmd.includes('hello') || cmd.includes('hi')) {
    return `${getGreeting()} How can I assist you today?`;

  } else if (cmd.includes('your name')) {
    return 'My name is Sifara, your virtual assistant.';

  } else if (cmd.includes('time')) {
    return `Current time is ${new Date().toLocaleTimeString()}`;

  } else if (cmd.includes('date')) {
    return `Today is ${new Date().toLocaleDateString()}`;

  } else if (cmd.includes('open youtube')) {
    window.open('https://www.youtube.com', '_blank');
    return 'Opening YouTube for you.';

  } else if (cmd.includes('open google')) {
    window.open('https://www.google.com', '_blank');
    return 'Opening Google for you.';

  } else if (cmd.includes('open github')) {
    window.open('https://www.github.com', '_blank');
    return 'Opening GitHub for you.';

  } else if (cmd.includes('play music')) {
    window.open('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '_blank');
    return 'Playing music for you.';

  } else if (cmd.includes('weather')) {
    return 'It’s sunny and 28°C in your location. (This is a sample response)';

  } else if (cmd.includes('calculate')) {
    try {
      const expression = cmd.replace('calculate', '').trim();
      const result = eval(expression);
      return `The result is ${result}`;
    } catch (error) {
      return 'Sorry, I couldn’t calculate that.';
    }

  } else if (cmd.includes('thank you')) {
    return 'You’re welcome! Let me know if you need anything else.';

  } else {
    return `I didn't get that. Let me search it for you...`;
  }
}


btn.addEventListener('click', () => {
  recognition.start();
  btn.innerText = 'Listening...';
});

recognition.onresult = event => {
  const text = event.results[0][0].transcript;
  content.innerText = `You said: "${text}"`;
  const reply = processCommand(text.toLowerCase());
  setTimeout(() => {
    content.innerText += `\nAssistant: "${reply}"`;
    speak(reply);
  }, 500);
};

recognition.onend = () => {
  btn.innerText = '🎤 Talk to Me';
};

window.onload = () => {
  speak(`${getGreeting()} I am Sifara, ready when you are.`);
};
