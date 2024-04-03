const vocabs = [
  { question: "hund", answer: "dog", type: "vocab" },
  { question: "katt", answer: "cat", type: "vocab" },
  { question: "bil", answer: "car", type: "vocab" },
  { question: "bok", answer: "book", type: "vocab" },
  { question: "hus", answer: "house", type: "vocab" },
  { question: "vatten", answer: "water", type: "vocab" },
  { question: "sol", answer: "sun", type: "vocab" },
  { question: "måne", answer: "moon", type: "vocab" },
  { question: "skola", answer: "school", type: "vocab" },
  { question: "grön", answer: "green", type: "vocab" },
]

const idioms = [
  {
    question: "A blessing in disguise",
    answer: "A good thing that seemed bad at first",
    options: ["A good thing that seemed bad at first", "An unfortunate event", "A hidden treasure"],
    type: "idiom"
  },
  {
    question: "Beat around the bush",
    answer: "Avoid saying what you mean, usually because it is uncomfortable",
    options: ["Avoid saying what you mean, usually because it is uncomfortable", "Speak directly", "Make a clear statement"],
    type: "idiom"
  },
  {
    question: "Better late than never",
    answer: "Better to arrive late than not to come at all",
    options: ["Better to arrive late than not to come at all", "Punctuality is important", "Late arrivals are unacceptable"],
    type: "idiom"
  },
  {
    question: "Bite the bullet",
    answer: "To get something over with because it is inevitable",
    options: ["To get something over with because it is inevitable", "Avoiding the inevitable", "Being cautious"],
    type: "idiom"
  },
  {
    question: "Break a leg",
    answer: "Good luck",
    options: ["Good luck", "Be careful", "Best wishes"],
    type: "idiom"
  },
  {
    question: "Call it a day",
    answer: "Stop working on something",
    options: ["Stop working on something", "Continue working", "Finish for the day"],
    type: "idiom"
  },
  {
    question: "Cut somebody some slack",
    answer: "Don\'t be so critical",
    options: ["Don\'t be so critical", "Be strict", "Be judgmental"],
    type: "idiom"
  },
  {
    question: "Cutting corners",
    answer: "Doing something poorly in order to save time or money",
    options: ["Doing something poorly in order to save time or money", "Working efficiently", "Being meticulous"],
    type: "idiom"
  },
  {
    question: "Get out of hand",
    answer: "Get out of control",
    options: ["Get out of control", "Be manageable", "Lose control"],
    type: "idiom"
  },
  {
    question: "Get something out of your system",
    answer: "Do the thing you\'ve been wanting to do so you can move on",
    options: ["Do the thing you\'ve been wanting to do so you can move on", "Hold onto your feelings", "Suppress your desires"],
    type: "idiom"
  },
  {
    question: "Give someone the benefit of the doubt",
    answer: "Trust what someone says",
    options: ["Trust what someone says", "Be suspicious of someone", "Doubt what someone says"],
    type: "idiom"
  },
  {
    question: "Go back to the drawing board",
    answer: "Start over",
    options: ["Start over", "Continue as planned", "Ignore the mistake"],
    type: "idiom"
  },
  {
    question: "Hang in there",
    answer: "Don\'t give up",
    options: ["Don\'t give up", "Let go", "Relax"],
    type: "idiom"
  },
  {
    question: "Hit the sack",
    answer: "Go to sleep",
    options: ["Go to sleep", "Work harder", "Take a break"],
    type: "idiom"
  },
  {
    question: "It\'s not rocket science",
    answer: "It\'s not complicated",
    options: ["It\'s not complicated", "It\'s very difficult", "It\'s a mystery"],
    type: "idiom"
  },
  {
    question: "Let someone off the hook",
    answer: "To not hold someone responsible for something",
    options: ["To not hold someone responsible for something", "Punish someone", "Blame someone"],
    type: "idiom"
  },
  {
    question: "Make a long story short",
    answer: "Tell something briefly",
    options: ["Tell something briefly", "Make the story longer", "Omit the details"],
    type: "idiom"
  },
  {
    question: "No pain, no gain",
    answer: "You have to work for what you want",
    options: ["You have to work for what you want", "Avoid hard work", "Work smart, not hard"],
    type: "idiom"
  },
  {
    question: "On the ball",
    answer: "Doing a good job",
    options: ["Doing a good job", "Slacking off", "Being confused"],
    type: "idiom"
  },
  {
    question: "Pull someone\'s leg",
    answer: "To joke with someone",
    options: ["To joke with someone", "To annoy someone", "To ignore someone"],
    type: "idiom"
  },
  {
    question: "Pull yourself together",
    answer: "Calm down",
    options: ["Calm down", "Get more upset", "Give up"],
    type: "idiom"
  },
  {
    question: "So far so good",
    answer: "Things are going well so far",
    options: ["Things are going well so far", "Things are not going well", "Things could be better"],
    type: "idiom"
  },
  {
    question: "Speak of the devil",
    answer: "The person we were just talking about showed up!",
    options: ["The person we were just talking about showed up!", "Stop talking", "Ignore the person"],
    type: "idiom"
  },
  {
    question: "That\'s the last straw",
    answer: "My patience has run out",
    options: ["My patience has run out", "I have more patience", "I am very patient"],
    type: "idiom"
  },
  {
    question: "The best of both worlds",
    answer: "An ideal situation",
    options: ["An ideal situation", "A difficult situation", "A compromise"],
    type: "idiom"
  },
  {
    question: "Under the weather",
    answer: "Sick",
    options: ["Sick", "Healthy", "Feeling good"],
    type: "idiom"
  },
  {
    question: "We\'ll cross that bridge when we come to it",
    answer: "Let\'s not talk about that problem right now",
    options: ["Let\'s not talk about that problem right now", "Let\'s solve the problem immediately", "Let\'s ignore the problem"],
    type: "idiom"
  },
  {
    question: "Wrap your head around something",
    answer: "Understand something complicated",
    options: ["Understand something complicated", "Confuse yourself", "Forget about it"],
    type: "idiom"
  },
  {
    question: "You can say that again",
    answer: "That\'s true, I agree",
    options: ["That\'s true, I agree", "That\'s not true", "I don\'t agree"],
    type: "idiom"
  },
  {
    question: "Your guess is as good as mine",
    answer: "I have no idea",
    options: ["I have no idea", "I know everything", "I know the answer"],
    type: "idiom"
  }
]

const phrasalVerbs = [
  {
    question: "GO __",
    answer: "ON",
    meaning: "happen",
    examples: [
      "What\'s going on?",
      "There\'s a class going on at the moment.",
      "What went on last night?"
    ],
    type: "phrasalVerb"
  },
  {
    question: "PICK __",
    answer: "UP",
    meaning: "get something or someone from a place",
    examples: [
      "I picked up my brother from the airport.",
      "Please pick up some bread.",
      "Would you come and pick me up from work tonight?"
    ],
    type: "phrasalVerb"
  },
  {
    question: "COME __",
    answer: "BACK",
    meaning: "return to a place (the speaker is in that place)",
    examples: [
      "She came back around 10pm last night.",
      "When will you come back from France?",
      "Please come back! It\'s boring here without you."
    ],
    type: "phrasalVerb"
  },
  {
    question: "COME __ __",
    answer: "UP WITH",
    meaning: "produce an idea",
    examples: [
      "Julie came up with a great idea.",
      "He came up with an answer to the question very quickly.",
      "Can you come up with a better solution?"
    ],
    type: "phrasalVerb"
  },
  {
    question: "GO __",
    answer: "BACK",
    meaning: "return to a place (the speaker isn\'t in that place)",
    examples: [
      "He finished his work and went back to his flat.",
      "When is she planning to go back to Japan?",
      "I\'ll go back to the library later."
    ],
    type: "phrasalVerb"
  },
  {
    question: "FIND __",
    answer: "OUT",
    meaning: "get information",
    examples: [
      "Can you find out what time the restaurant opens?",
      "I found out that we need to submit our essays next Tuesday.",
      "I don\'t know what the weather forecast is for tomorrow, but I\'ll find out."
    ],
    type: "phrasalVerb"
  },
  {
    question: "COME __",
    answer: "OUT",
    meaning: "appear from a place",
    examples: [
      "She came out of the kitchen.",
      "He went to the café and came out with a coffee.",
      "Please come out of the bedroom."
    ],
    type: "phrasalVerb"
  },
  {
    question: "GO __",
    answer: "OUT",
    meaning: "go to an event / restaurant / pub / party",
    examples: [
      "Let\'s go out for dinner.",
      "You\'re going out a lot these days.",
      "We should go out more."
    ],
    type: "phrasalVerb"
  },
  {
    question: "POINT __",
    answer: "OUT",
    meaning: "show / mention",
    examples: [
      "She pointed out the beautiful paintings on the walls.",
      "Please point out to the students that they must attend all the lectures.",
      "\'We\'ll miss the bus if we don\'t hurry\', he pointed out."
    ],
    type: "phrasalVerb"
  },
  {
    question: "GROW __",
    answer: "UP",
    meaning: "become an adult",
    examples: [
      "I grew up in Scotland.",
      "My children are growing up too fast!",
      "When will he grow up?"
    ],
    type: "phrasalVerb"
  },
  {
    question: "SET __",
    answer: "UP",
    meaning: "create / arrange",
    examples: [
      "I need to set up a new bank account.",
      "She\'s decided to set up her own company.",
      "I set up some language classes at the school."
    ],
    type: "phrasalVerb"
  },
  {
    question: "TURN __",
    answer: "OUT",
    meaning: "in the end we discover",
    examples: [
      "The maid turned out to have stolen the money.",
      "He turned out to be a friend of Alex\'s.",
      "The party turned out to be a big success."
    ],
    type: "phrasalVerb"
  },
  {
    question: "GET __",
    answer: "OUT",
    meaning: "leave a room / building / car",
    examples: [
      "I need to get out of the house!",
      "She got out of the car and went into the shop.",
      "Get out! There\'s a fire in the kitchen!"
    ],
    type: "phrasalVerb"
  },
  {
    question: "COME __ / __",
    answer: "IN / INTO",
    meaning: "enter (the speaker is in that place)",
    examples: [
      "Please come in! It\'s great to see you.",
      "She came into the living room and sat down.",
      "Don\'t come in! I\'m not ready yet!"
    ],
    type: "phrasalVerb"
  },
  {
    question: "TAKE __",
    answer: "ON",
    meaning: "to be responsible for",
    examples: [
      "He\'s going to take on the new project.",
      "She isn\'t taking on any new students at the moment.",
      "Could you take on some extra work?"
    ],
    type: "phrasalVerb"
  }
]


export default phrasalVerbs