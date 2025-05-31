# Blindfold Chess App: User Guide

Welcome to the Blindfold Chess app! This application is designed to help you practice and improve your blindfold chess skills by removing the visual board entirely and relying on audio and a unique touch-based input system.

[![Play the app live here!](https://img.shields.io/badge/Play%20Now-blue?style=for-the-badge)](https://blindfold-chess.github.io)

## 💡 Core Idea: Play Silently

A key feature of this app is its design for silent play. Since there is no voice input required from the user, you can play blindfold chess even in noisy environments or without disturbing others. Simply put on earplugs, and you can enjoy a completely immersive, audio-guided chess experience.

## ✨ Key Features

* **True Blindfold Experience:** No visual chess board is displayed during gameplay. All interaction is through touch input and audio feedback.

* **Multi-Board (Simultaneous) Play:** Challenge yourself by playing on up to 8 different chess boards simultaneously. The app seamlessly guides you from one board to the next.

* **Intuitive Touch Input:** Select squares and promotion pieces using a simple, repeatable quadrant-based tapping system.

* **Comprehensive Audio Feedback:**

    * Announces the current board number when playing multiple boards.

    * Announces moves (e.g., "White pawn from e2 to e4").

    * Confirms special moves like captures and castling.

    * Notifies you of game states (Check, Checkmate, Stalemate, Draw).

    * Alerts you to illegal moves.

    * Guides you through promotion choices.

* **Chess 960 (Fischer Random) Support:** Practice blindfold chess with random starting positions.

* **Dynamic AI Opponent (Stockfish):** Play against a strong chess engine with precise control over its difficulty, allowing you to set the AI's "thinking depth" from 1 (Easy) to 15 (Hard).

* **Easy Promotion Choice:** When a pawn promotes, the four touch quadrants display the actual chess piece icons (Queen, Rook, Bishop, Knight). Because the piece icons are always displayed in the same quadrants (for example, the Queen is always displayed in the upper-left quadrant), you could even keep your eyes closed.

* **Enhanced Undo Last Move:** Correct mistakes by undoing the last full move (your move and the AI's response). In multi-board mode, it undoes the AI's move on the current board and then your move on the previous board.

* **Cancel Selection:** Easily reset your current square selection if you make a mistake.

## 🎮 How to Play

### Starting a New Game

1.  **Open the App:** The app starts on the **Menu** screen.

2. **Select Boards:** Choose the number of simultaneous games you wish to play (from 1 to 8).

3.  **Choose Your Color:** In case of playing one board: select "White" or "Black" from the "Choose color" dropdown. **Note:** If you choose to play multiple boards, this setting is not available, and your color will alternate (White/Black) for each successive board.

4.  **Select AI Level (Depth):** Choose a numerical value (1-15) from the "Level" dropdown. This directly sets how many moves deep the Stockfish AI will calculate, with higher numbers indicating a stronger opponent.

5.  **Select Variant:** Choose "Standard" for regular chess or "Chess 960" for a random starting position. The starting rank for Chess 960 will be displayed visually on the menu screen. 

6.  **Always Promote to Queen:** By default, this option is checked, meaning your pawns will automatically promote to a Queen. **Uncheck this option** if you want to manually choose your promotion piece (Rook, Bishop, or Knight) during the game.

7.  **Start Game:** Tap the "Start Game" button.

### Making a Move (Square Selection)

The game screen consists of four large, touchable quadrants:

* **UL** (Upper Left)

* **UR** (Upper Right)

* **DL** (Lower Left)

* **DR** (Lower Right)

To select any square on the 8x8 chessboard, you will make **three consecutive taps** on these quadrants. Each tap narrows down the selection to a smaller quadrant, eventually pinpointing a single square. Visual help is provided during play to get acquainted with this system.

**Example 1: tapping DR DL UL selects E2 (for White)**

* **Tap 1 (DR):** Selects the lower-right 4x4 quadrant (**e1-h4**).

* **Tap 2 (DL):** Selects the lower-left 2x2 quadrant (**e1-f2**) within the previous 4x4 (e1-h4).

* **Tap 3 (UL):** Selects the upper-left 1x1 square (**e2**) within the previous 2x2 (e1-f2).

*(Note: The actual quadrant sequence for a specific square depends on your chosen color (White or Black) as the board is oriented from your perspective.)*

**Other examples:**

* UR UR UR selects h8 (or a1 if you have the black pieces).
* UL DR DR selects d5 (or e4 if you have the black pieces).

**Steps to Make a Move:**

1.  **Select the "From" Square:** Perform **three taps** to select the square of the piece you want to move.

    * The app will announce your chosen square (e.g., "White pawn from e2").

2.  **Select the "To" Square:** Perform **another three taps** to select the destination square for your piece.

    * The app will announce the destination square (e.g., "to e4").

    * If the move is illegal, you will hear "That's an illegal move". The square selection is undone so that you can try again.

### Promotion

If your pawn reaches the last rank and you have **unchecked** the "Always promote to queen" option in the menu:

1.  After selecting the "to" square for your pawn's promotion, the app will announce: "Choose a promotion piece."

2.  The four touchable quadrants will now visually display the chess piece icons in your color, representing the promotion options:

    * **Upper Left: Queen**

    * **Upper Right: Rook**

    * **Lower Left: Bishop**

    * **Lower Right: Knight**

3.  Tap the quadrant corresponding to the piece you wish to promote to.

    * The app will confirm your choice by finishing the move sentence with - for example - "promoted to Queen". The full sentence that you've heard, might then be: "White pawn from f7 takes g8 - choose a promotion piece - promoted to Queen".

### Game State Announcements

The app provides audio cues for:

* **"Check"**: When a king is under attack.

* **"Checkmate"**: When a king is in check and has no legal moves.

* **"Stalemate"**: When a player has no legal moves, but their king is not in check (a draw).

* **"Draw"**: For other draw conditions (e.g. insufficient material, 50-move rule, 3-fold repetition).

* **"Board [Number]"**: Announced when switching between boards in simultaneous play.

### Game Controls

* **"Cancel Selection" Button:** If you've started selecting a square but want to reset, tap this button. It will clear your current partial selection.

* **"Undo Last Move" Button:** Tap this to undo the last full move (your move and the AI's response). In multi-board mode, it will undo the current board's last (AI) move and then switch to the previous board to undo your last move.

* **"Menu" Button:** Returns you to the main menu.

* **"Resume Game" Button (in Menu):** If you went back to the menu during a game, this button will appear, allowing you to return to your current game.

## 🧠 Tips for Blindfold Play

* **Visualize the Board:** Mentally keep track of piece positions and board coordinates for each active game.

* **Listen Carefully:** Pay close attention to all audio cues for moves, game states, and board changes.

* **Practice Coordinates:** Familiarize yourself with algebraic notation (e.g., a1, h8) thoroughly.

* **Start Simple:** Begin with standard chess, 1 board, and easier AI levels (lower depth), then gradually increase complexity.

* **Don't Be afraid to Undo:** Use the "Undo Last Move" button to review and correct mistakes, especially when learning.

* **Take care of your health:** Some professional players advice against playing too many boards blindfolded. Take care of your brain ❤️

Enjoy your blindfold chess journey!

[![Play the app live here!](https://img.shields.io/badge/Play%20Now-blue?style=for-the-badge)](https://blindfold-chess.github.io)