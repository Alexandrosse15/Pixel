---
title: "Craftomation 101 guide: your first routines, the classic mistakes, and the art of not letting your robots die"
seoTitle: "Craftomation 101: complete beginner's guide"
slug: "craftomation-101-guide"
category: "guides"
excerpt: "Where to start, how to think about a reusable routine, why your robot stops, and how to automate heat before anything else."
date: "2026-09-15"
author: "Alexandrosse"
readTime: "12 min"
image_color: "from-sky-950 via-slate-900 to-zinc-950"
coverImage: "/images/craftomation/screenshot-3.webp"
gameName: "Craftomation 101: Programming & Craft"
featured: false
---

Craftomation 101 has a rare quality: it does not lie to you. When something does not work, it is your program.

That is also what makes the first three hours frustrating. This guide exists to shorten them. Our [full review is here](/en/articles/craftomation-101-test) if you are still deciding.

![Craftomation 101, the routine editor](/images/craftomation/screenshot-3.webp)

## The rule that comes before all the others

Before you think about production, think about survival.

**Your robots consume fuel and your base needs heat.** A handsome harvesting system that stops because nobody is feeding the fire is not a system, it is decoration.

The first routine you should write, before the one that mines ore, before the one that crafts, is the one that **keeps the fire going**. It is less gratifying and it will stop you starting over.

The order I would suggest for the first hours:

1. A robot that feeds the fire continuously.
2. A robot that harvests the wood that feeds the fire.
3. Only then, material production.

Yes, your first two robots produce nothing. That is the price of stability.

## How to think about a routine

The beginner's mistake is writing one long program that does everything. It works, once, and then becomes impossible to fix.

**Write short and test immediately.** Three blocks, run, watch. The game shows you the robot executing your logic, so you see exactly where it breaks. Use that instead of rereading your code.

**Name your intentions.** A routine should do one thing, and its name should say which. Harvest wood. Deliver to fire. Build a robot. When they are separate you can reuse them; when they are mixed you rewrite them every time.

**And think about reuse from the start.** The game gives you functions, variables and arrays, and the studio says it itself: a useful program becomes the foundation for the next one. A good harvesting routine written cleanly in hour two will still serve you in hour twenty.

## The four reasons your robot stops

You will meet all four, in order.

**It is out of fuel.** The most frequent, and the most foolish. Build refuelling into the routine rather than relying on yourself to remember.

**It is waiting for something that never comes.** A robot told to deliver somewhere that no longer exists, or to collect a resource nobody produces, simply stands there. Check the whole chain, not only the link you care about.

**It is executing exactly what you wrote.** The most galling one. Reread the order of the blocks: in a program, doing the right things in the wrong order amounts to doing the wrong things.

**Or it is physically stuck.** The planet has terrain, volcanoes and buildings. A routine that is perfect on paper can send a robot into a dead end.

![Craftomation 101, the robots and the fire](/images/craftomation/screenshot-2.webp)

## Growing the crew without breaking everything

The game's progression rests on a simple idea: robots that build robots.

The trap is growing too fast. Every additional robot consumes, so **doubling your crew doubles your need for fuel and heat**. A well-supplied crew of four produces more than a crew of ten that stops every two minutes.

My rule of thumb: only add a robot when your fuel production has visible margin. If your fire is flickering, this is not the moment to hire.

## Specialise rather than clone

It is tempting to give every robot the same routine. It is a reflex and it is a dead end.

Assign roles instead: one on raw resources, one on processing, one on logistics, one on maintenance. You will get a chain where each link can be fixed independently, rather than a herd that does everything by halves.

And above all you will know immediately who to blame when production stops.

## Towards terraforming

The end goal is replanting, producing oxygen and pushing back the ice.

Two tips for that phase.

**Do not plant at random.** Trees are both a resource and a terraforming objective. A plantation placed near your harvesting circuits will save journeys, and journeys are what consume your fuel.

**Automate heat before expanding.** Pushing back the ice enlarges your workable area, but a larger area means longer journeys, therefore more fuel. Growth must follow your energy capacity, never the other way round.

## Seeds, and why they change everything

Planets are procedurally generated, and you can **share a seed** with another player.

Use it. Restarting the same planet after making a mess lets you measure your progress precisely, which is impossible on a different map. And comparing your solution with somebody else's on the same layout is the best way to learn.

If you are stuck on one planet, try another. A different resource layout can unlock an idea the first one was hiding from you.

![Craftomation 101, a generated planet](/images/craftomation/screenshot-6.webp)

## The summary

Fire first. Short routines tested immediately. One role per robot. Growth indexed to your energy production. And the habit, when something does not work, of watching the robot rather than rereading the blocks.

How long does your base last without intervention? The record is contested on [the InsertCoins Discord](https://discord.gg/473FE3dWvw).
