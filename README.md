# Blindfold Chess App: User Guide

Welcome to the Blindfold Chess app! This application is designed to help you practice and improve your blindfold chess skills by removing the visual board entirely and relying on a unique touch-based input system and audio feedback.

[![Play the app live here!](https://img.shields.io/badge/Play%20Now-blue?style=for-the-badge)](https://blindfold-chess.app)

## 💡 Core Idea: Play Silently with Eyes Closed

A key feature of this app is its design for silent play. Since there is no voice input required from the user, you can play blindfold chess even in noisy environments or without disturbing others. Simply put on earplugs, close your eyes, and you can enjoy a completely immersive, audio-guided chess experience.

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

* **Easy Promotion Choice:** When a pawn promotes, the four touch quadrants display the actual chess piece icons (Queen, Rook, Bishop, Knight). Because the piece icons are always displayed in the same quadrants (for example, the Queen is always displayed in the top-left quadrant), you could even keep your eyes closed.

* **Enhanced Undo Last Move:** Correct mistakes by undoing the last full move (your move and the AI's response). In multi-board mode, it undoes the AI's move on the current board and then your move on the previous board.

* **Cancel Selection:** Easily reset your current square selection if you make a mistake.

## 🎮 How to Play

### Starting a New Game

1.  **Open the App:** The app starts on the **Menu** screen.

2. **Select Boards:** Choose the number of simultaneous games you wish to play (from 1 to 8).

3.  **Choose Your Color:** In case of playing one board: select "White" or "Black" from the "Choose color" dropdown. **Note:** If you choose to play multiple boards, this setting is not available, and your color will alternate (White/Black) for each successive board.

4.  **Select AI Level (Depth):** Choose a numerical value (1-15) from the "Level" dropdown. This directly sets how many moves deep the Stockfish AI will calculate, with higher numbers indicating a stronger opponent.

5.  **Select Variant:** Choose "Standard" for regular chess or "Chess 960" for a random starting position. The starting position will be displayed visually on the menu screen.

6.  **Always Promote to Queen:** By default, this option is checked, meaning your pawns will automatically promote to a Queen. **Uncheck this option** if you want to manually choose your promotion piece (Rook, Bishop, or Knight) during the game.

7.  **Start Game:** Tap the "Start Game" button.

### Using the Game Menu

During a game, tapping the white square in the center will open a menu with the following options:

* **"Cancel Selection":** If you've started selecting a square but want to reset, tap this button. It will clear your current partial selection.

* **"Undo Last Move":** Tap this to undo the last full move (your move and the AI's response). In multi-board mode, it will undo the current board's last (AI) move and then switch to the previous board to undo your last move.

* **"Main Menu":** Returns you to the main menu. Here you can review the 960 starting position and then click "Resume Game".

* **"Resume Game":** Returns you to your current game.

### Making a Move (Square Selection)

The game screen consists of four large, touchable quadrants:

* **TL** (Top Left)

* **TR** (Top Right)

* **BL** (Bottom Left)

* **BR** (Bottom Right)

When you use the app in full-screen mode, you can use your thumbs to tap these quadrants. To select any square of the 8x8 chessboard, you will make **three consecutive taps** on these quadrants. Each tap narrows down the selection to a smaller quadrant, eventually pinpointing a single square. Visual help is provided during play to get acquainted with this system.

**Example 1: tapping BR BL TL selects E2 (for White)**

* **Tap 1 (BR):** Selects the bottom-right 4x4 quadrant (**e1-h4**).

* **Tap 2 (BL):** Selects the bottom-left 2x2 quadrant (**e1-f2**) within the previous 4x4 (e1-h4).

* **Tap 3 (TL):** Selects the top-left 1x1 square (**e2**) within the previous 2x2 (e1-f2).

*(Note: The actual quadrant sequence for a specific square depends on your chosen color (White or Black) as the board is oriented from your perspective.)*

**Other examples:**

* TR TR TR selects h8 (or a1 if you have the black pieces).
* TL BR BR selects d5 (or e4 if you have the black pieces).

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

    * **Top Left: Queen**

    * **Top Right: Rook**

    * **Bottom Left: Bishop**

    * **Bottom Right: Knight**

3.  Tap the quadrant corresponding to the piece you wish to promote to.

    * The app will confirm your choice by finishing the move sentence with – for example – "promoted to Queen". The full sentence that you've heard, might then be: "White pawn from f7 takes g8 – choose a promotion piece – promoted to Queen".

## 🧠 Tips for Blindfold Play

* **Visualize the Board:** Mentally keep track of piece positions and board coordinates for each active game.

* **Listen Carefully:** Pay close attention to all audio cues for moves, game states, and board changes.

* **Practice Coordinates:** Familiarize yourself with algebraic notation (e.g., a1, h8) thoroughly.

* **Start Simple:** Begin with standard chess, 1 board, and easier AI levels (lower depth), then gradually increase complexity.

* **Don't Be afraid to Undo:** Use the "Undo Last Move" button to review and correct mistakes, especially when learning.

* **Take care of your health:** Some professional players advice against playing too many boards blindfolded. Take care of your brain ❤️

Enjoy your blindfold chess journey!

[![Play the app live here!](https://img.shields.io/badge/Play%20Now-blue?style=for-the-badge)](https://blindfold-chess.app)

## 📚 Frequently asked questions

## Is this app free?

Yes, [blindfold-chess.app](https://blindfold-chess.app) is free for individual, private, non-commercial use. Also, if you are a chess teacher or online content creator, you can show how [blindfold-chess.app](https://blindfold-chess.app) works and even play full games. Make sure the URL "blindfold-chess.app" is visible at least a few seconds. For using this app or parts of this app outside of the domain "blindfold-chess.app" you need a license. For more information, see the Licenses section below.

### Can I download the app?

Yes. This app is a [Progressive Web App (PWA)](https://en.wikipedia.org/wiki/Progressive_web_app) and can be installed on your device. When you open the app in a browser and see "blindfold-chess.app" in the URL bar, then, depending on your browser (e.g. Chrome, Edge, etc.), you might see, near the URL bar, an icon for installing this app on your device. After installing, the app will appear on your home screen, and you can launch it from there. If clicking on the app icon opens a regular browser tab, then only a shortcut has been placed on your home screen. Try installing the app via a different browser.

### Can I use this app offline?

Yes. There are two options:
1.  Install the app (see above). This will allow you to use the full app without internet connection.
2.  Use the app without installing it. After starting a game via the "Start Game" button, the app won't access the internet anymore.

### Can I play against a human opponent?

No, not yet. This might be possible in the future, depending on the interest of the community. You can ask your favorite chess website to buy a license to use this app on their website for games between humans. Then you might play blindfolded against a human who doesn't play blindfolded, or create a game that requires the other player to also play blindfolded.

# Blindfold Chess App: Creator Guide
This section is for people interested in **creating chess tools**.

## 📜 Licenses

- The idea of the touch-based input system, with 3 taps to select a square, is unique – a proprietary feature found exclusively on [blindfold-chess.app](https://blindfold-chess.app) and owned by Symbolinker (mail: symbolinker@gmail.com). Licenses are available if you're interested in using this idea, or parts of this app, in your own application/website/etc.
- The file stockfish.js that is used, was downloaded from https://github.com/lichess-org/stockfish.js (the latest release of 2018). For its license, see the official [Stockfish repository](https://github.com/official-stockfish/Stockfish).
- The file chess.js that is used, was downloaded (as a chess.ts file) from https://github.com/jhlywa/chess.js/pull/493 (at 28-05-2025). For its license, see the [chess.js repository](https://github.com/jhlywa/chess.js).

## 🤝 Contributing

Requests for improvements, bug fixes and new features are welcome. Programmers might start a [discussion](https://github.com/blindfold-chess/blindfold-chess.github.io/discussions), report an [issue](https://github.com/blindfold-chess/blindfold-chess.github.io/issues) or open a [pull request](https://github.com/blindfold-chess/blindfold-chess.github.io/pulls). If you're not a programmer, you can e-mail me at symbolinker@gmail.com and I'll do my best to implement your suggestions.
