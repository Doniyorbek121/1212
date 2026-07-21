/* Full IELTS Listening test — 4 sections, 40 questions.
   Each section has an audio `script` (played via speech synthesis),
   a title and a list of question groups. */
window.LISTENING_TEST = [
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
        letters: true,
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
];
