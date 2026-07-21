/* Full IELTS Academic Reading test data — 3 passages, 40 questions.
   Question types: tfng, yynn, mcq, gap (ONE/TWO words), match, heading. */
window.READING_TEST = [
  {
    title: 'The Rise of Urban Beekeeping',
    intro: 'You should spend about 20 minutes on Questions 1–13.',
    paras: [
      ['A', "In cities across the world, an unexpected form of agriculture is taking root — not in fields, but on rooftops, balconies and in community gardens. Urban beekeeping, once a niche hobby, has grown into a genuine movement. In London alone, the number of registered hives more than tripled between 2008 and 2018, and similar surges have been recorded in Paris, New York and Tokyo."],
      ['B', "The appeal is easy to understand. Bees are vital pollinators, responsible for a large share of the fruits and vegetables that reach our tables. As populations of wild bees have declined in many rural areas — largely due to pesticide use and the loss of wildflower habitats — cities have, somewhat surprisingly, become havens. Urban parks and gardens offer a remarkably diverse range of flowering plants, and because domestic gardeners rarely spray industrial pesticides, city bees are often exposed to fewer toxins than their countryside cousins."],
      ['C', "Research supports this picture. A study conducted by ecologists found that honey produced in several major cities contained a wider variety of pollen types than honey from surrounding farmland, suggesting a richer and more varied food supply. City bees also benefit from the 'urban heat island' effect, in which buildings and paved surfaces trap warmth, extending the flowering season by several weeks compared with the open countryside."],
      ['D', "Yet the boom has not been without controversy. Some conservationists warn that placing too many honeybee hives in a small area can create competition for nectar, potentially harming wild bees and other pollinating insects that are already under pressure. They argue that the enthusiasm for keeping honeybees — a managed, domesticated species — should not be confused with genuine biodiversity conservation. Planting more flowers, they suggest, does more good than adding more hives."],
      ['E', "Training is another concern. Beekeeping requires knowledge and commitment; a poorly managed hive can spread disease to others nearby. In response, many cities have introduced courses and mentoring schemes, pairing newcomers with experienced keepers. Some municipalities now require registration of hives so that outbreaks of disease can be tracked and contained quickly."],
      ['F', "Despite these challenges, the wider benefits are hard to ignore. Beyond honey, urban beekeeping reconnects city dwellers with the natural world and raises awareness of the fragile systems that underpin our food supply. Schools use hives as living classrooms, and businesses install them on rooftops as part of environmental initiatives. For many participants, the reward is not the honey at all, but a renewed sense of responsibility toward the environment they share with millions of tiny, industrious neighbours."],
    ],
    groups: [
      { instr: 'Questions 1–5 — Do the statements agree with the information? Choose TRUE, FALSE or NOT GIVEN.', type: 'tfng',
        qs: [
          { n: 1, text: 'The number of registered hives in London increased significantly over a ten-year period.', a: 'TRUE' },
          { n: 2, text: 'City bees are often exposed to fewer pesticides than bees in the countryside.', a: 'TRUE' },
          { n: 3, text: 'Tokyo has more urban hives than any other city in the world.', a: 'NOT GIVEN' },
          { n: 4, text: 'The urban heat island effect shortens the flowering season in cities.', a: 'FALSE' },
          { n: 5, text: 'Some experts believe planting flowers is more helpful than adding hives.', a: 'TRUE' },
        ] },
      { instr: 'Questions 6–9 — Complete each sentence with ONE WORD ONLY from the passage.', type: 'gap',
        qs: [
          { n: 6, text: 'Bees are described as vital ______ for many fruits and vegetables.', a: 'pollinators' },
          { n: 7, text: 'City honey was found to contain a wider variety of ______ types.', a: 'pollen' },
          { n: 8, text: 'A poorly managed hive can spread ______ to other hives nearby.', a: 'disease' },
          { n: 9, text: 'Some municipalities require the ______ of hives to track outbreaks.', a: 'registration' },
        ] },
      { instr: 'Questions 10–13 — Which paragraph (A–F) contains the following information?', type: 'match', options: ['A','B','C','D','E','F'],
        qs: [
          { n: 10, text: 'A warning about competition between honeybees and wild insects.', a: 'D' },
          { n: 11, text: 'Examples of how schools and businesses use hives.', a: 'F' },
          { n: 12, text: 'Statistics showing the growth of urban beekeeping.', a: 'A' },
          { n: 13, text: 'Mentoring schemes that pair beginners with experienced keepers.', a: 'E' },
        ] },
    ],
  },

  {
    title: 'The Science of Sleep',
    intro: 'You should spend about 20 minutes on Questions 14–26.',
    paras: [
      ['A', "For most of human history, sleep was treated as a passive state — a nightly shutting-down of the body until dawn. Modern science tells a very different story. Far from switching off, the sleeping brain is intensely active, cycling through distinct stages that each serve a purpose. Understanding these stages has transformed our view of why we spend roughly a third of our lives asleep."],
      ['B', "A typical night consists of four to six cycles, each lasting about ninety minutes. Within each cycle the brain moves through light sleep, deep sleep and a phase known as REM, or rapid eye movement, during which most vivid dreaming occurs. Deep sleep dominates the earlier cycles of the night, whereas REM periods grow longer towards morning. This is why waking naturally in the early hours often interrupts a dream."],
      ['C', "Each stage appears to have a specialised role. Deep sleep is when the body carries out much of its physical repair: tissues are rebuilt, growth hormone is released and the immune system is strengthened. REM sleep, by contrast, is closely linked to the brain rather than the body. During REM, the day's experiences are processed and consolidated into long-term memory, and researchers believe this stage is essential for learning and emotional regulation."],
      ['D', "The consequences of insufficient sleep are far-reaching. In the short term, tiredness slows reaction times and impairs concentration, judgement and mood. Studies have repeatedly shown that people who have been awake for extended periods perform on cognitive tasks about as poorly as those who are mildly intoxicated. Over the long term, chronic sleep deprivation has been associated with a higher risk of heart disease, diabetes and weakened immunity."],
      ['E', "Modern life poses particular challenges to healthy sleep. Artificial light, and especially the blue light emitted by screens, can suppress melatonin, the hormone that signals to the body that it is time to rest. Irregular schedules, shift work and the pressure to be constantly available all conspire to shorten and fragment our nights. Sleep scientists argue that this widespread 'sleep debt' is one of the least recognised public health issues of our time."],
      ['F', "The good news is that sleep responds well to simple changes. Keeping a regular bedtime, reducing screen use in the evening, avoiding caffeine late in the day and ensuring a cool, dark bedroom can all improve sleep quality substantially. Rather than a luxury to be sacrificed, researchers increasingly describe good sleep as one of the most powerful and cost-free tools available for protecting long-term health."],
    ],
    groups: [
      { instr: 'Questions 14–18 — Do the statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.', type: 'yynn',
        qs: [
          { n: 14, text: 'The sleeping brain is largely inactive throughout the night.', a: 'NO' },
          { n: 15, text: 'REM periods become longer as the night progresses.', a: 'YES' },
          { n: 16, text: 'Deep sleep is more important than REM sleep for overall health.', a: 'NOT GIVEN' },
          { n: 17, text: 'Long periods without sleep can affect performance as much as alcohol.', a: 'YES' },
          { n: 18, text: 'Good sleep habits are described as an expensive way to improve health.', a: 'NO' },
        ] },
      { instr: 'Questions 19–22 — Complete the notes with NO MORE THAN TWO WORDS from the passage.', type: 'gap',
        qs: [
          { n: 19, text: 'Each sleep cycle lasts around ninety ______.', a: 'minutes' },
          { n: 20, text: 'During deep sleep, growth ______ is released.', a: 'hormone' },
          { n: 21, text: 'REM sleep helps process experiences into long-term ______.', a: 'memory' },
          { n: 22, text: 'Blue light from screens can suppress the hormone ______.', a: 'melatonin' },
        ] },
      { instr: 'Questions 23–26 — Which paragraph (A–F) contains the following information?', type: 'match', options: ['A','B','C','D','E','F'],
        qs: [
          { n: 23, text: 'Practical advice for sleeping better.', a: 'F' },
          { n: 24, text: 'A comparison between the roles of deep sleep and REM sleep.', a: 'C' },
          { n: 25, text: 'The idea that sleep was once seen as a passive state.', a: 'A' },
          { n: 26, text: 'A description of how modern life disrupts sleep.', a: 'E' },
        ] },
    ],
  },

  {
    title: 'The Return of the Wolf',
    intro: 'You should spend about 20 minutes on Questions 27–40.',
    paras: [
      ['A', "In 1995, after an absence of nearly seventy years, grey wolves were reintroduced to Yellowstone National Park in the United States. The decision was controversial: ranchers feared for their livestock, while conservationists argued that the park's ecosystem had been thrown out of balance by the predator's absence. What followed became one of the most closely studied experiments in ecology, and its results surprised almost everyone."],
      ['B', "With no wolves to keep them in check, the park's elk population had grown large and grazed freely, stripping young willow and aspen trees along rivers and valleys. As the wolves returned and began to hunt, elk numbers fell, but just as importantly, the behaviour of the surviving elk changed. They avoided the open valley floors where they were most vulnerable, allowing the vegetation there to recover for the first time in decades."],
      ['C', "The regrowth of trees set off a remarkable chain of effects that scientists call a 'trophic cascade'. Returning willows and aspens provided food and habitat for beavers, whose numbers rose from a single colony to nine within a few years. The dams built by beavers created ponds and wetlands, which in turn supported fish, amphibians and waterbirds. Songbirds returned to the recovering woodland, and the whole river valley grew richer in life."],
      ['D', "Perhaps most striking of all, the rivers themselves began to change. With stable vegetation holding the soil in place, riverbanks eroded less and channels became narrower and more fixed. In effect, the return of a single predator had helped to reshape the physical landscape of the park. The story is often cited as dramatic evidence of how deeply the removal or return of a top predator can affect an entire ecosystem."],
      ['E', "Not all scientists accept the simplest version of this narrative. Some caution that other factors — changing weather patterns, fluctuating numbers of bears and cougars, and the slow recovery of vegetation for reasons unrelated to wolves — also played a part. Ecosystems, they remind us, are complex, and it is tempting to credit a single dramatic cause for changes that in reality had many. The truth, they argue, is more tangled than the popular story suggests."],
      ['F', "Nevertheless, the Yellowstone experiment has had a lasting influence. It has strengthened the case for protecting and restoring top predators elsewhere, from lynx in Europe to sea otters along the Pacific coast. Whatever the precise mechanisms, few now dispute that predators are not simply a threat to be eliminated, but active architects of the living systems around them."],
    ],
    groups: [
      { instr: 'Questions 27–30 — Choose the correct letter, A, B or C.', type: 'mcq',
        qs: [
          { n: 27, text: 'Why was the reintroduction of wolves controversial?', a: 'B',
            options: ['A. The wolves were expensive to transport.', 'B. Ranchers were worried about their livestock.', 'C. Tourists objected to the plan.'] },
          { n: 28, text: 'How did the behaviour of surviving elk change?', a: 'C',
            options: ['A. They moved to higher ground permanently.', 'B. They began to eat different plants.', 'C. They avoided exposed valley floors.'] },
          { n: 29, text: 'What effect did the beavers have on the landscape?', a: 'A',
            options: ['A. Their dams created ponds and wetlands.', 'B. They reduced the number of fish.', 'C. They damaged the recovering willows.'] },
          { n: 30, text: 'What is the view of some scientists in paragraph E?', a: 'C',
            options: ['A. Wolves had no effect at all.', 'B. The changes happened faster than reported.', 'C. Other factors also contributed to the changes.'] },
        ] },
      { instr: 'Questions 31–35 — Do the statements agree with the passage? Choose TRUE, FALSE or NOT GIVEN.', type: 'tfng',
        qs: [
          { n: 31, text: 'Wolves had been absent from Yellowstone for about seventy years.', a: 'TRUE' },
          { n: 32, text: 'The number of beaver colonies increased after the wolves returned.', a: 'TRUE' },
          { n: 33, text: 'Riverbanks eroded more quickly once vegetation recovered.', a: 'FALSE' },
          { n: 34, text: 'The Yellowstone project cost more than similar projects in Europe.', a: 'NOT GIVEN' },
          { n: 35, text: 'The experiment has influenced conservation efforts in other places.', a: 'TRUE' },
        ] },
      { instr: 'Questions 36–40 — Complete the summary with ONE WORD ONLY from the passage.', type: 'gap',
        qs: [
          { n: 36, text: 'The chain of effects caused by the wolves is called a trophic ______.', a: 'cascade' },
          { n: 37, text: 'The recovery of willow and ______ trees benefited beavers.', a: 'aspen' },
          { n: 38, text: 'Beaver dams created ponds that supported fish, amphibians and ______.', a: 'waterbirds' },
          { n: 39, text: 'With stable vegetation, river ______ became narrower.', a: 'channels' },
          { n: 40, text: 'The passage describes predators as active ______ of ecosystems.', a: 'architects' },
        ] },
    ],
  },
];
