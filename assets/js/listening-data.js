/* IELTS Listening test library.
   window.LISTENING_TESTS = [ { name, sections:[...] }, ... ] */
window.LISTENING_TESTS = [
  {
    name: 'Test 1 — Everyday & Academic',
    sections: [
  {
    title: 'Section 1 — Accommodation Enquiry',
    blurb: 'A conversation about renting student accommodation.',
    script:
      "Hello, Sunnydale Student Housing, how can I help you? " +
      "Hi, I'm looking for a room to rent near the university. Of course. Can I take your surname please? " +
      "It's Thompson. T-H-O-M-P-S-O-N. Thank you. And which area are you interested in? " +
      "Ideally somewhere near Maple Street, close to my department. Right, near Maple Street. And your maximum monthly budget? " +
      "I can't go above four hundred and fifty pounds a month. Four hundred and fifty, noted. When would you like to move in? " +
      "The start of September, before term begins. September, perfect. Is there any feature that's essential for you? " +
      "Yes, I have a car, so parking is essential. We do have properties with parking. Are you free on Friday afternoon for a viewing? " +
      "Friday works well, thank you. Great. Now, a few details. The deposit is equal to one month's rent, payable before you move in. " +
      "The rent includes water and internet, though electricity is billed separately. Unfortunately, pets are not allowed in any of our student properties. " +
      "And finally, the nearest bus stop is a five-minute walk away, just down the road. Wonderful, I'll see you on Friday. Goodbye!",
    groups: [
      { instr: 'Questions 1–6 — Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 1, text: 'Surname:', a: 'Thompson' },
          { n: 2, text: 'Preferred area: near ______ Street', a: 'Maple' },
          { n: 3, text: 'Maximum monthly budget: £______', a: '450' },
          { n: 4, text: 'Move-in month:', a: 'September' },
          { n: 5, text: 'Essential feature required:', a: 'parking' },
          { n: 6, text: 'Viewing arranged for:', a: 'Friday' },
        ] },
      { instr: 'Questions 7–10 — Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 7, text: 'The deposit is equal to', a: 'B', options: ["A. two weeks' rent", "B. one month's rent", "C. six weeks' rent"] },
          { n: 8, text: 'The apartment includes bills for', a: 'C', options: ['A. electricity only', 'B. nothing', 'C. water and internet'] },
          { n: 9, text: 'Pets are', a: 'A', options: ['A. not allowed', 'B. allowed with a fee', 'C. only cats allowed'] },
          { n: 10, text: 'The nearest bus stop is', a: 'B', options: ['A. next to the building', 'B. a five-minute walk away', 'C. across from the campus'] },
        ] },
    ],
  },
  {
    title: 'Section 2 — Riverside Community Festival',
    blurb: 'A talk giving information about a local festival.',
    script:
      "Good morning everyone, and welcome to the information session for this year's Riverside Community Festival. " +
      "The festival runs for three days, from Friday the 12th to Sunday the 14th of June. " +
      "Entry is completely free, although some workshops require a small booking fee. " +
      "Let me tell you where everything is. As you enter through the main gate, the food stalls are directly ahead of you, along the river. " +
      "To your left, you'll find the main stage, where live music runs all day. " +
      "The children's area, with games and face painting, is to your right, next to the car park. " +
      "Behind the main stage is the craft market, where local artists sell handmade goods. " +
      "A few practical points. Parking is limited, so we strongly encourage visitors to come by bicycle or bus. " +
      "The number 7 bus stops right outside the entrance every fifteen minutes. " +
      "The most popular event is the evening lantern parade on Saturday, which begins at eight o'clock. " +
      "Finally, please note that dogs are welcome, but must be kept on a lead at all times. " +
      "We hope you have a wonderful time at the festival!",
    groups: [
      { instr: 'Questions 11–15 — Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 11, text: 'The festival lasts for ______ days.', a: 'three' },
          { n: 12, text: 'General entry costs: ______', a: 'free' },
          { n: 13, text: 'To attend, visitors are encouraged to travel by bike or ______.', a: 'bus' },
          { n: 14, text: 'The number ______ bus stops outside the entrance.', a: '7' },
          { n: 15, text: 'The lantern parade starts at ______ o\'clock.', a: 'eight' },
        ] },
      { instr: 'Questions 16–20 — Where is each area located? Choose A–E.', type: 'match',
        options: ['A. straight ahead', 'B. to the left', 'C. to the right', 'D. behind the stage', 'E. by the entrance'],
        qs: [
          { n: 16, text: 'Food stalls', a: 'A' },
          { n: 17, text: 'Main stage', a: 'B' },
          { n: 18, text: "Children's area", a: 'C' },
          { n: 19, text: 'Craft market', a: 'D' },
          { n: 20, text: 'Bus stop', a: 'E' },
        ] },
    ],
  },
  {
    title: 'Section 3 — Discussing a Research Project',
    blurb: 'Two students plan a project with their tutor.',
    script:
      "So, Maya, Tom, how is the project on renewable energy coming along? " +
      "Well, we've decided to focus specifically on solar power for our case study. " +
      "Good choice. Why solar rather than wind? We felt there was more recent data available, and it's easier to explain visually. " +
      "That makes sense. What about the structure? We're planning four sections: an introduction, the current situation, the challenges, and our recommendations. " +
      "That sounds logical. Just make sure the challenges section doesn't become too long. Tom, what will you be responsible for? " +
      "I'm handling the data analysis and creating the charts. And Maya is writing the literature review. " +
      "Excellent division of work. Now, one piece of advice: don't rely only on websites. " +
      "Try to include at least three academic journals in your references. That will strengthen your argument. " +
      "When is the deadline again? The final report is due on the 20th of March, but you should hand in a draft two weeks earlier. " +
      "One more thing, remember to include a clear summary at the start, no more than three hundred words. " +
      "Right, thank you. That's really helpful. We'll book another meeting for next Tuesday.",
    groups: [
      { instr: 'Questions 21–25 — Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 21, text: 'The students decided to focus their case study on', a: 'B', options: ['A. wind power', 'B. solar power', 'C. water power'] },
          { n: 22, text: 'They chose this topic mainly because', a: 'A', options: ['A. more recent data was available', 'B. it was cheaper to research', 'C. their tutor suggested it'] },
          { n: 23, text: 'Tom is responsible for', a: 'C', options: ['A. the literature review', 'B. the introduction', 'C. the data analysis and charts'] },
          { n: 24, text: 'The tutor advises them to use at least three', a: 'B', options: ['A. websites', 'B. academic journals', 'C. interviews'] },
          { n: 25, text: 'The summary at the start should be no more than', a: 'C', options: ['A. 100 words', 'B. 200 words', 'C. 300 words'] },
        ] },
      { instr: 'Questions 26–30 — Complete the notes. Write ONE WORD OR A DATE for each answer.', type: 'gap',
        qs: [
          { n: 26, text: 'Number of sections in the report: ______', a: 'four' },
          { n: 27, text: 'Section that should not be too long: the ______ section', a: 'challenges' },
          { n: 28, text: 'Maya is writing the ______ review.', a: 'literature' },
          { n: 29, text: 'Final report deadline: the 20th of ______', a: 'March' },
          { n: 30, text: 'Next meeting: on ______', a: 'Tuesday' },
        ] },
    ],
  },
  {
    title: 'Section 4 — Lecture: The History of Tea',
    blurb: 'A university lecture on the global spread of tea.',
    script:
      "Today's lecture examines how tea became one of the world's most popular drinks. " +
      "According to legend, tea was discovered in China around five thousand years ago, when leaves accidentally fell into boiling water. " +
      "For many centuries, tea remained largely unknown outside Asia. It was Portuguese and Dutch traders who first brought it to Europe in the sixteenth century. " +
      "At first, tea was extremely expensive, and only the wealthy could afford it. It was often kept in locked wooden boxes to prevent theft. " +
      "In Britain, tea became fashionable in the seventeenth century, partly thanks to a royal marriage that made the drink popular at court. " +
      "As demand grew, Britain began growing tea in its colony of India, particularly in the region of Assam, which had ideal conditions. " +
      "This dramatically reduced the price, and by the nineteenth century tea had become a drink for everyone, not just the rich. " +
      "The tradition of afternoon tea is said to have started when a duchess became hungry in the late afternoon and asked for tea and snacks. " +
      "Today, the largest producers of tea are China and India, while the biggest consumers per person include Turkey and Ireland. " +
      "Beyond its taste, research suggests tea contains antioxidants that may benefit health. " +
      "In our next lecture, we'll look at how coffee followed a very different path across the globe.",
    groups: [
      { instr: 'Questions 31–40 — Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 31, text: 'Tea was discovered in China about ______ years ago.', a: 'five thousand' },
          { n: 32, text: 'Tea was brought to Europe by Portuguese and ______ traders.', a: 'Dutch' },
          { n: 33, text: 'It arrived in Europe in the ______ century.', a: 'sixteenth' },
          { n: 34, text: 'To prevent theft, tea was kept in locked ______ boxes.', a: 'wooden' },
          { n: 35, text: 'In Britain, tea became popular partly due to a royal ______.', a: 'marriage' },
          { n: 36, text: 'Britain grew tea in the Indian region of ______.', a: 'Assam' },
          { n: 37, text: 'By the ______ century, tea was affordable for everyone.', a: 'nineteenth' },
          { n: 38, text: 'Afternoon tea was reportedly started by a ______.', a: 'duchess' },
          { n: 39, text: 'The biggest tea consumers per person include Turkey and ______.', a: 'Ireland' },
          { n: 40, text: 'Tea contains ______ that may benefit health.', a: 'antioxidants' },
        ] },
    ],
  },
    ],
  },

  {
    name: 'Test 2 — City Life & Lectures',
    sections: [
  {
    title: 'Section 1 — Gym Membership Registration',
    blurb: 'A phone call to sign up at a fitness centre.',
    script:
      "Good afternoon, City Fitness Centre, how can I help? Hi, I'd like to sign up for a membership. " +
      "Great, I can help with that. Can I take your first name and surname? Yes, it's Daniel Price. P-R-I-C-E. " +
      "Thank you, Daniel. And a contact phone number? It's oh-seven-nine-double-four, one-two-three, eight-nine-oh. " +
      "Let me read that back: oh seven nine four four, one two three, eight nine oh. That's correct. " +
      "Now, which membership are you interested in? We have standard, premium and student. I'm a student, so the student one please. " +
      "The student membership is thirty pounds a month. Perfect. When would you like to start? Could I start on the first of April? " +
      "The first of April, no problem. The centre is open from six in the morning until ten at night on weekdays. " +
      "Is there anything you're particularly interested in? Yes, I'd like to join the swimming classes. " +
      "Those run on Wednesdays and Saturdays. Finally, you'll need to bring a form of identification and a passport-sized photo for your card. " +
      "Wonderful, I'll see you on the first. Thanks very much!",
    groups: [
      { instr: 'Questions 1–6 — Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 1, text: 'Surname:', a: 'Price' },
          { n: 2, text: 'Membership type:', a: 'student' },
          { n: 3, text: 'Monthly cost: £______', a: '30' },
          { n: 4, text: 'Start date: the first of ______', a: 'April' },
          { n: 5, text: 'Weekday closing time: ______ at night', a: 'ten' },
          { n: 6, text: 'Interested in joining the ______ classes', a: 'swimming' },
        ] },
      { instr: 'Questions 7–10 — Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 7, text: 'The centre opens on weekdays at', a: 'A', options: ['A. six in the morning', 'B. seven in the morning', 'C. eight in the morning'] },
          { n: 8, text: 'Swimming classes take place on', a: 'C', options: ['A. Mondays and Fridays', 'B. Tuesdays and Thursdays', 'C. Wednesdays and Saturdays'] },
          { n: 9, text: 'Daniel needs to bring identification and', a: 'B', options: ['A. a bank card', 'B. a passport-sized photo', 'C. a medical certificate'] },
          { n: 10, text: 'Daniel qualifies for a discount because he is', a: 'A', options: ['A. a student', 'B. a senior', 'C. an employee'] },
        ] },
    ],
  },
  {
    title: 'Section 2 — The New City Library',
    blurb: 'A guide describes the facilities of a new library.',
    script:
      "Welcome to the new Central Library. Let me give you a quick tour of what's on each floor and where to find things. " +
      "As you come through the main entrance, the information desk is straight in front of you. " +
      "To the left of the desk is the children's section, which has a story corner and plenty of picture books. " +
      "To the right, you'll find the café, where you can buy drinks and snacks, though please don't take hot food into the reading areas. " +
      "The ground floor also has the returns machine, located just beside the exit. " +
      "If you go upstairs to the first floor, you'll find the main collection of fiction and non-fiction, along with the quiet study zone at the far end. " +
      "The computer suite, with free internet access, is on the second floor, next to the meeting rooms which groups can book in advance. " +
      "A few rules to remember: borrowing is free, but you can keep most books for three weeks. " +
      "Fines for late returns are twenty pence per day. And the library is closed on public holidays. " +
      "Membership is open to anyone living or working in the city, and all you need to join is proof of your address.",
    groups: [
      { instr: 'Questions 11–15 — Where is each facility? Choose A–E.', type: 'match',
        options: ['A. in front of the entrance', 'B. to the left', 'C. to the right', 'D. beside the exit', 'E. on the first floor'],
        qs: [
          { n: 11, text: 'Information desk', a: 'A' },
          { n: 12, text: "Children's section", a: 'B' },
          { n: 13, text: 'Café', a: 'C' },
          { n: 14, text: 'Returns machine', a: 'D' },
          { n: 15, text: 'Quiet study zone', a: 'E' },
        ] },
      { instr: 'Questions 16–20 — Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 16, text: 'The computer suite is on the ______ floor.', a: 'second' },
          { n: 17, text: 'Meeting rooms can be ______ in advance.', a: 'booked' },
          { n: 18, text: 'Most books can be kept for ______ weeks.', a: 'three' },
          { n: 19, text: 'Late fines are ______ pence per day.', a: 'twenty' },
          { n: 20, text: 'To join, you need proof of your ______.', a: 'address' },
        ] },
    ],
  },
  {
    title: 'Section 3 — Preparing a Presentation',
    blurb: 'Two students discuss a class presentation with feedback.',
    script:
      "Hi Sophie, have you thought more about our presentation on healthy eating? " +
      "Yes, I think we should start with some surprising statistics to grab attention. " +
      "Good idea. But last time our tutor said we spent too long on the introduction, so let's keep it short. " +
      "Agreed. How should we divide the topics? Why don't you take the section on nutrition, and I'll cover the effects of fast food? " +
      "That works. And for the visuals, I think we should use fewer words on the slides and more images. " +
      "Definitely. The tutor really disliked slides full of text last time. Should we include a video? " +
      "Maybe a short one, no longer than two minutes, or we'll run out of time. " +
      "How long is the whole presentation supposed to be? Fifteen minutes, including five minutes for questions at the end. " +
      "Okay, so ten minutes of talking. Let's practise together on Thursday. " +
      "Perfect. And don't forget we need to email the slides to the tutor the day before. Right, I'll set a reminder.",
    groups: [
      { instr: 'Questions 21–25 — Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 21, text: 'The students plan to begin the presentation with', a: 'C', options: ['A. a video', 'B. a personal story', 'C. surprising statistics'] },
          { n: 22, text: 'Their tutor previously criticised their', a: 'A', options: ['A. long introduction', 'B. choice of topic', 'C. speaking speed'] },
          { n: 23, text: 'Sophie will cover the section on', a: 'B', options: ['A. fast food effects', 'B. nutrition', 'C. exercise'] },
          { n: 24, text: 'For the slides they agree to use', a: 'C', options: ['A. more text', 'B. no images', 'C. fewer words and more images'] },
          { n: 25, text: 'Any video should be no longer than', a: 'B', options: ['A. one minute', 'B. two minutes', 'C. five minutes'] },
        ] },
      { instr: 'Questions 26–30 — Complete the notes. Write ONE WORD OR A NUMBER.', type: 'gap',
        qs: [
          { n: 26, text: 'Topic of the presentation: healthy ______', a: 'eating' },
          { n: 27, text: 'The presenter of fast-food effects: ______', a: 'Daniel' },
          { n: 28, text: 'Total presentation length: ______ minutes', a: 'fifteen' },
          { n: 29, text: 'Minutes reserved for questions: ______', a: 'five' },
          { n: 30, text: 'They will practise together on ______', a: 'Thursday' },
        ] },
    ],
  },
  {
    title: 'Section 4 — Lecture: The Life of Bees',
    blurb: 'A lecture on how honeybee colonies are organised.',
    script:
      "In today's lecture we'll look at the remarkable social organisation of the honeybee. " +
      "A single colony can contain up to sixty thousand bees, all working together as one unit. " +
      "There are three types of bee in the colony. The queen is the only female that lays eggs, and she can live for several years. " +
      "The workers, all female, do almost everything else: they clean the hive, feed the young, and collect food. " +
      "The males, called drones, have just one role, which is to mate with a new queen. " +
      "Worker bees communicate the location of food through a movement known as the waggle dance. " +
      "By dancing in a particular direction and for a particular length of time, a bee can tell others exactly where flowers can be found. " +
      "Bees collect two main things from flowers: nectar, which they turn into honey, and pollen, which provides protein. " +
      "A colony must store enough honey to survive the winter, when few flowers are available. " +
      "Sadly, in recent decades bee numbers have fallen, partly due to a parasite called the varroa mite, " +
      "as well as the loss of wildflowers and the use of certain pesticides. Protecting bees, as we'll see, matters far beyond the hive.",
    groups: [
      { instr: 'Questions 31–40 — Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 31, text: 'A colony can contain up to ______ bees.', a: 'sixty thousand' },
          { n: 32, text: 'The only bee that lays eggs is the ______.', a: 'queen' },
          { n: 33, text: 'Worker bees are all ______.', a: 'female' },
          { n: 34, text: 'Male bees are called ______.', a: 'drones' },
          { n: 35, text: "A drone's only role is to ______ with a new queen.", a: 'mate' },
          { n: 36, text: 'Bees share the location of food using the waggle ______.', a: 'dance' },
          { n: 37, text: 'Nectar is turned into ______.', a: 'honey' },
          { n: 38, text: 'Pollen provides ______ for the bees.', a: 'protein' },
          { n: 39, text: 'Bees must store honey to survive the ______.', a: 'winter' },
          { n: 40, text: 'A parasite harming bees is the varroa ______.', a: 'mite' },
        ] },
    ],
  },
    ],
  },
];
