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
  {
    name: 'Test 3 - Travel & Nature',
    sections: [
  {
    title: 'Section 1 - Booking a Coach Tour',
    blurb: 'A phone call to reserve places on a sightseeing tour.',
    script:
      "Good morning, Highland Coach Tours, how can I help you? Hello, I'd like to book a day tour please. " +
      "Certainly. Which tour are you interested in? The Lakes and Castles tour, if it's still available. " +
      "Yes, that one runs on Saturdays. Can I take your name? It's Emma Carter. C-A-R-T-E-R. " +
      "Thank you, Emma. How many people will be travelling? There'll be four of us in total. " +
      "Four passengers. The tour costs thirty-five pounds per adult, but there's a discount for groups of four or more, so it'll be thirty pounds each. " +
      "That's great. What time does it leave? The coach departs at eight fifteen sharp from the main square. " +
      "Please arrive ten minutes early. Is lunch included? Lunch isn't included, but there's a one-hour stop at a village with several cafes. " +
      "Do we need to bring anything? Just comfortable shoes and a waterproof jacket, as we'll do some walking. " +
      "And how do I pay? You can pay online, or in cash on the day. I'll pay on the day, thanks. " +
      "Perfect. I'll email you a confirmation. Could I take your email? Yes, it's emma, then the number seven, at mailbox dot com. " +
      "Got it. See you on Saturday!",
    groups: [
      { instr: 'Questions 1-6 - Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 1, text: 'Surname:', a: 'Carter' },
          { n: 2, text: 'Tour chosen: the Lakes and ______ tour', a: 'Castles' },
          { n: 3, text: 'Number of passengers:', a: 'four' },
          { n: 4, text: 'Price per adult with discount: £______', a: '30' },
          { n: 5, text: 'Departure time: ______ from the main square', a: '8.15' },
          { n: 6, text: 'Payment method chosen: ______', a: 'cash' },
        ] },
      { instr: 'Questions 7-10 - Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 7, text: 'The tour runs on', a: 'C', options: ['A. Fridays', 'B. Sundays', 'C. Saturdays'] },
          { n: 8, text: 'Passengers are asked to arrive', a: 'B', options: ['A. five minutes early', 'B. ten minutes early', 'C. fifteen minutes early'] },
          { n: 9, text: 'During the trip there is a one-hour stop for', a: 'A', options: ['A. lunch at a village', 'B. a guided museum tour', 'C. shopping'] },
          { n: 10, text: 'Passengers are advised to bring', a: 'C', options: ['A. a packed lunch', 'B. a camera', 'C. a waterproof jacket'] },
        ] },
    ],
  },
  {
    title: 'Section 2 - A Nature Reserve',
    blurb: 'A ranger describes a wildlife reserve to visitors.',
    script:
      "Welcome, everyone, to Willow Creek Nature Reserve. Let me explain the layout and a few rules before you set off. " +
      "From this visitor centre, the main trail leads straight ahead towards the lake. " +
      "To your left is the bird hide, a quiet shelter where you can watch water birds without disturbing them. " +
      "To your right you'll find the picnic area, next to the car park. " +
      "If you follow the trail past the lake, the butterfly garden is on the far side, behind the old mill. " +
      "The reserve is home to over one hundred species of bird, as well as deer, foxes and, if you're lucky, otters along the river. " +
      "A few important rules. Please keep dogs on a lead at all times, as they can frighten the wildlife. " +
      "Do not pick the flowers or feed the animals. And please take all your litter home with you. " +
      "The best time to see the most animals is early morning or just before sunset. " +
      "Guided walks leave from here every day at ten o'clock and last about ninety minutes. " +
      "Finally, the cafe in the visitor centre closes at four thirty, so do stop by before then. Enjoy your visit!",
    groups: [
      { instr: 'Questions 11-15 - Where is each place? Choose A-E.', type: 'match',
        options: ['A. straight ahead', 'B. to the left', 'C. to the right', 'D. behind the old mill', 'E. in the visitor centre'],
        qs: [
          { n: 11, text: 'The lake', a: 'A' },
          { n: 12, text: 'The bird hide', a: 'B' },
          { n: 13, text: 'The picnic area', a: 'C' },
          { n: 14, text: 'The butterfly garden', a: 'D' },
          { n: 15, text: 'The cafe', a: 'E' },
        ] },
      { instr: 'Questions 16-20 - Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 16, text: 'The reserve has over ______ species of bird.', a: 'one hundred' },
          { n: 17, text: 'Along the river you may see ______.', a: 'otters' },
          { n: 18, text: 'Dogs must be kept on a ______ at all times.', a: 'lead' },
          { n: 19, text: 'Guided walks leave every day at ______.', a: 'ten' },
          { n: 20, text: 'The cafe closes at ______.', a: '4.30' },
        ] },
    ],
  },
  {
    title: 'Section 3 - Planning a Field Trip',
    blurb: 'Two students discuss a geography field trip with their tutor.',
    script:
      "So, have you both decided where to go for your geography field trip? Yes, we're thinking of the river valley to study erosion. " +
      "Good topic. Why the river rather than the coast? Well, the coast is further away, and the river site is easier to reach by bus. " +
      "Sensible. What exactly will you measure? We'll measure the width and depth of the river at three different points. " +
      "And we'll record the speed of the water using a floating object and a stopwatch. Excellent method. " +
      "How will you present your results? We plan to draw cross-section diagrams and a couple of graphs. " +
      "Make sure your graphs have clear labels; that's where students often lose marks. Noted. " +
      "One safety point: rivers can be dangerous, so never work alone near the water, and always wear boots. " +
      "When are you planning to go? We were thinking of next Friday, if the weather is dry. " +
      "Check the forecast first; if it has rained heavily, the river will be too high and fast. Good idea. " +
      "And remember to hand in your risk assessment form before you go. We'll do that on Wednesday. Perfect.",
    groups: [
      { instr: 'Questions 21-25 - Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 21, text: 'The students chose the river site mainly because it is', a: 'B', options: ['A. more interesting', 'B. easier to reach', 'C. cheaper to visit'] },
          { n: 22, text: 'They will measure the river at', a: 'C', options: ['A. one point', 'B. two points', 'C. three points'] },
          { n: 23, text: 'To measure water speed they will use a floating object and a', a: 'A', options: ['A. stopwatch', 'B. ruler', 'C. camera'] },
          { n: 24, text: 'The tutor warns that students often lose marks on', a: 'B', options: ['A. their conclusions', 'B. graph labels', 'C. spelling'] },
          { n: 25, text: 'The trip depends on', a: 'C', options: ['A. transport being available', 'B. the tutor coming', 'C. the weather being dry'] },
        ] },
      { instr: 'Questions 26-30 - Complete the notes. Write ONE WORD OR A DATE.', type: 'gap',
        qs: [
          { n: 26, text: 'Topic of study: river ______', a: 'erosion' },
          { n: 27, text: 'They will measure the width and ______ of the river.', a: 'depth' },
          { n: 28, text: 'For safety, students must never work ______ near the water.', a: 'alone' },
          { n: 29, text: 'Everyone must wear ______.', a: 'boots' },
          { n: 30, text: 'The risk assessment form is due on ______.', a: 'Wednesday' },
        ] },
    ],
  },
  {
    title: 'Section 4 - Lecture: Volcanoes',
    blurb: 'A lecture on how volcanoes form and affect us.',
    script:
      "In today's lecture we'll explore volcanoes: how they form, why they erupt, and how they affect human life. " +
      "The Earth's surface is made up of enormous plates that slowly move. Most volcanoes form where two of these plates meet. " +
      "Beneath the surface lies molten rock called magma. When magma rises and reaches the surface, we call it lava. " +
      "Pressure from gases trapped in the magma is what causes an eruption. The more gas, the more explosive the eruption tends to be. " +
      "Volcanoes are often described using their shape. A tall, steep-sided volcano is called a stratovolcano, " +
      "while a broad, gently sloping one is known as a shield volcano. " +
      "Eruptions can be destructive, burying towns in ash and sending rivers of lava down the slopes. " +
      "Yet volcanoes also bring benefits. Volcanic soil is extremely fertile, which is why many people farm near them despite the risks. " +
      "They also provide geothermal energy, a clean source of power produced from the heat of the Earth. " +
      "Scientists who study volcanoes are called volcanologists, and they monitor warning signs such as small earthquakes and escaping gas. " +
      "Thanks to this monitoring, many communities can now be evacuated safely before a major eruption occurs.",
    groups: [
      { instr: 'Questions 31-40 - Complete the notes. Write NO MORE THAN TWO WORDS for each answer.', type: 'gap',
        qs: [
          { n: 31, text: "The Earth's surface is made of moving ______.", a: 'plates' },
          { n: 32, text: 'Molten rock below the surface is called ______.', a: 'magma' },
          { n: 33, text: 'When it reaches the surface it is called ______.', a: 'lava' },
          { n: 34, text: 'Eruptions are caused by pressure from ______.', a: 'gases' },
          { n: 35, text: 'A tall, steep volcano is a ______.', a: 'stratovolcano' },
          { n: 36, text: 'A broad, gently sloping volcano is a ______ volcano.', a: 'shield' },
          { n: 37, text: 'Volcanic ______ is very fertile for farming.', a: 'soil' },
          { n: 38, text: 'Volcanoes can provide ______ energy.', a: 'geothermal' },
          { n: 39, text: 'Scientists who study volcanoes are called ______.', a: 'volcanologists' },
          { n: 40, text: 'Warning signs include escaping gas and small ______.', a: 'earthquakes' },
        ] },
    ],
  },
    ],
  },
  {
    name: 'Test 4 - Services & Science',
    sections: [
  {
    title: 'Section 1 - Leisure Centre Membership',
    blurb: 'A phone call to join a local leisure centre.',
    script:
      "Good afternoon, Parkview Leisure Centre. Hello, I'd like to become a member please. " +
      "Of course. Can I take your full name? Yes, it's Daniel Foster. F-O-S-T-E-R. " +
      "Thank you, Daniel. And your date of birth? The fifth of March, nineteen ninety-eight. " +
      "Which membership would you like? We have off-peak and full membership. I'll take the off-peak one, please. " +
      "The off-peak membership is twenty-five pounds a month, and it lets you use the centre before five in the afternoon. " +
      "That's fine, I work evenings anyway. Which activities are you most interested in? Mainly swimming and the gym. " +
      "Great. The swimming pool is open from seven in the morning. Do note the pool is closed on Mondays for cleaning. " +
      "Good to know. Is there anything I need to bring? Yes, please bring a photo and proof of address to collect your card. " +
      "And there's a joining fee of ten pounds, payable once. No problem. When can I start? Your membership can begin tomorrow. " +
      "Perfect, thank you very much. You're welcome, see you tomorrow!",
    groups: [
      { instr: 'Questions 1-6 - Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 1, text: 'Surname:', a: 'Foster' },
          { n: 2, text: 'Membership type:', a: 'off-peak' },
          { n: 3, text: 'Monthly cost: £______', a: '25' },
          { n: 4, text: 'Main activities: swimming and the ______', a: 'gym' },
          { n: 5, text: 'The pool is closed on ______ for cleaning.', a: 'Mondays' },
          { n: 6, text: 'One-off joining fee: £______', a: '10' },
        ] },
      { instr: 'Questions 7-10 - Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 7, text: 'Off-peak members can use the centre', a: 'A', options: ['A. before 5pm', 'B. after 5pm', 'C. at any time'] },
          { n: 8, text: 'The swimming pool opens at', a: 'B', options: ['A. six in the morning', 'B. seven in the morning', 'C. eight in the morning'] },
          { n: 9, text: 'To collect the card, Daniel must bring a photo and', a: 'C', options: ['A. a bank card', 'B. a medical form', 'C. proof of address'] },
          { n: 10, text: "Daniel's membership can start", a: 'A', options: ['A. tomorrow', 'B. next week', 'C. immediately'] },
        ] },
    ],
  },
  {
    title: 'Section 2 - The City Aquarium',
    blurb: 'A staff member describes the layout of an aquarium.',
    script:
      "Welcome to the City Aquarium. Let me quickly explain where everything is before you explore. " +
      "As you pass through the entrance, the ticket desk is right in front of you. " +
      "To the left of the entrance is the gift shop, which you can also visit on your way out. " +
      "To the right is the cafe, where you can get drinks and snacks throughout the day. " +
      "The main attraction, the underwater tunnel with sharks and rays, is straight ahead at the end of the corridor. " +
      "Beyond the tunnel, in the far room, you'll find the tropical fish gallery, full of colourful reef species. " +
      "A few points to remember. Please do not tap on the glass, as it frightens the animals. " +
      "Photography is allowed, but without flash. Feeding times are the highlight of the day: the penguins are fed at eleven o'clock, " +
      "and the sharks at three in the afternoon. Guided talks take place near the main tank every hour. " +
      "The aquarium closes at five thirty, and the last entry is at four forty-five. We hope you enjoy your visit!",
    groups: [
      { instr: 'Questions 11-15 - Where is each place? Choose A-E.', type: 'match',
        options: ['A. in front of the entrance', 'B. to the left', 'C. to the right', 'D. straight ahead', 'E. in the far room'],
        qs: [
          { n: 11, text: 'Ticket desk', a: 'A' },
          { n: 12, text: 'Gift shop', a: 'B' },
          { n: 13, text: 'Cafe', a: 'C' },
          { n: 14, text: 'Underwater tunnel', a: 'D' },
          { n: 15, text: 'Tropical fish gallery', a: 'E' },
        ] },
      { instr: 'Questions 16-20 - Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 16, text: 'Visitors must not ______ on the glass.', a: 'tap' },
          { n: 17, text: 'Photography is allowed but without ______.', a: 'flash' },
          { n: 18, text: 'The penguins are fed at ______ o\'clock.', a: 'eleven' },
          { n: 19, text: 'The sharks are fed at ______ in the afternoon.', a: 'three' },
          { n: 20, text: 'The last entry is at ______.', a: '4.45' },
        ] },
    ],
  },
  {
    title: 'Section 3 - Discussing an Experiment',
    blurb: 'Two students plan a science experiment with their tutor.',
    script:
      "So, have you two decided on your biology experiment? Yes, we want to test how light affects plant growth. " +
      "Good idea. What's your plan exactly? We'll grow bean seedlings under different colours of light and measure their height. " +
      "How many plants will you use? We're using twelve plants, four for each colour: red, blue and white. " +
      "And how long will the experiment run? For three weeks, measuring the height every two days. " +
      "Sensible. What will you keep the same? We'll give every plant the same amount of water and the same soil. " +
      "Excellent, that's your controlled variable. One tip: measure at the same time each day for accuracy. Good point. " +
      "How will you present the data? We'll draw a line graph comparing the three colours. " +
      "Perfect. And don't forget to write down anything unexpected in a notebook as you go. We will. " +
      "When do you start? On Monday, once we've set up the lamps. And the report is due at the end of the month. " +
      "Right. Remember to include a clear conclusion linking back to your original question. Thanks, that's really helpful.",
    groups: [
      { instr: 'Questions 21-25 - Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 21, text: 'The experiment tests how light affects', a: 'B', options: ['A. soil quality', 'B. plant growth', 'C. water use'] },
          { n: 22, text: 'The students will use a total of', a: 'C', options: ['A. four plants', 'B. eight plants', 'C. twelve plants'] },
          { n: 23, text: 'The experiment will run for', a: 'C', options: ['A. one week', 'B. two weeks', 'C. three weeks'] },
          { n: 24, text: 'They will keep the water and the ______ the same.', a: 'A', options: ['A. soil', 'B. temperature', 'C. lamp'] },
          { n: 25, text: 'The tutor advises them to measure', a: 'B', options: ['A. every hour', 'B. at the same time each day', 'C. only at the end'] },
        ] },
      { instr: 'Questions 26-30 - Complete the notes. Write ONE WORD OR A NUMBER.', type: 'gap',
        qs: [
          { n: 26, text: 'They will grow bean ______.', a: 'seedlings' },
          { n: 27, text: 'Light colours used: red, blue and ______.', a: 'white' },
          { n: 28, text: 'They will measure the height every ______ days.', a: 'two' },
          { n: 29, text: 'The data will be shown on a line ______.', a: 'graph' },
          { n: 30, text: 'The experiment starts on ______.', a: 'Monday' },
        ] },
    ],
  },
  {
    title: 'Section 4 - Lecture: The Human Brain',
    blurb: 'A lecture on the basics of how the brain works.',
    script:
      "Today we'll look at the human brain, one of the most complex objects in the known universe. " +
      "The adult brain weighs about one and a half kilograms, yet it uses around twenty per cent of the body's energy. " +
      "It contains roughly eighty-six billion nerve cells, called neurons, which communicate using electrical and chemical signals. " +
      "The brain is divided into several regions. The largest part, the cerebrum, controls thought, memory and voluntary movement. " +
      "At the back sits the cerebellum, which is responsible for balance and coordination. " +
      "Deep inside, the hippocampus plays a key role in forming new memories. " +
      "One remarkable feature of the brain is its plasticity, its ability to change and rewire itself in response to experience. " +
      "This is why practising a skill physically alters the connections between neurons. " +
      "For many years, scientists believed the adult brain could not grow new cells, but we now know that some new neurons do form, particularly in the hippocampus. " +
      "Sleep is essential for the brain, as it helps to consolidate memories and clear out waste products. " +
      "Understanding the brain is not only fascinating in itself but also vital for treating conditions such as dementia.",
    groups: [
      { instr: 'Questions 31-40 - Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.', type: 'gap',
        qs: [
          { n: 31, text: 'The adult brain weighs about ______ kilograms.', a: 'one and a half' },
          { n: 32, text: 'The brain uses around ______ per cent of the body\'s energy.', a: 'twenty' },
          { n: 33, text: 'Nerve cells in the brain are called ______.', a: 'neurons' },
          { n: 34, text: 'The largest part of the brain is the ______.', a: 'cerebrum' },
          { n: 35, text: 'The ______ controls balance and coordination.', a: 'cerebellum' },
          { n: 36, text: 'The ______ helps form new memories.', a: 'hippocampus' },
          { n: 37, text: "The brain's ability to rewire itself is called ______.", a: 'plasticity' },
          { n: 38, text: 'Some new neurons form in the ______.', a: 'hippocampus' },
          { n: 39, text: 'Sleep helps to ______ memories.', a: 'consolidate' },
          { n: 40, text: 'Brain research is vital for treating conditions such as ______.', a: 'dementia' },
        ] },
    ],
  },
    ],
  },
];
