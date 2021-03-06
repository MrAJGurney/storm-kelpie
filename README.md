# Readme <!-- omit in toc -->

- [Background](#background)
- [Story](#story)
- [Gameplay](#gameplay)
- [Requirements](#requirements)
- [What would I do with more time](#what-would-i-do-with-more-time)
## Background

A prototype game created for the [Kilted Otter Initiative](https://itch.io/jam/the-kilted-otter-initiative)'s 2021 game jam.

Design and mentorship help from [hannah_osso_art](https://www.instagram.com/hannah_osso_art/).

## Story

You have been accosted by a storm kelpie! Respond with a rhyme, lest they capsize your toy sailboat.

## Gameplay

Enter a response that matches three criteria:

- **your response must rhyme**
  - the game uses the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict), which means relying on common North American pronounciation
  - the code that checks rhymes is a bit of a bodge
- **your response must not duplicate words**
  - you cannot use a word in the original call in your response
  - you cannot use a word twice in your response
  - words with symbols are treated as duplicates as ones without (e.g. `bird's` is treated as a duplicate of `birds`)
- **your response must have the same number of words as the original call**

If you're stuck you can admit defeat with the "shipwreck" button and request a new call.

If you match the three criteria you can request a new call to test your wits with the "safe passage" button.

## Requirements

Game tested on a 1080px high monitor using the chrome web browser on Ubuntu.

Ideally it should work on any resolution, but responsive CSS is hard :'(

## What would I do with more time

- responsive layout
- check accessibility
  - for multiple device types
  - for multiple resolutions
  - for multiple browser
- help/instruction screen
- ongoing score tracker
- animations for victory/defeat
- more robost rhyme checker
- better progress indicator
