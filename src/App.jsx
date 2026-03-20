
import { useState } from "react";

const C = {
  N: "#3d5a80",
  S: "#8b5e3c",
  bg: "#f5f2eb",
  card: "#fffdf8",
  border: "#ddd8ce",
  muted: "#7a746a",
  ink: "#1a1713",
  err: "#c0392b",
};

const content = {
  zh: {
    tag: "MBTI · 认知维度诊断",
    heading: ["你如何处理", "信息", "？"],
    subtitle: (n) => `共 ${n} 题，无标准答案。请选择第一直觉更接近你的选项，不要过度分析。`,
    submit: "查看分析结果",
    restart: "重新测试",
    shareBtn: "分享结果",
    shareCopied: "链接已复制 ✓",
    errorLeft: (n) => `还有 ${n} 题未作答，请检查后提交`,
    yourResult: "YOUR RESULT",
    nLabel: "直觉型 N",
    sLabel: "感觉型 S",
    traitTitle: "逐维度拆解",
    analysisTitle: "综合解读",
    tie: "均衡",
    switchLang: "English",
    of: "/",
    verdicts: {
      strongN: ["N", "直觉型 · 偏向抽象与模式识别"],
      strongS: ["S", "感觉型 · 偏向具体与感官信息"],
      leanN: ["偏N", "倾向直觉型，但S倾向也明显"],
      leanS: ["偏S", "倾向感觉型，但N倾向也明显"],
      tie: ["N ≈ S", "真正的边界型 · 两种认知方式并行"],
    },
    analysis: {
      strongN: [
        { title: "信息加工方式", text: "你的结果显示出较为明确的直觉型（N）倾向。你在处理信息时，大脑倾向于快速跳离具体内容，转向模式、关联和可能性。你很可能在别人还在陈述细节时，你已经在想「这背后是什么」或「这让我联想到了什么」。" },
        { title: "你的认知优势", text: "快速建立概念之间的连接；对整体感和方向感比对步骤细节更敏感；善于在信息不完整时进行推断；对新想法和抽象概念有天然的舒适感。" },
        { title: "需要注意的地方", text: "你的S得分说明你并非完全脱离现实信息——你仍然有一定的细节捕捉能力。你可能在某些特定场合（比如熟悉的领域、或高度专注时）会表现出更接近S的行为模式，但这更多是后天适应，而非你的自然认知路径。" },
      ],
      strongS: [
        { title: "信息加工方式", text: "你的结果显示出较为明确的感觉型（S）倾向。你在处理信息时，大脑更倾向于停留在具体的、可感知的、当下存在的事物上。你对现实的感知是细致且准确的，你的记忆往往也是画面式或事件式的。" },
        { title: "你的认知优势", text: "信息准确度高，不容易被模糊的表述带跑；对具体经验的积累和调用非常有效；执行力强，能脚踏实地推进步骤；对现实状况的判断比较靠谱。" },
        { title: "需要注意的地方", text: "你的N得分说明你并不是僵化的信息处理者——你也有抽象联想的能力，只是它不是你的第一反应。在感兴趣的话题上，你也可能展现出更多N的特征，这很正常，但整体认知倾向仍偏S。" },
      ],
      lean: (lean, leanOther, n, s) => [
        { title: `你处于偏${lean}的混合区间`, text: `你的N/S分布（N:${n} / S:${s}）说明你有主要倾向，但另一极也相当活跃。这很可能意味着你的认知方式受情境影响较大，在某类任务或话题中偏${lean}，在另一些情境中会切换到偏${leanOther}的模式。` },
        { title: "可能的原因", text: "这种模式可以来自后天训练（比如长期从事需要精确细节的工作，但天生更偏N）；也可能是你对MBTI题目有一定元认知，会在答题时纠正自己的第一反应。如果你答题时有犹豫，那个犹豫本身也是一种信息。" },
        { title: "建议", text: "观察自己在完全不费力的状态下的行为——比如放空时脑子里在想什么、听别人讲话时第一秒的反应是什么——那往往比刻意答题更能暴露你的真实认知底色。" },
      ],
      tie: [
        { title: "你是真正的边界型", text: "这个结果并不代表测试没用，而恰恰说明你是真正意义上的N/S边界型。你的大脑在具体和抽象之间具备相当的灵活性，两套信息加工路径都是你可以调用的工具。" },
        { title: "边界型的特征", text: "你可能会在对话中既能跟上抽象讨论，又不会对细节感到排斥；你的思维既能向上推演（这代表什么），也能向下落实（具体是什么情况）。这并不是哪个都不像，而是两个都像。" },
        { title: "下一步建议", text: "对于边界型来说，比起硬判N或S，更有价值的问题是：在什么场合你更喜欢用哪种方式？哪种情境让你感到更有能量？能量高的那一端，往往才是你更偏向的认知方式。" },
      ],
    },
    dimensions: [
      { label: "联想 vs 细节锚定", descN: "思维更易向外延展联想", descS: "思维更倾向停留在具体锚点" },
      { label: "框架优先 vs 步骤优先", descN: "先搭整体，再填细节", descS: "先确认步骤，再推进行动" },
      { label: "模糊容忍度", descN: "能接受信息的不完整性", descS: "倾向于获取准确完整的信息" },
      { label: "注意焦点", descN: "注意力落在整体印象", descS: "注意力落在具体事物" },
      { label: "记忆检索方式", descN: "用逻辑脉络重建记忆", descS: "用画面事件直接提取记忆" },
      { label: "错误感知层次", descN: "更关注逻辑假设层的错误", descS: "更关注事实细节层的偏差" },
    ],
  },
  en: {
    tag: "MBTI · Cognitive Dimension Test",
    heading: ["How do you process", " information", "?"],
    subtitle: (n) => `${n} questions. No right or wrong answers. Go with your first instinct — don't overthink.`,
    submit: "See My Result",
    restart: "Retake Test",
    shareBtn: "Share Result",
    shareCopied: "Link copied ✓",
    errorLeft: (n) => `${n} question${n > 1 ? "s" : ""} left unanswered`,
    yourResult: "YOUR RESULT",
    nLabel: "Intuitive (N)",
    sLabel: "Sensing (S)",
    traitTitle: "Dimension Breakdown",
    analysisTitle: "Full Analysis",
    tie: "Balanced",
    switchLang: "中文",
    of: "/",
    verdicts: {
      strongN: ["N", "Intuitive · Abstract & Pattern-oriented"],
      strongS: ["S", "Sensing · Concrete & Detail-oriented"],
      leanN: ["Lean N", "Intuitive tendency, but S is also present"],
      leanS: ["Lean S", "Sensing tendency, but N is also present"],
      tie: ["N ≈ S", "True border type · Both modes run in parallel"],
    },
    analysis: {
      strongN: [
        { title: "How You Process Information", text: "Your results show a clear Intuitive (N) tendency. When taking in information, your mind tends to quickly move away from concrete details toward patterns, connections, and possibilities. You likely find yourself thinking about what something means or what it reminds you of before others have even finished describing the facts." },
        { title: "Your Cognitive Strengths", text: "You quickly connect concepts across domains; you're more attuned to the big picture and direction than to step-by-step procedures; you're comfortable drawing inferences from incomplete information; and you have a natural ease with abstract ideas and new frameworks." },
        { title: "Things to Be Aware Of", text: "Your S score shows you're not disconnected from concrete reality — you still pick up on details when you need to. In familiar domains or when highly focused, you may behave more like an S type, but this is likely a learned adaptation rather than your default cognitive mode." },
      ],
      strongS: [
        { title: "How You Process Information", text: "Your results show a clear Sensing (S) tendency. When taking in information, your mind tends to stay with what is concrete, perceivable, and present. Your perception of reality is precise and grounded, and your memory tends to be vivid and event-based." },
        { title: "Your Cognitive Strengths", text: "High accuracy in processing information; you're not easily swayed by vague or abstract framing; you effectively accumulate and recall specific experiences; you're action-oriented and reliable in execution; and your read on practical situations tends to be sound." },
        { title: "Things to Be Aware Of", text: "Your N score shows you're not a rigid processor — you do have the capacity for abstract thinking, it just isn't your first move. On topics you care deeply about, you may show more N-like traits, which is normal, but your overall cognitive default remains S." },
      ],
      lean: (lean, leanOther, n, s) => [
        { title: `You're in the Lean-${lean} Zone`, text: `Your N/S distribution (N:${n} / S:${s}) shows a primary tendency, but the other pole is quite active too. This likely means your cognitive style is context-sensitive — you lean ${lean} in some tasks and situations, and shift toward ${leanOther} in others.` },
        { title: "Why This Might Be", text: "This pattern can come from learned adaptation (e.g., years of detail-focused work on top of a naturally N-leaning mind), or from metacognitive awareness of MBTI — meaning you may be second-guessing your first instincts as you answer. If you hesitated on several questions, that hesitation is itself data." },
        { title: "A Suggestion", text: "Pay attention to your behavior in zero-effort mode — what your mind drifts to when you're spacing out, or what your very first reaction is when someone tells you something. That tends to reveal your true cognitive default more accurately than deliberate test-taking." },
      ],
      tie: [
        { title: "You're a Genuine Border Type", text: "A tied result doesn't mean the test failed — it means you're a true N/S border type. Your mind has significant flexibility between concrete and abstract processing, and you can genuinely access both modes as tools." },
        { title: "What This Looks Like", text: "You can follow abstract discussions without getting lost, and you don't tune out when things get specific. Your thinking can move upward (what does this mean?) and downward (what exactly is happening here?). This isn't 'neither' — it's both." },
        { title: "What to Do With This", text: "Rather than forcing a verdict of N or S, the more useful question is: in which contexts do you prefer which mode? Which one leaves you feeling more energized? The side that gives you energy is usually your natural lean." },
      ],
    },
    dimensions: [
      { label: "Association vs. Detail Anchoring", descN: "Mind readily extends outward to connections", descS: "Mind tends to stay anchored to concrete specifics" },
      { label: "Framework-first vs. Step-first", descN: "Builds the big picture before filling in details", descS: "Confirms each step before moving forward" },
      { label: "Ambiguity Tolerance", descN: "Comfortable with incomplete information", descS: "Prefers accurate and complete information" },
      { label: "Attentional Focus", descN: "Attention falls on overall impression", descS: "Attention falls on specific concrete elements" },
      { label: "Memory Retrieval Style", descN: "Reconstructs memory via logic and context", descS: "Retrieves memory via images and specific events" },
      { label: "Error Detection Layer", descN: "Notices logical or assumption-level errors", descS: "Notices factual or detail-level inaccuracies" },
    ],
  },
};

const questions = {
  zh: [
    { id: 1,  text: "你在一个陌生城市，需要去一个没去过的地方，你更倾向于：", options: [{ text: "提前看地图，记住几个关键路口和大概方向，到了再随机应变", type: "N" }, { text: "把导航每一步的指示都看清楚，按提示一步步走", type: "S" }] },
    { id: 2,  text: "你在读一篇文章，读到一半发现有个地方没太看懂，你通常会：", options: [{ text: "停下来，往前翻，把那段重新读懂再继续", type: "S" }, { text: "先往下读，看后面的内容能不能帮你把前面的补上", type: "N" }] },
    { id: 3,  text: "朋友跟你讲了一件最近发生的事，听完之后，你脑子里第一个冒出来的是：", options: [{ text: "他讲的某个具体细节——某句话、某个场景、某个人的反应", type: "S" }, { text: "这件事让你联想到的另一件事、某个规律、或某个更大的问题", type: "N" }] },
    { id: 4,  text: "你去一家第一次来的餐厅，落座之后你最先注意到的是：", options: [{ text: "整体氛围——这个地方给你的感觉，它大概是什么风格、面向什么人", type: "N" }, { text: "具体的东西——灯光亮不亮、邻桌点了什么、服务员的态度、菜单的设计", type: "S" }] },
    { id: 5,  text: "你学了一项新技能，感觉已经差不多会了，你判断自己会了的依据通常是：", options: [{ text: "我能把整个逻辑讲清楚，知道为什么这么做", type: "N" }, { text: "我能稳定地完成具体操作，做出来的结果是对的", type: "S" }] },
    { id: 6,  text: "你连续做了一个小时重复性的工作（比如录数据、整理文件），你的脑子通常在：", options: [{ text: "飘——我会想别的事，偶尔才把注意力拉回来", type: "N" }, { text: "在手头的事上——我会注意到每个条目之间的细微差别", type: "S" }] },
    { id: 7,  text: "有人问你上周四你在做什么，你回想的方式通常是：", options: [{ text: "直接去找那天的画面或某件具体的事", type: "S" }, { text: "从那段时间我大概在忙什么出发，反推那天应该在做什么", type: "N" }] },
    { id: 8,  text: "你在看一部电影，看到一半你突然走神了，走神时你脑子里在想的，更可能是：", options: [{ text: "刚才那个镜头、某句台词、演员的表情", type: "S" }, { text: "这个故事让你联想到的某件事、某个人、或某个问题", type: "N" }] },
    { id: 9,  text: "你向别人解释一件你熟悉的事情，你更自然的方式是：", options: [{ text: "从一个具体的例子或场景开始讲，然后再说一般规律", type: "S" }, { text: "先说整体框架或核心逻辑，再用例子来补充说明", type: "N" }] },
    { id: 10, text: "你在评价一本书或一部电影时，你更自然地会说：", options: [{ text: "这个故事让我想到…… / 它其实在讲的是……", type: "N" }, { text: "细节处理得很好 / 这个场景很真实 / 这个角色设计得很准", type: "S" }] },
    { id: 11, text: "你在和别人讨论一个你感兴趣的话题，你更享受哪种对话：", options: [{ text: "聊具体的案例、亲身经历、或你知道吗有一次……", type: "S" }, { text: "聊背后的原理、不同事物之间的联系、或这意味着什么", type: "N" }] },
    { id: 12, text: "你正在做一个重要决定（比如换工作、搬家），你脑子里运转的主要是：", options: [{ text: "各种具体的条件——薪资、距离、环境、时间点", type: "S" }, { text: "这个选择在整体上感觉对不对——方向感、长远的可能性", type: "N" }] },
    { id: 13, text: "有人说了一句话，你隐约觉得这话有点问题，你通常说的是：", options: [{ text: "他描述的某个事实或细节不对，和实际情况对不上", type: "S" }, { text: "他的逻辑有漏洞，或者有个没说出口的假设是错的", type: "N" }] },
    { id: 14, text: "你在心里快速完成这句话（选第一反应更顺的那个）：", options: [{ text: "这件事让我想起了……", type: "S" }, { text: "如果把这件事推到极端，它会变成……", type: "N" }] },
    { id: 15, text: "你在阅读时遇到一个不认识的词，你更可能：", options: [{ text: "停下来查，确认它准确的意思", type: "S" }, { text: "根据上下文猜个大概，继续往下读", type: "N" }] },
    { id: 16, text: "你在描述一次旅行经历，你更自然的说法是：", options: [{ text: "那个城市的感觉很特别，很难形容，就是一种……", type: "N" }, { text: "那边的食物、街道、人都很具体，比如有一次我们去了……", type: "S" }] },
    { id: 17, text: "你在做一件事时，发现有个步骤和之前的习惯不一样，你的第一反应是：", options: [{ text: "先把这个步骤做对，其他的再说", type: "S" }, { text: "想搞清楚为什么要这样做，逻辑上说不说得通", type: "N" }] },
    { id: 18, text: "你想象5年后的自己，脑子里浮现的画面更接近：", options: [{ text: "一种状态和方向感——在做有意义的事，但具体细节不太清晰", type: "N" }, { text: "比较具体的场景——住在哪、做什么工作、生活节奏大概是什么样", type: "S" }] },
    { id: 19, text: "两个人在争论一件事，你在旁边听着，你更先注意到的是：", options: [{ text: "他们说的某个具体事实对不对、有没有信息错误", type: "S" }, { text: "他们各自的逻辑结构、论点之间有没有矛盾", type: "N" }] },
    { id: 20, text: "你在计划一件事（比如旅行、活动），你的自然状态是：", options: [{ text: "先想清楚整体方向和大致框架，细节到时候再说", type: "N" }, { text: "尽量把每个环节都想清楚，不确定的地方让我不太安心", type: "S" }] },
  ],
  en: [
    { id: 1,  text: "You're in an unfamiliar city and need to get somewhere you've never been. You're more likely to:", options: [{ text: "Check the map beforehand, remember a few key landmarks and the general direction, then figure it out as you go", type: "N" }, { text: "Follow the navigation turn by turn, making sure you don't miss any instruction", type: "S" }] },
    { id: 2,  text: "You're reading an article and hit a part you don't quite understand. You usually:", options: [{ text: "Stop, scroll back, and re-read that section until it makes sense before continuing", type: "S" }, { text: "Keep reading and see if what comes next helps clarify what you missed", type: "N" }] },
    { id: 3,  text: "A friend tells you about something that happened recently. The first thing that comes to mind is:", options: [{ text: "A specific detail from what they said — a phrase, a scene, someone's reaction", type: "S" }, { text: "Something else it reminds you of, a pattern you notice, or a bigger question it raises", type: "N" }] },
    { id: 4,  text: "You walk into a restaurant you've never been to before. What do you notice first?", options: [{ text: "The overall vibe — what kind of place this feels like, what crowd it seems to attract", type: "N" }, { text: "Specific things — how bright the lights are, what the table next to you ordered, how the staff behaves", type: "S" }] },
    { id: 5,  text: "You've been learning a new skill and feel like you've mostly got it. How do you know you've got it?", options: [{ text: "I can explain the whole logic behind it and articulate why it works the way it does", type: "N" }, { text: "I can consistently execute the steps and get the right output", type: "S" }] },
    { id: 6,  text: "You've been doing repetitive work for an hour (like data entry or sorting files). Your mind is usually:", options: [{ text: "Drifting — thinking about other things, occasionally snapping back to the task", type: "N" }, { text: "On the task — noticing small differences between items as you go", type: "S" }] },
    { id: 7,  text: "Someone asks what you were doing last Thursday. How do you remember?", options: [{ text: "I try to directly recall an image or a specific thing that happened that day", type: "S" }, { text: "I start from what I was generally busy with that week and work backward to that day", type: "N" }] },
    { id: 8,  text: "You're watching a movie and your mind wanders halfway through. What are you most likely thinking about?", options: [{ text: "A shot you just saw, a line of dialogue, an actor's expression", type: "S" }, { text: "Something the story reminded you of, someone it made you think of, or a question it raised", type: "N" }] },
    { id: 9,  text: "You're explaining something you know well to someone else. Your more natural approach is:", options: [{ text: "Start with a concrete example or scenario, then get to the general rule", type: "S" }, { text: "Start with the overall framework or core logic, then use examples to back it up", type: "N" }] },
    { id: 10, text: "When reviewing a book or film, you're more naturally inclined to say:", options: [{ text: "\"This story made me think of...\" / \"What it's really about is...\"", type: "N" }, { text: "\"The details were really well done\" / \"That scene felt so real\" / \"The character was spot on\"", type: "S" }] },
    { id: 11, text: "You're discussing a topic you care about. Which kind of conversation do you enjoy more?", options: [{ text: "Swapping specific experiences and stories — \"You know, one time I...\"", type: "S" }, { text: "Exploring underlying principles, connections between ideas, or \"what this all means\"", type: "N" }] },
    { id: 12, text: "You're making an important decision (like changing jobs or moving). What's mainly running through your head?", options: [{ text: "The concrete factors — salary, distance, environment, timing", type: "S" }, { text: "Whether the choice \"feels right\" overall — the direction, the long-term possibilities", type: "N" }] },
    { id: 13, text: "Someone says something and you sense something's off. What you usually mean is:", options: [{ text: "A specific fact or detail they stated doesn't match reality", type: "S" }, { text: "Their logic has a gap, or there's an unstated assumption that's wrong", type: "N" }] },
    { id: 14, text: "Quickly complete this sentence in your head — pick whichever comes more naturally:", options: [{ text: "\"This reminds me of...\"", type: "S" }, { text: "\"If you take this to its logical extreme, it becomes...\"", type: "N" }] },
    { id: 15, text: "You come across a word you don't know while reading. You're more likely to:", options: [{ text: "Stop and look it up to get the precise meaning", type: "S" }, { text: "Infer the general meaning from context and keep going", type: "N" }] },
    { id: 16, text: "You're describing a trip you took. Your more natural way of talking about it is:", options: [{ text: "\"The city had this feeling that's hard to describe — it was just kind of...\"", type: "N" }, { text: "\"The food, the streets, the people — it was all very vivid. Like one time we went to...\"", type: "S" }] },
    { id: 17, text: "You're doing something and notice a step that's different from how you usually do it. Your first reaction is:", options: [{ text: "Just do the step correctly and move on", type: "S" }, { text: "Figure out why it's done this way and whether it actually makes sense", type: "N" }] },
    { id: 18, text: "You imagine yourself five years from now. The image in your head is closer to:", options: [{ text: "A sense of direction and meaning — doing something that matters, details unclear", type: "N" }, { text: "A fairly specific scene — where you live, what you do, what your daily rhythm looks like", type: "S" }] },
    { id: 19, text: "Two people are arguing about something and you're listening in. What do you notice first?", options: [{ text: "Whether the specific facts they're citing are accurate", type: "S" }, { text: "Whether their arguments are logically consistent and whether there are any contradictions", type: "N" }] },
    { id: 20, text: "You're planning something (a trip, an event). Your natural mode is:", options: [{ text: "Get the overall direction and rough structure sorted, sort out details later", type: "N" }, { text: "Think through every part as thoroughly as possible — loose ends make me uneasy", type: "S" }] },
  ],
};

const dimQIds = [[3, 11], [1, 9], [2, 8], [4, 6], [7, 18], [13, 19]];

function buildResult(answers, lang) {
  const qs = questions[lang];
  let nScore = 0, sScore = 0;
  qs.forEach(q => { answers[q.id] === "N" ? nScore++ : sScore++; });
  const total = nScore + sScore;
  const nPct = Math.round((nScore / total) * 100);
  const sPct = 100 - nPct;
  const t = content[lang];

  let verdictKey, verdict, verdictSub, analysis;
  if (nScore >= 15) { verdictKey = "strongN"; [verdict, verdictSub] = t.verdicts.strongN; analysis = t.analysis.strongN; }
  else if (sScore >= 15) { verdictKey = "strongS"; [verdict, verdictSub] = t.verdicts.strongS; analysis = t.analysis.strongS; }
  else if (nScore === sScore) { verdictKey = "tie"; [verdict, verdictSub] = t.verdicts.tie; analysis = t.analysis.tie; }
  else if (nScore > sScore) { verdictKey = "leanN"; [verdict, verdictSub] = t.verdicts.leanN; analysis = t.analysis.lean("N", "S", nScore, sScore); }
  else { verdictKey = "leanS"; [verdict, verdictSub] = t.verdicts.leanS; analysis = t.analysis.lean("S", "N", nScore, sScore); }

  const traits = dimQIds.map((ids, i) => {
    let n = 0, s = 0;
    ids.forEach(id => { answers[id] === "N" ? n++ : s++; });
    const tie = n === s, isN = n > s;
    const dim = t.dimensions[i];
    return {
      label: dim.label,
      tag: tie ? t.tie : (isN ? "N" : "S"),
      color: tie ? C.muted : (isN ? C.N : C.S),
      desc: tie ? (lang === "zh" ? "两种倾向均有体现" : "Both tendencies present") : (isN ? dim.descN : dim.descS),
      pct: tie ? 50 : (isN ? Math.round(n / (n + s) * 100) : Math.round(s / (n + s) * 100)),
    };
  });

  return { verdict, verdictColor: verdictKey === "strongN" || verdictKey === "leanN" ? C.N : verdictKey === "tie" ? C.ink : C.S, verdictSub, analysis, nScore, sScore, nPct, sPct, traits };
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const t = content[lang];
  const qs = questions[lang];
  const answered = Object.keys(answers).length;
  const total = qs.length;
  const pct = Math.round((answered / total) * 100);

  function switchLang() {
    setLang(l => l === "zh" ? "en" : "zh");
    setError("");
  }

  function select(qId, type) {
    setAnswers(prev => ({ ...prev, [qId]: type }));
    setError("");
  }

  function handleSubmit() {
    const missing = qs.filter(q => !answers[q.id]);
    if (missing.length > 0) {
      setError(t.errorLeft(missing.length));
      const el = document.getElementById(`q-${missing[0].id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const r = buildResult(answers, lang);
    setResult(r);
    setSubmitted(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  function restart() {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setError("");
    setCopied(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  function share() {
    const text = lang === "zh"
      ? `我在 MBTI N/S 认知维度测试中的结果是【${result.verdict}】(N:${result.nScore} / S:${result.sScore})，来测测你自己 → ${window.location.href}`
      : `My MBTI N/S result is [${result.verdict}] (N:${result.nScore} / S:${result.sScore}) — take the test yourself → ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: "MBTI N/S Test", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  }

  const mono = { fontFamily: "Courier New, monospace" };
  const serif = { fontFamily: "Georgia, 'Songti SC', SimSun, serif" };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "40px 20px 80px", ...serif, color: C.ink }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Lang toggle */}
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <button onClick={switchLang} style={{ ...mono, fontSize: 11, color: C.muted, background: "transparent", border: `1px solid ${C.border}`, padding: "4px 12px", cursor: "pointer", letterSpacing: 1 }}>
            {t.switchLang}
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", ...mono, fontSize: 10, letterSpacing: 3, color: C.muted, border: `1px solid ${C.border}`, padding: "4px 14px", marginBottom: 20 }}>
                {t.tag}
              </div>
              <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 300, letterSpacing: -0.5, lineHeight: 1.3, margin: "0 0 12px" }}>
                {t.heading[0]}<strong>{t.heading[1]}</strong>{t.heading[2]}
              </h1>
              <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
                {t.subtitle(total)}
              </p>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: C.ink, width: pct + "%", transition: "width 0.4s ease" }} />
              </div>
              <span style={{ ...mono, fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>
                {answered} {t.of} {total}
              </span>
            </div>

            {/* Questions */}
            {qs.map((q) => (
              <div key={q.id} id={`q-${q.id}`} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "28px 32px", marginBottom: 14 }}>
                <div style={{ ...mono, fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 12 }}>
                  Q{String(q.id).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.8, marginBottom: q.note ? 10 : 20 }}>{q.text}</div>
                {q.note && <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 18, lineHeight: 1.6 }}>{q.note}</div>}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.options.map((opt, oi) => {
                    const sel = answers[q.id] === opt.type;
                    const selColor = opt.type === "N" ? C.N : C.S;
                    return (
                      <div key={oi} onClick={() => select(q.id, opt.type)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "13px 16px", border: `1px solid ${sel ? selColor : C.border}`, background: sel ? (opt.type === "N" ? "#3d5a8015" : "#8b5e3c15") : "transparent", cursor: "pointer", transition: "all 0.18s" }}>
                        <span style={{ ...mono, fontSize: 11, color: sel ? selColor : C.muted, minWidth: 16, paddingTop: 1 }}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span style={{ fontSize: 14, lineHeight: 1.65 }}>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Submit */}
            {answered > 0 && (
              <div style={{ textAlign: "center", marginTop: 36 }}>
                {error && <div style={{ fontSize: 12, color: C.err, fontStyle: "italic", marginBottom: 12 }}>{error}</div>}
                <button onClick={handleSubmit} style={{ ...serif, fontSize: 15, color: C.card, background: C.ink, border: "none", padding: "14px 52px", cursor: "pointer", letterSpacing: 1 }}>
                  {t.submit}
                </button>
              </div>
            )}
          </>
        ) : result && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: "44px 36px" }}>

            {/* Verdict */}
            <div style={{ textAlign: "center", marginBottom: 36, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ ...mono, fontSize: 10, letterSpacing: 3, color: C.muted, marginBottom: 14 }}>{t.yourResult}</div>
              <div style={{ fontSize: "clamp(52px,12vw,80px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1, color: result.verdictColor, marginBottom: 10 }}>
                {result.verdict}
              </div>
              <div style={{ fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 20 }}>{result.verdictSub}</div>
              {/* Share button */}
              <button onClick={share} style={{ ...mono, fontSize: 11, color: C.muted, background: "transparent", border: `1px solid ${C.border}`, padding: "6px 18px", cursor: "pointer", letterSpacing: 1 }}>
                {copied ? t.shareCopied : t.shareBtn}
              </button>
            </div>

            {/* Score bar */}
            <div style={{ marginBottom: 36, padding: "0 4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginBottom: 8 }}>
                <span>{t.nLabel}</span><span>{t.sLabel}</span>
              </div>
              <div style={{ height: 6, background: "#e8e3db", borderRadius: 3, display: "flex", overflow: "hidden" }}>
                <div style={{ width: result.nPct + "%", background: C.N, borderRadius: 3 }} />
                <div style={{ width: result.sPct + "%", background: C.S, borderRadius: "0 3px 3px 0" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", ...mono, fontSize: 12, marginTop: 8 }}>
                <span style={{ color: C.N }}>N: {result.nScore}/{total} = {result.nPct}%</span>
                <span style={{ color: C.S }}>S: {result.sScore}/{total} = {result.sPct}%</span>
              </div>
            </div>

            {/* Traits */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ ...mono, fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                · {t.traitTitle} ·
              </div>
              {result.traits.map((tr, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < result.traits.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{tr.label}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{tr.desc}</div>
                  </div>
                  <div style={{ width: 80, height: 4, background: "#e8e3db", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                    <div style={{ width: tr.pct + "%", height: "100%", background: tr.color, borderRadius: 2 }} />
                  </div>
                  <div style={{ ...mono, fontSize: 11, padding: "2px 8px", background: tr.color + "20", color: tr.color, minWidth: 36, textAlign: "center", flexShrink: 0 }}>
                    {tr.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Analysis */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ ...mono, fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 20, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
                · {t.analysisTitle} ·
              </div>
              {result.analysis.map((a, i) => (
                <div key={i} style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 7 }}>{a.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.85, color: "#444" }}>{a.text}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={restart} style={{ ...serif, fontSize: 13, color: C.muted, background: "transparent", border: `1px solid ${C.border}`, padding: "10px 28px", cursor: "pointer", letterSpacing: 1 }}>
                {t.restart}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
