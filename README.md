Real-Time Spell Corrector Chrome Extension
Overview

This project is a Chrome extension that provides real-time spelling correction while typing in input fields on any webpage.
It detects misspelled words and suggests correct alternatives instantly.

The extension is built using JavaScript and implements classic edit-distance–based spell correction with multiple performance optimizations.

Features

Real-time spell correction while typing

Correction suggestions using Levenshtein distance

Prefix pruning to reduce unnecessary comparisons

Early termination in edit-distance computation for faster response

Frequency-based ranking to prioritize common words

Fully client-side (no backend required)

How It Works

The extension listens to user input in text fields.

The last typed word is checked against a dictionary.

If the word is not found:

Candidate words are selected using prefix matching.

Edit distance is computed only for relevant candidates.

Suggestions are ranked by:

Lower edit distance

Higher word frequency

The top suggestions are displayed in a dropdown near the input field.
